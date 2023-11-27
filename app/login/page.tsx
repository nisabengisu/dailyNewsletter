"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const res = await fetch("http://localhost:3001/api/auth/login", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.access_token) {
        console.log("Token alındı:", data.access_token);
        document.cookie = `token=${data.access_token}; path=/;`;
    }
        console.log(res);

    if (res) {
    const nextUrl = searchParams.get("next");
    router.push(nextUrl || "/");
      router.refresh();
    } else {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="text" name="email" />
      </label>
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      <button type="submit">Login</button>
    </form>
  );
}