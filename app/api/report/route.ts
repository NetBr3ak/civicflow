import { NextResponse } from "next/server";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

// Use singleton pattern for Prisma client to prevent connection leaks
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
	globalForPrisma.prisma ||
	new PrismaClient({
		log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
	});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Validation schema with better error messages
const reportSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Invalid email format"),
	category: z.string().min(1, "Category is required"),
	message: z.string().min(5, "Message must be at least 5 characters"),
	priority: z.enum(["low", "normal", "high"]).optional().default("normal"),
});

export type ReportInput = z.infer<typeof reportSchema>;

export async function POST(req: Request) {
	try {
		// Add CORS headers if needed
		const origin = req.headers.get('origin');

		// Validate CSRF token
		const csrfToken = req.headers.get('X-CSRF-Token');
		if (!csrfToken) {
			return NextResponse.json({ message: "Missing CSRF token" }, { status: 403 });
		}

		// Parse and validate request body
		const body = await req.json();
		const result = reportSchema.safeParse(body);

		if (!result.success) {
			const { errors } = result.error;
			return NextResponse.json({
				message: "Validation failed",
				errors: errors.map(e => ({ path: e.path.join('.'), message: e.message }))
			}, {
				status: 400
			});
		}

		// Create report in database
		const report = await prisma.report.create({
			data: result.data
		});

		// Return success response
		return NextResponse.json({
			message: "Report submitted successfully",
			report
		}, {
			status: 201
		});
	} catch (error) {
		console.error("Report submission error:", error);
		return NextResponse.json({
			message: "An error occurred while processing your request"
		}, {
			status: 500
		});
	}
}

export async function GET() {
	try {
		const reports = await prisma.report.findMany({
			orderBy: { createdAt: "desc" }
		});

		return NextResponse.json({ reports });
	} catch (error) {
		console.error("Error fetching reports:", error);
		return NextResponse.json({ message: "Failed to fetch reports" }, { status: 500 });
	}
}