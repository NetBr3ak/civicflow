import Link from "next/link";

export default function Terms() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12 px-4">
			<div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
				<Link href="/" className="text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-900 dark:text-white rounded-lg transition inline-flex items-center mb-6">
					← Back to Home
				</Link>

				<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
					Terms of Service
				</h1>

				<div className="prose dark:prose-invert max-w-none">
					<p className="text-gray-600 dark:text-gray-300 mb-4">
						Last updated: {new Date().toLocaleDateString()}
					</p>

					<h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
						1. Acceptance of Terms
					</h2>
					<p className="text-gray-600 dark:text-gray-300 mb-4">
						By using CivicFlow, you agree to these terms. If you don't agree, please don't use the service.
					</p>

					<h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
						2. Use of Service
					</h2>
					<p className="text-gray-600 dark:text-gray-300 mb-4">
						You can submit reports about civic issues. Please provide accurate information and be respectful.
					</p>

					<h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
						3. User Responsibilities
					</h2>
					<p className="text-gray-600 dark:text-gray-300 mb-4">
						Don't submit false reports or spam the system. Keep it real and helpful.
					</p>

					<h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
						4. Contact
					</h2>
					<p className="text-gray-600 dark:text-gray-300">
						Questions? Reach out through the contact form on our main page.
					</p>
				</div>
			</div>
		</div>
	);
}
