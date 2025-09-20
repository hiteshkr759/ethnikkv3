import { PrismaClient } from '../generated/prisma/'
import { PrismaD1 } from '@prisma/adapter-d1'
const prismaClients = {
  async fetch(db:any) {
    const adapter = new PrismaD1(db)
    const prisma = new PrismaClient({ adapter })
    return prisma
  },
}
export default prismaClients


