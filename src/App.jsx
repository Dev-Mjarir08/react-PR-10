import React, { useEffect, useState } from "react";
import apiInstance from "./api/apiInstance";

const App = () => {
  // Form State
  const [form, setForm] = useState({});

  // Users State
  const [users, setUsers] = useState([]);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  // Get All Users
  const getUsers = async () => {
    try {
      const response = await apiInstance.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Add User
  const createUser = async (e) => {
    e.preventDefault();

    try {
      await apiInstance.post("/users", form);
      setForm({});
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete User
  const deleteUser = async (id) => {
    try {
    await apiInstance.delete(`/users/${id}`);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">

      <div className="row justify-content-center">

        {/* Add User */}

        <div className="col-md-5">
          <div className="card shadow p-4">

            <h3 className="text-center mb-3">
              Add User
            </h3>

            <form onSubmit={createUser}>

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter Name"
                name="name"
                value={form.name || ""}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                className="form-control mb-3"
                placeholder="Enter Email"
                name="email"
                value={form.email || ""}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                className="form-control mb-3"
                placeholder="Enter Password"
                name="password"
                value={form.password || ""}
                onChange={handleChange}
                required
              />

              <button
                className="btn btn-success w-100"
                type="submit"
              >
                Add User
              </button>

            </form>

          </div>
        </div>

        {/* View Users */}

        <div className="col-md-12 mt-4">
          <div className="card shadow p-4">

            <h3 className="text-center mb-3">
              All Users
            </h3>

            <table className="table table-bordered table-hover">

              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {users.length > 0 ? (
                  users.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.password}</td>

                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteUser(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center"
                    >
                      No Users Found
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>
        </div>

      </div>

    </div>
  );
};

export default App;