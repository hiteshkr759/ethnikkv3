import { Hono } from 'hono'
import  prismaClients  from '../lib/prisma';

const customerRouter = new Hono<{ Bindings: { DB: D1Database } }>()

//GET all customers 
customerRouter.get('/', async (c) => {
  const prisma = await prismaClients.fetch(c.env.DB)
  const customers = await prisma.customer.findMany()
  return c.json(customers)
})

// POST create customer 
customerRouter.post('/', async (c) => {
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

export default customerRouter