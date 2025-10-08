import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

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
		const csrfToken = req.headers.get('X-CSRF-Token');
		if (!csrfToken) {
			return NextResponse.json({ message: "Missing CSRF token" }, { status: 403 });
		}

		const body = await req.json();
		const result = reportSchema.safeParse(body);

		if (!result.success) {
			return NextResponse.json({
				message: "Validation failed",
				errors: result.error.errors
			}, { status: 400 });
		}

		const report = await prisma.report.create({ data: result.data });

		return NextResponse.json({
			message: "Report submitted successfully",
			report
		}, { status: 201 });
	} catch (error) {
		return NextResponse.json({
			message: "An error occurred"
		}, { status: 500 });
	}
}

export async function GET() {
	try {
		const reports = await prisma.report.findMany({
			orderBy: { createdAt: "desc" }
		});
		return NextResponse.json({ reports });
	} catch (error) {
		return NextResponse.json({ message: "Failed to fetch reports" }, { status: 500 });
	}
}

export async function DELETE(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const id = searchParams.get('id');

		if (!id) {
			return NextResponse.json({ message: "Report ID is required" }, { status: 400 });
		}

		await prisma.report.delete({
			where: { id: parseInt(id) }
		});

		return NextResponse.json({ message: "Report deleted successfully" });
	} catch (error) {
		return NextResponse.json({ message: "Failed to delete report" }, { status: 500 });
	}
}

export async function PATCH(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const id = searchParams.get('id');
		const body = await req.json();

		if (!id) {
			return NextResponse.json({ message: "Report ID is required" }, { status: 400 });
		}

		const report = await prisma.report.update({
			where: { id: parseInt(id) },
			data: { status: body.status }
		});

		return NextResponse.json({ message: "Report updated successfully", report });
	} catch (error) {
		return NextResponse.json({ message: "Failed to update report" }, { status: 500 });
	}
}