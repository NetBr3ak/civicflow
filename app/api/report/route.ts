import { NextResponse } from "next/server";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const schema = z.object({
	name: z.string().min(2),
	email: z.string().email(),
	category: z.string(),
	message: z.string().min(5),
});

export async function POST(req: Request) {
	const body = await req.json();
	const parsed = schema.safeParse(body);

	if (!parsed.success) {
		return NextResponse.json({ error: "Invalid input" }, { status: 400 });
	}

	const report = await prisma.report.create({ data: parsed.data });
	return NextResponse.json(report);
}

export async function GET() {
	const reports = await prisma.report.findMany({
		orderBy: { createdAt: "desc" },
	});
	return NextResponse.json(reports);
}