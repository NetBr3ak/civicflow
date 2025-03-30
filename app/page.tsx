"use client";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({ name: "", email: "", category: "", message: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setStatus("Success! Report sent.");
      setForm({ name: "", email: "", category: "", message: "" });
    } else {
      setStatus("Something went wrong.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl mb-4 font-bold">Submit a Report</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="p-2 border rounded" />
        <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="p-2 border rounded" />
        <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="p-2 border rounded">
          <option value="">Select category</option>
          <option value="Infrastructure">Infrastructure</option>
          <option value="Education">Education</option>
          <option value="Other">Other</option>
        </select>
        <textarea placeholder="Message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="p-2 border rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
        {status && <p>{status}</p>}
      </form>
    </div>
  );
}