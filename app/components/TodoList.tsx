"use client";

import {useEffect, useState} from "react";
import { supabase } from "@/lib/supabaseClient";

import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

type Task = {
    title: string;
    description: string;
    completed: boolean;
    id: string;
};

export default function TodoList() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            setIsLoading(true);
            setError(null);

            const { data, error: fetchError } = await supabase
                .from("todos")
                .select("id, title, description, completed")
                .order("created_at", { ascending: false });

            if (fetchError) {
                console.error(fetchError);
                setError("Unable to load tasks. Please try again.");
                setIsLoading(false);
                return;
            }

            setTasks(
                (data ?? []).map((row) => ({
                    id: String(row.id),
                    title: row.title ?? "",
                    description: row.description ?? "",
                    completed: Boolean(row.completed),
                })),
            );
            setIsLoading(false);
        };

        fetchTasks();
    }, []);

    const handleAddTask = async (values: { title: string; description: string }) => {
        setIsSubmitting(true);
        setError(null);

        const { data, error: insertError } = await supabase
            .from("todos")
            .insert({
                title: values.title,
                description: values.description,
                completed: false,
            })
            .select("id, title, description, completed")
            .single();

        if (insertError) {
            console.error(insertError);
            setError("Unable to create task. Please try again.");
            setIsSubmitting(false);
            return;
        }

        if (data) {
            const newTask: Task = {
                id: String(data.id),
                title: data.title ?? "",
                description: data.description ?? "",
                completed: Boolean(data.completed),
            };
            setTasks((previous) => [newTask, ...previous]);
        }

        setIsSubmitting(false);
    };

    const handleToggleComplete = async (task: Task) => {
        const updatedCompleted = !task.completed;

        setTasks((previous) =>
            previous.map((item) =>
                item.id === task.id ? { ...item, completed: updatedCompleted } : item,
            ),
        );

        const { error: updateError } = await supabase
            .from("todos")
            .update({ completed: updatedCompleted })
            .eq("id", task.id);

        if (updateError) {
            console.error(updateError);
            setError("Unable to update task. Please try again.");
            setTasks((previous) =>
                previous.map((item) =>
                    item.id === task.id ? { ...item, completed: task.completed } : item,
                ),
            );
        }
    };

    const handleUpdateTask = async (task: Task) => {
        const previousTasks = tasks;

        setTasks((current) =>
            current.map((item) => (item.id === task.id ? task : item)),
        );

        const { error: updateError } = await supabase
            .from("todos")
            .update({
                title: task.title,
                description: task.description,
                completed: task.completed,
            })
            .eq("id", task.id);

        if (updateError) {
            console.error(updateError);
            setError("Unable to save changes. Please try again.");
            setTasks(previousTasks);
        }
    };

    const handleDeleteTask = async (task: Task) => {
        const previousTasks = tasks;

        setTasks((current) => current.filter((item) => item.id !== task.id));

        const { error: deleteError } = await supabase
            .from("todos")
            .delete()
            .eq("id", task.id);

        if (deleteError) {
            console.error(deleteError);
            setError("Unable to delete task. Please try again.");
            setTasks(previousTasks);
        }
    };

    return (
        <div className="flex w-full flex-col gap-4">
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                    To-do list
                </h1>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Create, edit, and track tasks stored in Supabase.
                </p>
            </div>

            <TodoForm onAdd={handleAddTask} disabled={isSubmitting} />

            {error && (
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}

            <div className="mt-2 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                {isLoading ? (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Loading tasks...
                    </p>
                ) : tasks.length === 0 ? (
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        No tasks yet. Add your first one above.
                    </p>
                ) : (
                    <ul className="flex flex-col gap-2">
                        {tasks.map((task) => (
                            <TodoItem
                                key={task.id}
                                task={task}
                                onToggleComplete={handleToggleComplete}
                                onDelete={handleDeleteTask}
                                onUpdate={handleUpdateTask}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}