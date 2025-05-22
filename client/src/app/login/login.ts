async function loginUser(formData: FormData) {
  const json = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const res = await fetch("http://localhost:3001/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  const data = await res.json();
  // Store the token
  localStorage.setItem('token', data.token);
  return data;
}

export default loginUser;