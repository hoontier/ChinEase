// // server.js
// import express from 'express';
// import { PrismaClient } from '@prisma/client';
// import cors from 'cors';

// const app = express();
// const prisma = new PrismaClient();

// // Enable CORS for all routes and origins
// app.use(cors({
//   origin: 'http://localhost:5173' // Specify the origin of your frontend app
// }));

// app.get('/api/lessons', async (req, res) => {
//   try {
//     const lessons = await prisma.lessons.findMany();
//     res.json(lessons);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });