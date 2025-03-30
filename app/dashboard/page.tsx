import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Dashboard() {
	const reports = await prisma.report.findMany({ orderBy: { createdAt: "desc" } });

	return (
		<div className="max-w-4xl mx-auto p-4">
			<h1 className="text-2xl mb-4 font-bold">Reports Dashboard</h1>
			<div className="space-y-4">
				{reports.map(report => (
					<div key={report.id} className="border p-4 rounded shadow">
						<div><strong>{report.name}</strong> ({report.email})</div>
						<div className="text-sm text-gray-600">{report.category} – {new Date(report.createdAt).toLocaleString()}</div>
						<div>{report.message}</div>
					</div>
				))}
			</div>
		</div>
	);
}