"use client";
import { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

// Define TypeScript interfaces for better type safety
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
  // Form state with minimal required fields
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    category: "",
    message: "",
    priority: "normal"
  });

  // Form validation state
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

  // Form validation function - memoized to improve performance
  const validateForm = useCallback(() => {
    let isValid = true;
    const newErrors = { name: "", email: "", category: "", message: "" };

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!form.category) {
      newErrors.category = "Please select a category";
      isValid = false;
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }, [form]);

  // Handle form submission
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
      // Simple CSRF token generation for demo purposes
      const csrfToken = `token-${Date.now()}-${Math.random().toString(36).substring(2)}`;

      const res = await fetch("/api/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken
        },
        body: JSON.stringify(form),
        credentials: "same-origin"
      });

      if (res.ok) {
        const data = await res.json();
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
        setStatus(`Submission failed: ${errorData.message || "Please try again later."}`);
      }
    } catch (error) {
      setStatus("An unexpected error occurred. Please try again.");
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes with validation
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));

    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: "" }));
    }
  }, [errors]);

  // Reset form handler
  const resetForm = useCallback(() => {
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
  }, []);

  // Status message styling
  const statusClass = useMemo(() =>
    status.includes('Success')
      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    [status]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Compact Header */}
      <header className="bg-blue-800 dark:bg-blue-900 text-white py-3 px-4 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-row items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/globe.svg"
              alt="CivicFlow Logo"
              width={32}
              height={32}
              className="mr-2 dark:invert"
              priority
            />
            <div>
              <h1 className="text-xl font-bold">CivicFlow</h1>
              <p className="text-sm text-blue-100">Citizen Reporting Portal</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <Link href="/dashboard" className="text-sm bg-blue-700 hover:bg-blue-600 px-3 py-1 rounded-lg transition duration-200">
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="md:col-span-2 order-1">
            {submitted ? (
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 text-center">
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
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md">
                <div className="bg-gradient-to-r from-blue-700 to-blue-600 p-4 rounded-t-lg">
                  <h1 className="text-xl text-white font-bold">Submit a Report</h1>
                  <p className="text-blue-100 text-sm">Please provide details about your concern</p>
                </div>

                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name Field */}
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
                        className={`w-full p-2 border ${errors.name ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white`}
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">{errors.name}</p>}
                    </div>

                    {/* Email Field */}
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
                        className={`w-full p-2 border ${errors.email ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white`}
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Category Field */}
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
                        className={`w-full p-2 border ${errors.category ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white`}
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

                    {/* Priority Field */}
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
                            className="flex justify-center p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm peer-checked:bg-green-100 peer-checked:border-green-500 peer-checked:text-green-800 dark:peer-checked:bg-green-900/30 dark:peer-checked:border-green-500 dark:peer-checked:text-green-400 cursor-pointer dark:text-gray-300"
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
                            className="flex justify-center p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm peer-checked:bg-blue-100 peer-checked:border-blue-500 peer-checked:text-blue-800 dark:peer-checked:bg-blue-900/30 dark:peer-checked:border-blue-500 dark:peer-checked:text-blue-400 cursor-pointer dark:text-gray-300"
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
                            className="flex justify-center p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm peer-checked:bg-orange-100 peer-checked:border-orange-500 peer-checked:text-orange-800 dark:peer-checked:bg-orange-900/30 dark:peer-checked:border-orange-500 dark:peer-checked:text-orange-400 cursor-pointer dark:text-gray-300"
                          >
                            High
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="message">
                      Report Details <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Please provide detailed information about your report..."
                      value={form.message}
                      onChange={handleInputChange}
                      rows={4}
                      aria-invalid={errors.message ? "true" : "false"}
                      aria-required="true"
                      className={`w-full p-2 border ${errors.message ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:text-white`}
                    />
                    {errors.message && <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">{errors.message}</p>}
                  </div>

                  {/* Terms and Consent */}
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
                      I agree to the <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">Privacy Policy</a>
                    </label>
                  </div>

                  {/* Form Actions */}
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

          {/* Info Side Panel - More compact */}
          <div className="md:col-span-1 order-2 md:order-1">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 sticky top-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Reporting Guidelines</h2>

              <div className="space-y-3 text-gray-600 dark:text-gray-300">
                <div className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-900 p-1 rounded-full mr-2">
                    <Image src="/file.svg" alt="Document" width={16} height={16} className="dark:invert" />
                  </div>
                  <p className="text-xs">Provide accurate and detailed information to help us process your report efficiently.</p>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-900 p-1 rounded-full mr-2">
                    <Image src="/window.svg" alt="Priority" width={16} height={16} className="dark:invert" />
                  </div>
                  <p className="text-xs">Select the appropriate category and priority level for your report.</p>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-900 p-1 rounded-full mr-2">
                    <Image src="/globe.svg" alt="Tracking" width={16} height={16} className="dark:invert" />
                  </div>
                  <p className="text-xs">You'll receive email updates about the status of your submission.</p>
                </div>
              </div>

              <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                <h3 className="font-medium text-blue-800 dark:text-blue-300 text-xs">Need urgent assistance?</h3>
                <p className="text-xs mt-1 text-gray-600 dark:text-gray-300">Call our hotline at (555) 123-4567.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Compact Footer */}
      <footer className="bg-gray-100 dark:bg-slate-900 mt-6 py-4 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} CivicFlow. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <a href="#" className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">How It Works</a>
              <a href="#" className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">FAQs</a>
              <a href="#" className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}