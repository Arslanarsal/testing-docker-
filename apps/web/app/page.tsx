import { prismaClint } from "@repo/db/client";

export default async function Home() {
  const users = await prismaClint.user.findMany({
    include: {
      todos: true,
    },
  });

  return (
    <div>
      <h1>Users</h1>
      {users.map((user) => (
        <div key={user.id} style={{ marginBottom: "20px" }}>
          <h2>{user.username}</h2>
          <p>Password: {user.password}</p>
          <ul>
            {user.todos.map((todo) => (
              <li key={todo.id}>
                {todo.task} - {todo.done ? "Done" : "Pending"}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export const dynamic = 'force-dynamic'