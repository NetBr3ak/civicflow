"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// Define the Report type to match our Prisma schema
interface Report {
	id: number;
	name: string;
	email: string;
	category: string;
	message: string;
	createdAt: Date;
	priority: string;
}

// Helper function to determine status badge styling based on category
const getCategoryStyle = (category: string) => {
	switch (category) {
		case "Infrastructure": return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
		case "Education": return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
		case "Public Safety": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
		case "Healthcare": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
		case "Environmental": return "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400";
		default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
	}
};

// Helper function for priority styling
const getPriorityStyle = (priority: string) => {
	switch (priority) {
		case "high": return "text-orange-600 dark:text-orange-400";
		case "low": return "text-green-600 dark:text-green-400";
		default: return "text-blue-600 dark:text-blue-400";
	}
};

// Format date for better display and readability
const formatDate = (date: Date) => {
	return new Date(date).toLocaleString('en-US', {
		month: 'short',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	});
};

export default function Dashboard() {
	const [reports, setReports] = useState<Report[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchReports = async () => {
			try {
				const response = await fetch('/api/report');
				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.message || 'Failed to fetch reports');
				}

				setReports(data.reports);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'An unknown error occurred');
			} finally {
				setLoading(false);
			}
		};

		fetchReports();
	}, []);

	// Calculate metrics for dashboard
	const recentReports = reports.filter(
		r => new Date(r.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
	);
	const uniqueCategories = new Set(reports.map(r => r.category)).size;

	// Determine priority distribution
	const priorityCounts = reports.reduce<Record<string, number>>((acc, report) => {
		const priority = report.priority || "normal";
		acc[priority] = (acc[priority] || 0) + 1;
		return acc;
	}, {});

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
							<p className="text-sm text-blue-100">Admin Dashboard</p>
						</div>
					</div>
					<div className="flex space-x-4">
						<Link href="/" className="text-sm bg-blue-700 hover:bg-blue-600 px-3 py-1 rounded-lg transition duration-200">
							Home
						</Link>
						<button
							onClick={() => window.print()}
							className="text-sm bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-lg transition duration-200"
						>
							Export
						</button>
					</div>
				</div>
			</header>
			{/* Dashboard Content */}
			<main className="max-w-7xl mx-auto px-4 py-4">
				{loading ? (
					<div className="flex justify-center items-center p-8">
						<div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
					</div>
				) : error ? (
					<div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 rounded-lg text-red-700 dark:text-red-400">
						<h2 className="text-lg font-semibold mb-2">Error</h2>
						<p>{error}</p>
						<button
							onClick={() => window.location.reload()}
							className="mt-3 px-4 py-2 bg-red-100 dark:bg-red-900/30 rounded-md text-sm"
						>
							Retry
						</button>
					</div>
				) : (
					<div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
						{/* Header Banner - More compact */}
						<div className="bg-gradient-to-r from-blue-700 to-blue-600 p-4">
							<h1 className="text-xl text-white font-bold">Reports Dashboard</h1>
							<p className="text-sm text-blue-100">Review and manage submitted reports</p>
						</div>
						{/* Stats Summary - More efficient grid */}
						<div className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
							<div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 shadow-sm">
								<p className="text-sm text-gray-500 dark:text-gray-400">Total Reports</p>
								<p className="text-xl font-bold text-gray-900 dark:text-white">{reports.length}</p>
							</div>
							<div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 shadow-sm">
								<p className="text-sm text-gray-500 dark:text-gray-400">Recent Reports</p>
								<p className="text-xl font-bold text-gray-900 dark:text-white">
									{recentReports.length}
									<span className="text-xs font-normal ml-2 text-gray-500 dark:text-gray-400">Last 7 days</span>
								</p>
							</div>
							<div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 shadow-sm">
								<p className="text-sm text-gray-500 dark:text-gray-400">Categories</p>
								<p className="text-xl font-bold text-gray-900 dark:text-white">
									{uniqueCategories}
								</p>
							</div>
							<div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3 shadow-sm">
								<p className="text-sm text-gray-500 dark:text-gray-400">High Priority</p>
								<p className="text-xl font-bold text-gray-900 dark:text-white">
									{priorityCounts.high || 0}
								</p>
							</div>
						</div>
						{/* Reports List - Optimized layout */}
						<div className="p-4">
							<div className="flex justify-between items-center mb-3">
								<h2 className="text-lg font-semibold text-gray-800 dark:text-white">All Reports</h2>
								<div className="flex space-x-2">
									<Link href="/" className="text-xs px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 transition">
										New Report
									</Link>
								</div>
							</div>
							<div className="space-y-3">
								{reports.length === 0 ? (
									<div className="text-center py-8 text-gray-500 dark:text-gray-400">
										No reports have been submitted yet.
									</div>
								) : (
									reports.map(report => (
										<div
											key={report.id}
											className={`border border-gray-200 dark:border-gray-700 p-4 rounded-lg hover:shadow-md transition-shadow bg-white dark:bg-slate-800 ${report.priority === 'high' ? 'border-l-4 border-l-orange-500' : ''}`}
										>
											<div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
												<div className="flex items-center mb-2 sm:mb-0">
													<div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-700 dark:text-blue-300 mr-2 flex-shrink-0">
														{report.name.charAt(0).toUpperCase()}
													</div>
													<div>
														<div className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
															{report.name}
															{report.priority && report.priority !== 'normal' && (
																<span className={`text-xs ${getPriorityStyle(report.priority)}`}>
																	• {report.priority.charAt(0).toUpperCase() + report.priority.slice(1)} Priority
																</span>
															)}
														</div>
														<div className="text-xs text-gray-600 dark:text-gray-400">{report.email}</div>
													</div>
												</div>
												<div className="flex items-center space-x-2">
													<span className={`text-xs px-2 py-1 rounded-full ${getCategoryStyle(report.category)}`}>
														{report.category}
													</span>
													<span className="text-xs text-gray-500 dark:text-gray-400">
														{formatDate(report.createdAt)}
													</span>
												</div>
											</div>
											<div className="mt-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-slate-700/50 p-3 rounded">
												{report.message.length > 150
													? `${report.message.substring(0, 150)}...`
													: report.message}
											</div>
											<div className="mt-2 flex justify-end space-x-2">
												<button className="text-xs px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded hover:bg-green-200 dark:hover:bg-green-900/50 transition">
													Mark Resolved
												</button>
												<button className="text-xs px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 transition">
													Respond
												</button>
											</div>
										</div>
									))
								)}
							</div>
						</div>
					</div>
				)}
			</main>
			{/* Compact Footer */}
			<footer className="bg-gray-100 dark:bg-slate-900 mt-6 py-4 border-t border-gray-200 dark:border-gray-800">
				<div className="max-w-7xl mx-auto px-4">
					<div className="flex flex-col md:flex-row justify-between items-center">
						<p className="text-xs text-gray-500 dark:text-gray-400">
							&copy; {new Date().getFullYear()} CivicFlow. All rights reserved.
						</p>
						<div className="flex space-x-4 mt-2 md:mt-0">
							<Link href="/" className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Return to Home</Link>
							<a href="#" className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Help</a>
							<a href="#" className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Contact</a>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}