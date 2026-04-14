function Admin() {
  const role = localStorage.getItem("role");

  if (role !== "admin") {
    window.location.href = "/login";
  }

  return <h2>Admin Panel ⚙️</h2>;
}

export default Admin;