import { useGetUsersQuery } from "./services/userApi";

function App() {
  const { data: users, error, isLoading } = useGetUsersQuery();

  return (
    <div style={{ maxWidth: 720, width: "100%" }}>
      <header style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>
          RTK Query App
        </h1>
        <p style={{ color: "#94a3b8", marginTop: "0.5rem" }}>
          Powered by Redux Toolkit &amp; RTK Query
        </p>
      </header>

      <section
        style={{
          background: "#1e293b",
          borderRadius: 12,
          padding: "1.5rem",
          boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
        }}
      >
        <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>
          Users (from JSONPlaceholder)
        </h2>

        {isLoading && <p style={{ color: "#94a3b8" }}>Loading users...</p>}

        {error && (
          <p style={{ color: "#f87171" }}>
            Error: {error.status} — {JSON.stringify(error.data)}
          </p>
        )}

        {users && (
          <ul style={{ listStyle: "none", display: "grid", gap: "0.75rem" }}>
            {users.map((user) => (
              <li
                key={user.id}
                style={{
                  background: "#334155",
                  padding: "0.75rem 1rem",
                  borderRadius: 8,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontWeight: 500 }}>{user.name}</span>
                <span style={{ color: "#94a3b8", fontSize: "0.875rem" }}>
                  {user.email}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;
