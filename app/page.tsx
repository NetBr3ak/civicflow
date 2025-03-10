"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface FormData {
  name: string;
  email: string;
  category: string;
  message: string;
  priority: "low" | "normal" | "high";
}

interface FormErrors {
  name: string;
  email: string;
  category: string;
  message: string;
}

export default function Home() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    category: "",
    message: "",
    priority: "normal"
  });

  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    email: "",
    category: "",
    message: ""
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const validateForm = () => {
    const newErrors = { name: "", email: "", category: "", message: "" };

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!form.category) newErrors.category = "Please select a category";
    if (!form.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return !Object.values(newErrors).some(err => err !== "");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      setStatus("Please fix the errors in the form.");
      return;
    }

    if (!termsAccepted) {
      setStatus("Please accept the Terms of Service and Privacy Policy.");
      return;
    }

    setLoading(true);

    try {
      const csrfToken = `token-${Date.now()}-${Math.random().toString(36).substring(2)}`;

      const res = await fetch("/api/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken
        },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        setStatus("Success! Your report has been submitted.");
        setForm({
          name: "",
          email: "",
          category: "",
          message: "",
          priority: "normal"
        });
        setSubmitted(true);
      } else {
        const errorData = await res.json();
        setStatus(`Failed: ${errorData.message || "Please try again."}`);
      }
    } catch (error) {
      setStatus("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      category: "",
      message: "",
      priority: "normal"
    });
    setErrors({ name: "", email: "", category: "", message: "" });
    setStatus("");
    setTermsAccepted(false);
  };

  const statusClass = status.includes('Success')
    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
    : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/globe.svg"
              alt="CivicFlow"
              width={32}
              height={32}
              className="dark:invert"
              priority
            />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">CivicFlow</h1>
          </div>
          <Link href="/dashboard" className="text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-900 dark:text-white rounded-lg transition">
            Dashboard
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 order-1">
            {submitted ? (
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 text-center animate-fade-in">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Thank You!</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">Your report has been successfully submitted.</p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200"
                >
                  Submit Another Report
                </button>
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-5">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Submit a Report</h1>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Please provide details about your concern</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="name">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        placeholder="Enter your full name"
                        value={form.name}
                        onChange={handleInputChange}
                        aria-invalid={errors.name ? "true" : "false"}
                        aria-required="true"
                        className={`w-full p-3 border ${errors.name ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none dark:bg-slate-700 dark:text-white transition-colors`}
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="email">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={form.email}
                        onChange={handleInputChange}
                        aria-invalid={errors.email ? "true" : "false"}
                        aria-required="true"
                        autoComplete="email"
                        className={`w-full p-3 border ${errors.email ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none dark:bg-slate-700 dark:text-white transition-colors`}
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="category">
                        Report Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={form.category}
                        onChange={handleInputChange}
                        aria-invalid={errors.category ? "true" : "false"}
                        aria-required="true"
                        className={`w-full p-3 border ${errors.category ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none dark:bg-slate-700 dark:text-white transition-colors`}
                      >
                        <option value="">Select category</option>
                        <option value="Infrastructure">Infrastructure</option>
                        <option value="Education">Education</option>
                        <option value="Public Safety">Public Safety</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Environmental">Environmental</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.category && <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">{errors.category}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="priority">
                        Priority Level
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <input
                            type="radio"
                            id="priority-low"
                            name="priority"
                            value="low"
                            checked={form.priority === "low"}
                            onChange={handleInputChange}
                            className="sr-only peer"
                          />
                          <label
                            htmlFor="priority-low"
                            className="flex justify-center p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium peer-checked:bg-green-100 peer-checked:border-green-500 peer-checked:text-green-800 dark:peer-checked:bg-green-900/30 dark:peer-checked:border-green-500 dark:peer-checked:text-green-400 cursor-pointer dark:text-gray-300 hover:border-green-400 transition-all"
                          >
                            Low
                          </label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="priority-normal"
                            name="priority"
                            value="normal"
                            checked={form.priority === "normal"}
                            onChange={handleInputChange}
                            className="sr-only peer"
                          />
                          <label
                            htmlFor="priority-normal"
                            className="flex justify-center p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium peer-checked:bg-blue-100 peer-checked:border-blue-500 peer-checked:text-blue-800 dark:peer-checked:bg-blue-900/30 dark:peer-checked:border-blue-500 dark:peer-checked:text-blue-400 cursor-pointer dark:text-gray-300 hover:border-blue-400 transition-all"
                          >
                            Normal
                          </label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="priority-high"
                            name="priority"
                            value="high"
                            checked={form.priority === "high"}
                            onChange={handleInputChange}
                            className="sr-only peer"
                          />
                          <label
                            htmlFor="priority-high"
                            className="flex justify-center p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium peer-checked:bg-orange-100 peer-checked:border-orange-500 peer-checked:text-orange-800 dark:peer-checked:bg-orange-900/30 dark:peer-checked:border-orange-500 dark:peer-checked:text-orange-400 cursor-pointer dark:text-gray-300 hover:border-orange-400 transition-all"
                          >
                            High
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="message">
                        Report Details <span className="text-red-500">*</span>
                      </label>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{form.message.length}/500</span>
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Please provide detailed information about your report..."
                      value={form.message}
                      onChange={handleInputChange}
                      rows={4}
                      maxLength={500}
                      aria-invalid={errors.message ? "true" : "false"}
                      aria-required="true"
                      className={`w-full p-3 border ${errors.message ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none dark:bg-slate-700 dark:text-white transition-colors`}
                    />
                    {errors.message && <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">{errors.message}</p>}
                  </div>

                  <div className="flex items-start">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={() => setTermsAccepted(prev => !prev)}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      aria-required="true"
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-600 dark:text-gray-400">
                      I agree to the <Link href="/terms" className="text-blue-600 hover:underline dark:text-blue-400">Terms of Service</Link> and <Link href="/privacy" className="text-blue-600 hover:underline dark:text-blue-400">Privacy Policy</Link>
                    </label>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between pt-1">
                    <div className="w-full sm:w-auto mb-2 sm:mb-0">
                      {status && (
                        <div className={`text-sm px-3 py-1 rounded-lg ${statusClass}`} role="alert">
                          {status}
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-3 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={resetForm}
                        className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-200"
                      >
                        Reset
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : "Submit Report"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>

          <div className="md:col-span-1 order-2 md:order-1">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 sticky top-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Guidelines</h2>

              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <p>• Provide accurate information</p>
                <p>• Select the right category</p>
                <p>• Choose priority level</p>
                <p>• Keep details clear and concise</p>
              </div>

              <div className="mt-5 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Need help?</p>
                <p className="text-xs mt-1 text-gray-600 dark:text-gray-300">Contact: support@civicflow.com</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © 2025 CivicFlow. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition">
                Terms
              </Link>
              <Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}