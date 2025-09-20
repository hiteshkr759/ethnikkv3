import { Hono } from 'hono'
import { logger } from 'hono/logger'
import prismaClients from './lib/prisma';


const app = new Hono<{Bindings:{  DB: D1Database }}>() // binding env value

app.use('*', logger());
app.route('/products', await import('./routes/products').then((m) => m.default))
app.get('/', (c) => c.text('API is running 🚀'))
export default app