import { getApiUrl } from '../services/api';

async function loginUser(formData: FormData) {
  const json = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const res = await fetch(getApiUrl("/auth/login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Login failed");
  }

  const data = await res.json();
  // Store the token
  localStorage.setItem('token', data.token);
  return data;
}

export default loginUser;