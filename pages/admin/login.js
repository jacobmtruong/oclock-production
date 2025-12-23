import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setMsg(data.message || "Login failed");
      return;
    }

    router.push("/admin/photos");
  };

  return (
    <>
      <Head>
        <title>Admin Login | O&apos;CLOCK</title>
      </Head>

      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: 20,
          background: "black",
          color: "white",
        }}
      >
        <form
          onSubmit={submit}
          style={{ width: 360, display: "grid", gap: 12 }}
        >
          <h1 style={{ margin: 0 }}>Admin Login</h1>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            autoComplete="email"
            style={{ padding: 12, borderRadius: 10, border: "1px solid #333" }}
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            autoComplete="current-password"
            style={{ padding: 12, borderRadius: 10, border: "1px solid #333" }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: 12,
              borderRadius: 10,
              border: "1px solid #333",
              cursor: "pointer",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {msg && <p style={{ color: "salmon", margin: 0 }}>{msg}</p>}
        </form>
      </div>
    </>
  );
}
