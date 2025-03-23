// src/lib/validation/expense.ts
import { z } from 'zod'

export const expenseSchema = z.object({
  amount: z.number().positive(),
  description: z.string().optional(),
  date: z.date(),
  categoryId: z.string().cuid(),
})

export const expenseQuerySchema = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  categoryId: z.string().cuid().optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).optional(),
})