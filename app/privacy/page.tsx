import Link from "next/link";
import Image from "next/image";

export default function Privacy() {
	return (
		<div className="min-h-screen flex flex-col">
			<header className="bg-white dark:bg-slate-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
				<div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<Image
							src="/globe.svg"
							alt="CivicFlow"
							width={32}
							height={32}
							className="dark:invert"
						/>
						<h1 className="text-xl font-bold text-gray-900 dark:text-white">CivicFlow</h1>
					</div>
					<Link href="/" className="text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-900 dark:text-white rounded-lg transition">
						← Back
					</Link>
				</div>
			</header>

			<main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
				<div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
						Privacy Policy
					</h2>

					<div className="prose dark:prose-invert max-w-none">
						<p className="text-gray-600 dark:text-gray-300 mb-4">
							Last updated: {new Date().toLocaleDateString()}
						</p>

						<h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
							1. Information We Collect
						</h3>
						<p className="text-gray-600 dark:text-gray-300 mb-4">
							We collect your name, email, and report details when you submit a report. That's it.
						</p>

						<h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
							2. How We Use Your Data
						</h3>
						<p className="text-gray-600 dark:text-gray-300 mb-4">
							Your info is used to process and respond to your reports. We don't sell or share your data with third parties.
						</p>

						<h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
							3. Data Storage
						</h3>
						<p className="text-gray-600 dark:text-gray-300 mb-4">
							Reports are stored securely in our database. We keep them to track and resolve issues.
						</p>

						<h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
							4. Your Rights
						</h3>
						<p className="text-gray-600 dark:text-gray-300">
							You can request to see or delete your data anytime. Just contact us.
						</p>
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
