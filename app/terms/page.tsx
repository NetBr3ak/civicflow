import Link from "next/link";

export default function Terms() {
	return (
		<div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12 px-4">
			<div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
				<Link href="/" className="text-blue-600 hover:text-blue-700 text-sm mb-4 inline-block">
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
