function  DeleteUser() {
    const handleSubmit=async ()=>{
        const data = {
            email:"dmehulf@gamfsdil.com",
        }
        const res = await fetch("http://localhost:3000/api/auth/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        console.log(res);
    }
  return (
    <div>
        <button onClick={handleSubmit}>Delete User</button>
    </div>
  )
}

export default DeleteUser