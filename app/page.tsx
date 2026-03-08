import TodoList from "./components/TodoList";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-start justify-center gap-6 px-6 py-10 sm:px-10 sm:py-16">
        <TodoList />
      </main>
    </div>
  );
}
