// const mysql = require('mysql2/promise');
// const fs = require('fs').promises;

// async function main() {
//     // Read the JSON data from the file
//     const rawData = await fs.readFile('./words.json', 'utf-8');
//     const lessonsData = JSON.parse(rawData);

//     // Connect to the database
//     const connection = await mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: '',
//         database: 'chinese'
//     });

//     for (const lessonGroup of lessonsData) {
//         for (const lessonName in lessonGroup) {
//             // Insert lesson into the lessons table and get its ID
//             const [lessonResult] = await connection.execute('INSERT INTO lessons (name) VALUES (?)', [lessonName]);
//             const lessonId = lessonResult.insertId;

//             // Insert each vocabulary item for the current lesson
//             for (const vocabItem of lessonGroup[lessonName]) {
//                 await connection.execute(
//                     'INSERT INTO vocabulary (lesson_id, hanzi, pinyin, noTones, english) VALUES (?, ?, ?, ?, ?)',
//                     [lessonId, vocabItem.hanzi, vocabItem.pinyin, vocabItem.noTones, vocabItem.english]
//                 );
//             }
//         }
//     }

//     // Close the database connection
//     await connection.end();
// }

// main().catch(error => {
//     console.error("Error:", error);
//     process.exit(1);
// });
