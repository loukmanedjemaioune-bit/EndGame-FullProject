import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function DashBoard() {
  const [user, setuser] = useState([]);
  const [eror, setError] = useState("");
  const [Id, selectedId] = useState(null);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [ShowConfirmDel, setShowConfirmDel] = useState(false);
  const [ShowUpdateInput, setShowUpdateInput] = useState(false);
  const [ShowAddInput, setShowAddInput] = useState(false);
  function hundleAddUser() {
    fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then(async (res) => {
        const data = await res.json();
        console.log("STATUS:", res.status);
        console.log("RESPONSE:", data);

        if (!res.ok) {
          throw new Error(data.message || "User Not Adding...");
        }

        return data;
      })
      .then((data) => {
        const newuser = {
          id: data.userId,
          email: email,
          Score: 0,
        };
        setuser((prev) => [...prev, newuser]);
        setemail("");
        setpassword("");

        /* window.location.reload(); */
      })
      .catch((error) => setError(error.message));
    setShowAddInput(false);
  }
  function hundleDelete(ID) {
    fetch(`http://localhost:5000/api/auth/DeleteUser/${ID}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Problem For Deleting process ");
        }
        return res.json();
      })
      .then(() => setuser((prev) => prev.filter((u) => u.id !== ID)))
      .catch((error) => setError(error.message));
    setShowConfirmDel(false);
  }
  function hundleUpdateEmail(ID) {
    fetch(`http://localhost:5000/api/auth/UpdateEmail/${ID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Porblem While Updating User Email...");
        }
        return res.json();
      })
      .then(() =>
        setuser((prev) =>
          prev.map((u) => (u.id === ID ? { ...u, email: email } : u))
        )
      )
      .catch((error) => setError(error.message));
    setShowUpdateInput(false);
  }
  useEffect(() => {
    fetch("http://localhost:5000/api/auth/allUsers")
      .then((res) => {
        if (!res.ok) {
          throw new Error("No Users");
        }
        return res.json();
      })
      .then((data) => setuser(data.Users))
      .catch((error) => setError(error.message));
  }, []);
  const navigate = useNavigate();

  function LogOut() {
    localStorage.removeItem("admintoken"); // أو admintoken
    navigate("/login", { replace: true });
  }

  if (eror) {
    return <p style={{ color: "red" }}>{eror}</p>;
  }

  return (
    <>
      {ShowUpdateInput && (
        <div className="overlay">
          <div className="confirm-modal">
            <label htmlFor="email">New Email</label>
            <input
              type="email"
              required
              placeholder="Email"
              onChange={(e) => setemail(e.target.value)}
            />

            <div className="actions">
              <button
                className="btn-danger"
                onClick={() => {
                  hundleUpdateEmail(Id);
                }}
              >
                Update
              </button>

              <button
                className="btn-cancel"
                onClick={() => setShowUpdateInput(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {ShowConfirmDel && (
        <div className="overlay">
          <div className="confirm-modal">
            <h3>Confirmation⚠️</h3>
            <p>Are You Sure You Want To Delete {Id}</p>

            <div className="actions">
              <button className="btn-danger" onClick={() => hundleDelete(Id)}>
                Yes
              </button>

              <button
                className="btn-cancel"
                onClick={() => setShowConfirmDel(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {ShowAddInput && (
        <div className="overlay">
          <div className="confirm-modal">
            <h3>Adding New User</h3>
            <div className="AddNew">
              <label htmlFor="email">Email</label>

              <input
                type="email"
                required
                placeholder="Email"
                onChange={(e) => setemail(e.target.value)}
              />
              <label htmlFor="password">password</label>
              <input
                type="password"
                required
                placeholder="password"
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>

            <div className="actions">
              <button className="btn-danger" onClick={() => hundleAddUser()}>
                Yes
              </button>

              <button
                className="btn-cancel"
                onClick={() => setShowAddInput(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="LogAddDiv">
        <FontAwesomeIcon
          icon={faUserPlus}
          className="IaddUser"
          onClick={() => setShowAddInput(true)}
        />
        <button id="ALogOut" onClick={LogOut}>
          ⮎
        </button>
      </div>
      <table className="UserTb">
        <thead>
          <tr>
            <th>id</th>
            <th>email</th>
            <th>score</th>
            <th>Manage</th>
          </tr>
        </thead>
        <tbody>
          {user.map((u, i) => (
            <tr key={u.id}>
              <td>{u.id}</td>

              <td>{u.email}</td>
              <td>{u.Score}</td>
              <td>
                <button
                  className="editUser"
                  onClick={() => {
                    selectedId(u.id), setShowConfirmDel(true);
                  }}
                >
                  Delete
                </button>
                <button
                  className="editUser"
                  onClick={() => {
                    selectedId(u.id), setShowUpdateInput(true);
                  }}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
