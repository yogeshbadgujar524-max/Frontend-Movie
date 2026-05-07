import { useState,useEffect } from "react"
import axios from "axios"

const UserQueries = () => {
  const [contacts,setContacts] = useState([])

  useEffect(() => {
     axios
      .get('http://localhost:3001/contact')
      .then((res) => {
        console.log("Fetched users from MongoDB:", res.data);
        setContacts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, [])
  
  return (
    <>
    <h2 style={{
      position:"relative",
      left:"550px",
      color:"ButtonShadow",
      fontSize:"30px",
    }}
    >Welcome To Admin Dashboard</h2>
    <div style={{
        width: "900px",
        margin: "50px auto",
        border: "2px solid black",
        backgroundColor: "#f9f9f9",
        padding: "20px",
      }}>

        <h2 style={{ textAlign: "center" }}>User Queries</h2>
        <table border="1" 
        cellPadding="10"
        style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>

          <thead style={{background:"#ddd"}}>
            <tr>
              <th>Full Name : </th>
              <th>Email ID : </th>
              <th>Problem Subject : </th>
              <th>Details of Problem : </th>
            </tr>
          </thead>

          <tbody>
            {contacts.length > 0 ?(
              contacts.map((con,id)=>(
                <tr key={id}>
                  <td>{con.fullname}</td>
                  <td>{con.email}</td>
                  <td>{con.issue}</td>
                  <td>{con.msg}</td>
                </tr>
              ))
            ):(
              <tr>
                <td colSpan="4">No Contacts Found....</td>
              </tr>
            )}
          </tbody>

        </table>
    </div>
    </>
  )
}

export default UserQueries
