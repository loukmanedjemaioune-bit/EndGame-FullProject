import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLog() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [erreur, setErreur] = useState("");
  const navigateto = useNavigate();

  async function hundleLogin(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
      if (res.status === 404) {
        setErreur("Wrong Email");
      } else if (res.status === 401) {
        setErreur("Wrong Password");
      } else {
        setErreur("Problem in The Server**");
      }

      return;
    }
    const data = res.json();
    localStorage.setItem("admintoken", data.token);
    navigateto("/admin/dashboard", { replace: true });
  }

  return (
    <form action="submit" onSubmit={hundleLogin} className="FormU">
      <h2>Admin Login</h2>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setusername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      />
      {erreur && <p className="ErrorP">{erreur}</p>}
      <button onClick={() => setErreur("")}>Login</button>
    </form>
  );
}

/* export default function AdminLog() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function hundleloginAdmin(e) {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      setError("Invalid credentials");
      return;
    }

    const data = await res.json();
    localStorage.setItem("admintoken", data.token);

    navigate("/admin/dashboard", { replace: true });
  }

  return (
    <form onSubmit={hundleloginAdmin} className="FormU">
      <h2>Admin Login</h2>
      <input value={username} onChange={(e) => setusername(e.target.value)} />
      <input
        type="password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button>Login</button>
    </form>
  );
} */
