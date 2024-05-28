import db from "@/lib/supabase/db";
import { students } from "@/lib/supabase/schema";
import { and, ilike, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const search = req.nextUrl.searchParams;
    const page = Number(search.get("page")) || 1;
    const pageSize = Number(search.get("limit")) || 10;
    const name = search.get("name");
    const age = search.get("age");

  try {
    const offset = (page - 1) * pageSize;

    const result = await db
      .select()
      .from(students)
      .where(
        and(
          name ? ilike(students.name, `${"%" + name + "%"}`) : undefined,
          age ? eq(students.age, Number(age)) : undefined,
        )
      )
      .offset(offset)
      .limit(pageSize);

    return NextResponse.json({
      status: 200,
      response: "OK",
      data: result,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({
      status: 500,
      response: "Internal Server Error",
    });
  }
}
