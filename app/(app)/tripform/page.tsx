"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SignIn from "@/components/sign-in";
import react from "react";

export default function TripForm() {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/trip", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, startDate, endDate }),
        credentials: "include",
    });
 const data = await res.json();


if (data.id) {
  router.push(`/trip/${data.id}`);
} else {
  alert(data.error || "Trip creation failed");

    } // the return part renders first then this 
      // backend saves when user interacts 

  }

  return (
    <div style={{
      display: "flex", // to use flexbox(flexible box layout)
      flexDirection: "column", // to stack children vertically
      alignItems: "center", // center horizontally
     justifyContent: "center", // center vertically
     marginTop: "40px"
  }}>

      <form onSubmit={handleSubmit} >
        <h2 style={{ 
          textAlign: "center"
        }}>Create a New Trip</h2>
        <input
          placeholder="Trip Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      style={{ marginRight: "20px" }}
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        style={{marginRight: "20px"}}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
          style={{ marginRight: "20px" }}
      />
      <button type="submit">Create Trip</button>
    </form>
    </div>
  );
}



