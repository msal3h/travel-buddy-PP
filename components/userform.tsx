"use client"
import { Box } from "@mui/material";    
import Navbar from "./Navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";


//useState: “Hold this value in memory”

//useEffect: “Run this code when something changes or on load”

//useRouter: “Help me move between pages or read the URL”

  
    
export default function UserForm() {

    const [name, setName] = useState("");
    const [email,setEmail] = useState("");
    const router = useRouter();
    const [loading, setLoading] = useState("")

    async function handleSubmit(e:React.FormEvent)  { // what happens after submitting form
    e.preventDefault (); //stops page reload
    const res = await fetch("/api/users", { // API endpoint to create user
        method:"POST", // POST request to create user
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({ name, email }), // send name and email as JSON
    });
    const data = await res.json();
    if (data.id) {
        router.push(`/user/${data.id}`) // redirect to user profile page after creation
    }
}


return(
  
    <Box sx={{ flexGrow: 1, minHeight: "100vh", bgcolor: "background.default" }}>
    <Navbar />
        <form onSubmit={handleSubmit}>
      <h2>Create your Profile</h2>
      <input
        placeholder="User Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        placeholder="Email"
        type="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      
      <button type="submit">Create User</button>
    </form>
    </Box>



)
}
