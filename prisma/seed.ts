// prisma/seed.ts
import { PrismaClient, CategoryType } from '@prisma/client'

const prisma = new PrismaClient()

const defaultCategories = [
  { name: 'Food & Dining', icon: '🍽️', color: '#FF5733', type: CategoryType.EXPENSE },
  { name: 'Transportation', icon: '🚗', color: '#33FF57', type: CategoryType.EXPENSE },
  { name: 'Shopping', icon: '🛍️', color: '#3357FF', type: CategoryType.EXPENSE },
  { name: 'Bills & Utilities', icon: '📱', color: '#FF33F6', type: CategoryType.EXPENSE },
  { name: 'Entertainment', icon: '🎮', color: '#33FFF6', type: CategoryType.EXPENSE },
  { name: 'Salary', icon: '💰', color: '#33FF57', type: CategoryType.INCOME },
  { name: 'Freelance', icon: '💻', color: '#3357FF', type: CategoryType.INCOME },
  { name: 'Investments', icon: '📈', color: '#FF5733', type: CategoryType.INCOME },
]

async function main() {
  for (const category of defaultCategories) {
    await prisma.category.create({
      data: {
        ...category,
        isDefault: true,
        user: {
          connect: {
            // Connect to admin user or first user
            email: 'admin@example.com'
          }
        }
      }
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })