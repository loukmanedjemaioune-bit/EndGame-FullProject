import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [erreur, setErreur] = useState("");
  const navigate = useNavigate();
  async function hundleLogin(e) {
    e.preventDefault();

    const result = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!result.ok) {
      setErreur("Invalid Email Or Pasword");
      return;
    }
    const data = await result.json();
    localStorage.setItem("token", data.token);
    navigate("/game", { replace: true });
  }

  return (
    <form action="submit" onSubmit={hundleLogin} className="FormU">
      <h2>Login</h2>
      <input
        type="text"
        name="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setemail(e.target.value)}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      />
      {erreur && <p className="ErrorP">{erreur}</p>}
      <p className="AdminP" onClick={() => navigate("/admin/login")}>
        I'm The Admin Here!
      </p>
      <button onClick={() => setErreur("")}>Login</button>
    </form>
  );
}
/* import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function hundleLogin(e) {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      setError("Wrong Email or Password");
      return;
    }

    const data = await res.json();
    localStorage.setItem("token", data.token);

    navigate("/game", { replace: true });
  }

  return (
    <form className="FormU" onSubmit={hundleLogin}>
      <h2>Login</h2>

      <input value={email} onChange={(e) => setemail(e.target.value)} />
      <input
        type="password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      />

      {error && <p className="ErrorP">{error}</p>}

      <p className="AdminP" onClick={() => navigate("/admin/login")}>
        I'm The Admin Here!
      </p>

      <button>Login</button>
    </form>
    /*
     */
