async function checkAuth() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const res = await fetch("http://localhost:3001/auth/login", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  return await res.json();
}

export default checkAuth;