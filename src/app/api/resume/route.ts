import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "src/doc", "resume.pdf");
  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Disposition": "inline; filename=mark_fayngersh_resume.pdf",
      "Content-Type": "application/pdf",
    },
  });
}
