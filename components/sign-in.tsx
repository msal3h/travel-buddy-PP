"use client";
import { signIn } from "next-auth/react";

interface SignInProps {
  onClose?: () => void;
}

export default function SignIn({ onClose }: SignInProps) {
  const handleSubmit = async (e: React.FormEvent  ) => { 
    e.preventDefault(); 
    await signIn("google"), { callbackUrl: "/dashboard" }  ;
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Sign in with Google</button>
    </form>
  )
}
// check whether the user is signed in
//