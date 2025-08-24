"use client";
import { signOut } from "next-auth/react";


export default function SignOut(){
    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        await signOut();
    };


    return (
        <form onSubmit={handleSubmit}>
            <button type="submit">
                Sign Out
            </button>
        </form>

    )

}