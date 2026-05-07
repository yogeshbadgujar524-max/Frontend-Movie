import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ fname: "", lname: "", email: "", phone: "", password: "" });

  // Fetch users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3001/register");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3001/register/${id}`);
          Swal.fire({
            title: "Deleted!",
            text: "User has been deleted.",
            icon: "success",
            confirmButtonText: "OK",
            customClass: {
              confirmButton: 'Mybutton'
            }
          });
          fetchUsers(); // refresh list
        } catch (err) {
          console.error("Error deleting user:", err);
          Swal.fire("Error", "Could not delete user.", "error");
        }
      }
    });
  };

  // Open edit modal
  const handleEdit = (user) => {
    setEditingUser(user._id);
    setFormData({
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      phone: user.phone,
      password: user.password,
    });
  };

  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save updated user
 const handleUpdate = async () => {
  Swal.fire({
    title: "Do you want to save the changes?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Save",
    denyButtonText: `Don't save`
  }).then(async (result) => {

    if (result.isConfirmed) {
      try {
        await axios.put(`http://localhost:3001/register/${editingUser}`, formData);

        Swal.fire({
          title: "Updated!",
          text: "User has been updated.",
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: 'Mybutton'
          }
        });

        setEditingUser(null);
        fetchUsers();

      } catch (err) {
        console.error("Error updating user:", err);
        Swal.fire("Error", "Could not update user.", "error");
      }

    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }

  });
};

  return (
    <>
      <h2
        style={{
          position: "relative",
          left: "550px",
          color: "ButtonShadow",
          fontSize: "30px",
        }}
      >
        Welcome To Admin Dashboard
      </h2>

      <div
        style={{
          width: "900px",
          margin: "50px auto",
          border: "2px solid black",
          backgroundColor: "#f9f9f9",
          padding: "20px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>User Registration Details</h2>
        <table
          border="1"
          cellPadding="10"
          style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}
        >
          <thead style={{ backgroundColor: "#ddd" }}>
            <tr>
              <th>User Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone No.</th>
              <th>Password</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id || index}>
                  <td>{user.userid}</td>
                  <td>{user.fname}</td>
                  <td>{user.lname}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.password}</td>
                  <td>
                    <i
                      className="fa-solid fa-pen-to-square"
                      style={{ cursor: "pointer", color: "blue" }}
                      onClick={() => handleEdit(user)}
                    ></i>
                  </td>
                  <td>
                    <i
                      className="fa-solid fa-trash"
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={() => handleDelete(user._id)}
                    ></i>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingUser && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "10px",
              width: "400px",
            }}
          >
            <h3>Edit User</h3>
            <div className="update" style={{ display: "flex", flexDirection: "column" }}>
              First Name<input name="fname" value={formData.fname} onChange={handleChange} placeholder="First Name" style={{ fontSize: "20px", margin: "10px" }} />
              Last Name<input name="lname" value={formData.lname} onChange={handleChange} placeholder="Last Name" style={{ fontSize: "20px", margin: "10px" }} />
              Email<input name="email" value={formData.email} onChange={handleChange} placeholder="Email" style={{ fontSize: "20px", margin: "10px" }} />
              Phone No.<input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" style={{ fontSize: "20px", margin: "10px" }} />
              Password<input name="password" value={formData.password} onChange={handleChange} placeholder="Password" style={{ fontSize: "20px", margin: "10px" }} />
            </div>

            <div style={{ marginTop: "10px" }}>
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setEditingUser(null)} style={{ marginLeft: "10px" }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminDashboard;
