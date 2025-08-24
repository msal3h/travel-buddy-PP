"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SignIn from "@/components/sign-in";


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
console.log('Trip creation response:', data);

if (data.id) {
  router.push(`/trip/${data.id}`);
} else {
  alert(data.error || "Trip creation failed");

    } // the return part renders first then this 
      // backend saves when user interacts 

  }

  return (
    <>
      <SignIn />
      <form onSubmit={handleSubmit}>
        <h2>Create a New Trip</h2>
        <input
          placeholder="Trip Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <button type="submit">Create Trip</button>
    </form>
    </>
  );
}

{/* <button onClick = {onSmash}>
        Create trip
</button> */}

