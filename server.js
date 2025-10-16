// import express from 'express';
// import cors from 'cors';

// const app = express();
// const PORT = 3001;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Health check endpoint
// app.get('/api/health', (req, res) => {
//   res.json({
//     status: 'OK',
//     message: 'Backend server is running successfully!',
//     timestamp: new Date().toISOString(),
//     version: '1.0.0'
//   });
// });

// // Example route structure for candidates
// app.get('/api', (req, res) => {
//   res.json({
//     message: 'Welcome to the NECX Messaging API',
//     endpoints: {
//       health: 'GET /api/health',
//       // Add your endpoints here
//     }
//   });
// });

// // 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({
//     error: 'Route not found',
//     message: `The route ${req.originalUrl} does not exist on this server`
//   });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     error: 'Something went wrong!',
//     message: err.message
//   });
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`📍 Health check: http://localhost:${PORT}/api/chats`);
//   console.log(`📍 API base: http://localhost:${PORT}/api`);
// });

import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'


import { connectDB } from './db.js'
import messages from './routes/messages.js'
import users from './routes/users.js'
import { notFound, errorHandler } from './middleware/errors.js'


const app = express()


// Security + basics
app.use(helmet({ crossOriginResourcePolicy: false }))
app.use(cors())
app.use(express.json({ limit: '1mb' }))
app.use(compression())
app.use(morgan('dev'))


// Health
app.get('/api/health', (req, res) => res.json({ status: 'ok', ts: Date.now() }))


// Routes
app.use('/api/messages', messages)
app.use('/api/users', users) // optional


// 404 + errors
app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 3000


// Start
const start = async () => {
await connectDB(process.env.MONGO_URI)
app.listen(PORT, () => console.log(`🚀 API listening on :${PORT}`))
}


start().catch((e) => { console.error(e); process.exit(1) })