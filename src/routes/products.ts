import { Hono } from 'hono'
import  prismaClients  from '../lib/prisma';

const productRouter = new Hono<{ Bindings: { DB: D1Database } }>()

// GET all products
productRouter.get('/', async (c) => {
  const prisma = await prismaClients.fetch(c.env.DB)
  const cutomers = await prisma.customer.findMany()
  return c.json(cutomers)
})

// POST create product
productRouter.post('/', async (c) => {
    try {
        const prisma = await prismaClients.fetch(c.env.DB)
        const body = await c.req.json()
        const customer = await prisma.customer.create({ data: body })
        return c.json(customer)
    } catch(error) {
        console.error('Error creating customer:', error);
        return c.json({ error: 'Failed to create customer', details: error }, 500) 
    }
})

export default productRouter