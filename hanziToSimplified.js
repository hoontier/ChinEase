// import { readFileSync, writeFileSync } from 'fs';

// // Read the JSON data from the file
// const rawData = readFileSync('words.json');
// const jsonData = JSON.parse(rawData);

// // Iterate through each lesson in the JSON
// jsonData.forEach((lesson) => {
//   Object.keys(lesson).forEach((dialogueKey) => {
//     const dialogue = lesson[dialogueKey];
//     dialogue.forEach((word) => {
//       word.simplified = word.hanzi; // Rename 'hanzi' to 'simplified'
//       delete word.hanzi; // Remove the 'hanzi' property
//     });
//   });
// });

// // Save the updated JSON back to the file
// const updatedData = JSON.stringify(jsonData, null, 2);
// writeFileSync('words.json', updatedData);
