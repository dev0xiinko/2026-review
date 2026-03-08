# PROJECT IDENTITY

Project Name: To-do list

Description:
A to-do list web app built with Next.js and Supabase (Postgres) supporting full CRUD on tasks.

Primary Language:
Typescript

Frameworks:
Nextjs

Runtime Environment:
linux

---

# PROJECT GOALS

The system must:

1. Create a task
2. Edit
3. Save
4. Delete

---

# SYSTEM ARCHITECTURE

Frontend:

- Next.js App Router (`/app`)
- Client components:
  - `TodoList` – orchestrates data fetching and mutations via Supabase
  - `TodoForm` – creates new tasks
  - `TodoItem` – displays and edits individual tasks

Backend:

- Supabase project using Postgres
- `todos` table stores all tasks
- Accessed directly from the browser via the official Supabase JavaScript client

Data model (`public.todos`):

- `id` (`uuid`, primary key, default `gen_random_uuid()`)
- `title` (`text`, required)
- `description` (`text`, optional)
- `completed` (`boolean`, default `false`)
- `created_at` (`timestamptz`, default `now()`)

---

# DIRECTORY STRUCTURE

/to-do
--/app
--/components
----/TodoList.tsx
----/TodoForm.tsx
----/TodoItem.tsx
--/lib
----/supabaseClient.ts
--/public
---

# CODING STANDARDS

General Rules:

- Prefer clean and readable code
- Avoid overly complex abstractions
- Functions should be small and focused
- Avoid global variables
- Use modular architecture

Error Handling:

- Always validate input
- Use try/except where necessary
- Provide meaningful error messages

---

# PERFORMANCE REQUIREMENTS

The system must prioritize:

1. Low latency
2. Reliability
3. Efficient memory usage

Avoid:

- unnecessary loops
- blocking operations
- redundant computations

---

# DEPENDENCY POLICY

When generating code:

Prefer:
- built-in libraries
- lightweight packages

Avoid:
- large frameworks unless required
- unnecessary dependencies

Every new dependency must be justified.

---

# API DESIGN RULES

All APIs must:

- be RESTful
- return JSON
- include proper status codes

Example response format:

{
    "status": "success",
    "data": {},
    "message": ""
}

---

# DEBUGGING GUIDELINES

When debugging:

1. Identify root cause before suggesting fixes
2. Avoid guessing solutions
3. Explain the problem clearly
4. Provide corrected code

Always prioritize fixing the underlying issue.

---

# CODE GENERATION RULES

When Claude generates code:

1. Always produce complete working code
2. Maintain project structure
3. Do not break existing modules
4. Follow coding standards
5. Comment complex sections

---

# SECURITY GUIDELINES

Always consider:

- input validation
- avoiding hardcoded secrets
- proper authentication for APIs
- preventing injection attacks

---

# DEVELOPMENT WORKFLOW

Preferred workflow:

1. Write modular code
2. Test components individually
3. Integrate modules gradually
4. Log errors properly
5. Update this `cursor.md` file whenever you make meaningful changes to the architecture, behavior, or dependencies.

---

# CLAUDE BEHAVIOR RULES

When responding:

- Assume the user is a developer
- Avoid unnecessary explanations
- Focus on actionable solutions
- Provide production-quality code
- Prioritize correctness over creativity

---

# KNOWN LIMITATIONS

- No authentication: all tasks are global and shared for anyone who can access the Supabase project.
- No pagination or filtering: all tasks are fetched at once.
- No automated tests are defined yet.
- Error messages are generic and not localized.


# FUTURE FEATURES

Planned improvements:

- Add user authentication and store tasks per user.
- Add filtering (active/completed), search, and basic analytics.
- Add due dates, priorities, and simple reminders.
- Add unit/integration tests for components and data layer.
---

# QUICK CONTEXT

Important system summary for fast understanding:

- Next.js (TypeScript) client-side todo app using Supabase as the backend.
- Core features: create, edit, toggle complete, and delete tasks.
- Data persisted in a `todos` Postgres table in Supabase, accessed via `@supabase/supabase-js`.
