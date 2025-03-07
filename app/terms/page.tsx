import Link from "next/link";
import Image from "next/image";

export default function Terms() {
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
						Terms of Service
					</h2>

					<div className="prose dark:prose-invert max-w-none">
						<p className="text-gray-600 dark:text-gray-300 mb-4">
							Last updated: {new Date().toLocaleDateString()}
						</p>

						<h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
							1. Acceptance of Terms
						</h3>
						<p className="text-gray-600 dark:text-gray-300 mb-4">
							By using CivicFlow, you agree to these terms. If you don't agree, please don't use the service.
						</p>

						<h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
							2. Use of Service
						</h3>
						<p className="text-gray-600 dark:text-gray-300 mb-4">
							You can submit reports about civic issues. Please provide accurate information and be respectful.
						</p>

						<h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
							3. User Responsibilities
						</h3>
						<p className="text-gray-600 dark:text-gray-300 mb-4">
							Don't submit false reports or spam the system. Keep it real and helpful.
						</p>

						<h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
							4. Contact
						</h3>
						<p className="text-gray-600 dark:text-gray-300">
							Questions? Reach out through the contact form on our main page.
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
