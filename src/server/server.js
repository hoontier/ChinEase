//Server for doing text to speech conversion
// //server.js
// import express from 'express';
// import textToSpeech from '@google-cloud/text-to-speech';
// import bodyParser from 'body-parser';

// const app = express();
// const client = new textToSpeech.TextToSpeechClient();

// app.use(bodyParser.json());

// app.post('/synthesize-speech', async (req, res) => {
//     const { text } = req.body;

//     const request = {
//         input: { text },
//         voice: {
//             languageCode: 'cmn-CN',
//             name: 'cmn-CN-Standard-A',
//         },
//         audioConfig: {
//             audioEncoding: 'LINEAR16',
//             effectsProfileId: ['small-bluetooth-speaker-class-device'],
//             pitch: 0,
//             speakingRate: 1,
//         },
//     };

//     try {
//         const [response] = await client.synthesizeSpeech(request);
//         res.json({ audioContent: response.audioContent });
//     } catch (error) {
//         console.error('Error in text to speech conversion', error);
//         res.status(500).send('Error synthesizing speech');
//     }
// });

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

//Server for the SQL data
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

// app.get('/api/vocabulary', async (req, res) => {
//     try {
//         const vocabulary = await prisma.vocabulary.findMany();
//         res.json(vocabulary);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });