"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Report {
	id: number;
	name: string;
	email: string;
	category: string;
	message: string;
	createdAt: Date;
	priority: string;
}

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

const getPriorityStyle = (priority: string) => {
	switch (priority) {
		case "high": return "text-orange-600 dark:text-orange-400";
		case "low": return "text-green-600 dark:text-green-400";
		default: return "text-blue-600 dark:text-blue-400";
	}
};

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
	const [sortBy, setSortBy] = useState<'date' | 'priority' | 'category'>('date');
	const [filterCategory, setFilterCategory] = useState<string>('all');
	const [filterPriority, setFilterPriority] = useState<string>('all');

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

	const recentReports = reports.filter(
		r => new Date(r.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
	);
	const uniqueCategories = new Set(reports.map(r => r.category)).size;

	const priorityCounts = reports.reduce<Record<string, number>>((acc, report) => {
		const priority = report.priority || "normal";
		acc[priority] = (acc[priority] || 0) + 1;
		return acc;
	}, {});

	const filteredReports = reports.filter(report => {
		if (filterCategory !== 'all' && report.category !== filterCategory) return false;
		if (filterPriority !== 'all' && report.priority !== filterPriority) return false;
		return true;
	});

	const sortedReports = [...filteredReports].sort((a, b) => {
		if (sortBy === 'date') {
			return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
		}
		if (sortBy === 'priority') {
			const priorityOrder = { high: 3, normal: 2, low: 1 };
			return (priorityOrder[b.priority as keyof typeof priorityOrder] || 0) - (priorityOrder[a.priority as keyof typeof priorityOrder] || 0);
		}
		if (sortBy === 'category') {
			return a.category.localeCompare(b.category);
		}
		return 0;
	});

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
							priority
						/>
						<div>
							<h1 className="text-xl font-bold text-gray-900 dark:text-white">CivicFlow</h1>
							<p className="text-xs text-gray-500 dark:text-gray-400">Admin Panel</p>
						</div>
					</div>
					<Link href="/" className="text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-gray-900 dark:text-white rounded-lg transition">
						← Back
					</Link>
				</div>
			</header>
			<main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
				{loading ? (
					<div className="flex items-center justify-center h-64">
						<div className="text-center">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
							<p className="mt-4 text-gray-600 dark:text-gray-400">Loading reports...</p>
						</div>
					</div>
				) : error ? (
					<div className="text-center py-8">
						<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md mx-auto">
							<p className="text-red-800 dark:text-red-300 mb-4">{error}</p>
							<button
								onClick={() => window.location.reload()}
								className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
							>
								Retry
							</button>
						</div>
					</div>
				) : (
					<div className="space-y-6">
						<div className="flex items-center justify-between mb-2">
							<div>
								<h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
								<p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Monitor and manage reports</p>
							</div>
							<Link href="/" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm font-medium">
								+ New Report
							</Link>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
							<div className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
								<p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Reports</p>
								<p className="text-3xl font-bold text-gray-900 dark:text-white">{reports.length}</p>
							</div>
							<div className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
								<p className="text-sm text-gray-600 dark:text-gray-400 mb-2">This Week</p>
								<p className="text-3xl font-bold text-gray-900 dark:text-white">{recentReports.length}</p>
							</div>
							<div className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
								<p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Categories</p>
								<p className="text-3xl font-bold text-gray-900 dark:text-white">{uniqueCategories}</p>
							</div>
							<div className="bg-white dark:bg-slate-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
								<p className="text-sm text-gray-600 dark:text-gray-400 mb-2">High Priority</p>
								<p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{priorityCounts.high || 0}</p>
							</div>
						</div>

						<div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-gray-700">
							<div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
								<div className="flex items-center justify-between mb-3">
									<div>
										<h3 className="text-lg font-semibold text-gray-900 dark:text-white">All Reports</h3>
										<p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{sortedReports.length} of {reports.length} shown</p>
									</div>
								</div>
								<div className="flex flex-wrap gap-3">
									<div className="flex items-center gap-2">
										<label className="text-sm text-gray-600 dark:text-gray-400 font-medium">Sort:</label>
										<select
											value={sortBy}
											onChange={(e) => setSortBy(e.target.value as 'date' | 'priority' | 'category')}
											className="text-sm px-3 py-1.5 bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
										>
											<option value="date">Date</option>
											<option value="priority">Priority</option>
											<option value="category">Category</option>
										</select>
									</div>
									<div className="flex items-center gap-2">
										<label className="text-sm text-gray-600 dark:text-gray-400 font-medium">Category:</label>
										<select
											value={filterCategory}
											onChange={(e) => setFilterCategory(e.target.value)}
											className="text-sm px-3 py-1.5 bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
										>
											<option value="all">All</option>
											<option value="Infrastructure">Infrastructure</option>
											<option value="Environmental">Environmental</option>
											<option value="Public Safety">Public Safety</option>
											<option value="Education">Education</option>
											<option value="Healthcare">Healthcare</option>
										</select>
									</div>
									<div className="flex items-center gap-2">
										<label className="text-sm text-gray-600 dark:text-gray-400 font-medium">Priority:</label>
										<select
											value={filterPriority}
											onChange={(e) => setFilterPriority(e.target.value)}
											className="text-sm px-3 py-1.5 bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
										>
											<option value="all">All</option>
											<option value="high">High</option>
											<option value="normal">Normal</option>
											<option value="low">Low</option>
										</select>
									</div>
								</div>
							</div>
							<div className="divide-y divide-gray-100 dark:divide-gray-700">
								{sortedReports.length === 0 ? (
									<div className="p-12 text-center">
										<div className="text-gray-300 dark:text-gray-600 text-5xl mb-3">📋</div>
										<p className="text-gray-600 dark:text-gray-400 font-medium">No reports match filters</p>
										<p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Try adjusting your filters</p>
									</div>
								) : (
									sortedReports.map(report => (
										<div
											key={report.id}
											className="p-5 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition"
										>
											<div className="flex items-start gap-4">
												<div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">
													{report.name.charAt(0).toUpperCase()}
												</div>
												<div className="flex-1 min-w-0">
													<div className="flex items-center justify-between gap-3 mb-2">
														<div className="flex items-center gap-2 flex-wrap">
															<h4 className="font-semibold text-gray-900 dark:text-white">{report.name}</h4>
															<span className={`text-xs px-2 py-0.5 rounded font-medium ${getCategoryStyle(report.category)}`}>
																{report.category}
															</span>
															{report.priority !== 'normal' && (
																<span className={`text-xs px-2 py-0.5 rounded font-medium ${report.priority === 'high' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'}`}>
																	{report.priority}
																</span>
															)}
														</div>
														<span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
															{formatDate(report.createdAt)}
														</span>
													</div>
													<p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{report.email}</p>
													<p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{report.message}</p>
												</div>
											</div>
										</div>
									))
								)}
							</div>
						</div>
					</div>
				)}
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