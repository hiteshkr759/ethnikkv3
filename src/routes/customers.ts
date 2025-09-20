import { Hono } from 'hono'
import  prismaClients  from '../lib/prisma';

const customerRouter = new Hono<{ Bindings: { DB: D1Database } }>()

//GET all customers 
customerRouter.get('/', async (c) => {
  const prisma = await prismaClients.fetch(c.env.DB)
  const products = await prisma.product.findMany()
  return c.json(products)
})

// POST create customer 
customerRouter.post('/', async (c) => {
    try {
        const prisma = await prismaClients.fetch(c.env.DB)
        const body = await c.req.json()
        const product = await prisma.product.create({ data: body })
        return c.json(product)
    } catch(error) {
        console.error('Error creating product:', error);
        return c.json({ error: 'Failed to create product', details: error }, 500) 
    }
})

export default customerRouter