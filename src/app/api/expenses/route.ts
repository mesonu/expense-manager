// src/app/api/expenses/route.ts
import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { authOptions } from "@/lib/auth/authOptions"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { amount, description, date, categoryId } = body

    const expense = await prisma.expense.create({
      data: {
        amount,
        description,
        date: new Date(date),
        userId: session.user.id,
        categoryId,
      },
      include: {
        category: true,
      },
    })

    return NextResponse.json(expense)
  } catch (error) {
    console.error("[EXPENSES_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")
    const categoryId = searchParams.get("categoryId")

    const expenses = await prisma.expense.findMany({
      where: {
        userId: session.user.id,
        ...(startDate && endDate ? {
          date: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          }
        } : {}),
        ...(categoryId ? { categoryId } : {}),
      },
      include: {
        category: true,
      },
      orderBy: {
        date: 'desc',
      },
    })

    return NextResponse.json(expenses)
  } catch (error) {
    console.error("[EXPENSES_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}