import { useState } from "react";

type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

type TodoItemProps = {
  task: Task;
  onToggleComplete: (task: Task) => void;
  onDelete: (task: Task) => void;
  onUpdate: (task: Task) => void;
};

export default function TodoItem({
  task,
  onToggleComplete,
  onDelete,
  onUpdate,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleSave = () => {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle) {
      return;
    }

    onUpdate({
      ...task,
      title: trimmedTitle,
      description: trimmedDescription,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(task.title);
    setDescription(task.description);
    setIsEditing(false);
  };

  return (
    <li className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-3 text-sm shadow-sm transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700">
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={() => onToggleComplete(task)}
          className="mt-0.5 h-4 w-4 rounded border border-zinc-400 bg-white text-xs transition hover:border-zinc-600 dark:border-zinc-600 dark:bg-zinc-900 dark:hover:border-zinc-400"
          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {task.completed ? "✓" : ""}
        </button>
        <div className="flex-1">
          {isEditing ? (
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="w-full rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 text-sm outline-none focus:border-zinc-400 focus:bg-white focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:focus:border-zinc-500 dark:focus:ring-zinc-600"
              />
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="w-full rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 text-sm outline-none focus:border-zinc-400 focus:bg-white focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50 dark:focus:border-zinc-500 dark:focus:ring-zinc-600"
                rows={2}
              />
            </div>
          ) : (
            <div>
              <p
                className={`font-medium ${
                  task.completed
                    ? "text-zinc-400 line-through dark:text-zinc-500"
                    : "text-zinc-900 dark:text-zinc-50"
                }`}
              >
                {task.title}
              </p>
              {task.description && (
                <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                  {task.description}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-end gap-2">
        {isEditing ? (
          <>
            <button
              type="button"
              onClick={handleSave}
              className="rounded-md bg-zinc-900 px-3 py-1 text-xs font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-md border border-zinc-300 px-3 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="rounded-md border border-zinc-300 px-3 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => onDelete(task)}
              className="rounded-md border border-red-200 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-50 dark:border-red-700/60 dark:text-red-300 dark:hover:bg-red-950/40"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
}

