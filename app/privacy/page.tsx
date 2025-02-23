import Link from "next/link";

export default function Privacy() {
	return (
		<div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12 px-4">
			<div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
				<Link href="/" className="text-blue-600 hover:text-blue-700 text-sm mb-4 inline-block">
					← Back to Home
				</Link>

				<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
					Privacy Policy
				</h1>

				<div className="prose dark:prose-invert max-w-none">
					<p className="text-gray-600 dark:text-gray-300 mb-4">
						Last updated: {new Date().toLocaleDateString()}
					</p>

					<h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
						1. Information We Collect
					</h2>
					<p className="text-gray-600 dark:text-gray-300 mb-4">
						We collect your name, email, and report details when you submit a report. That's it.
					</p>

					<h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
						2. How We Use Your Data
					</h2>
					<p className="text-gray-600 dark:text-gray-300 mb-4">
						Your info is used to process and respond to your reports. We don't sell or share your data with third parties.
					</p>

					<h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
						3. Data Storage
					</h2>
					<p className="text-gray-600 dark:text-gray-300 mb-4">
						Reports are stored securely in our database. We keep them to track and resolve issues.
					</p>

					<h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
						4. Your Rights
					</h2>
					<p className="text-gray-600 dark:text-gray-300">
						You can request to see or delete your data anytime. Just contact us.
					</p>
				</div>
			</div>
		</div>
	);
}
