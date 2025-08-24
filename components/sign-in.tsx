"use client";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const handleSubmit = async (e: React.FormEvent  ) => { 
    e.preventDefault(); 
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Sign in with Google</button>
    </form>
  );
}