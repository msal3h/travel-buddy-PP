"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
    });
    const data = await res.json();
    console.log("Trip created:", data); // ✅ Check if trip was created

    if (data.id) {
    console.log("Redirecting to /trip/" + data.id); // ✅ Confirm redirect is being triggered
    router.push(`/trip/${data.id}`);
    } // the return part renders first then this 
      // backend saves when user interacts 

  }

  return (
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
  );
}
