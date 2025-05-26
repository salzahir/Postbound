async function checkAuth(param: string) {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found");
    return null;
  }

  const res = await fetch(`http://localhost:3001${param}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  return await res.json();
}

export default checkAuth;