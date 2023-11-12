App.jsx
import React, { useState } from 'react';
import Select from 'react-select';
import { Provider } from 'react-redux';
import { store } from './features/store';
import VocabSelector from './components/VocabSelector';
import WordsTable from './components/WordsTable';
import Flashcards from './components/Flashcards';
// import { PrismaCleint } from '@prisma/client';

function Content() {
    const [isFlashcardsView, setIsFlashcardsView] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState(['Number', 'Hanzi', 'Pinyin', 'English']); // Default columns

    const columnOptions = [
        { value: 'Number', label: 'Number' },
        { value: 'Hanzi', label: 'Hanzi' },
        { value: 'Pinyin', label: 'Pinyin' },
        { value: 'No Tones', label: 'No Tones' },
        { value: 'English', label: 'English' }
    ];
    

    const handleColumnChange = (selectedOptions) => {
        setSelectedColumns(selectedOptions.map(option => option.value));
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <VocabSelector />
                <div className="flex mt-4 mb-4 items-center">
                    <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none mr-4"
                        onClick={() => setIsFlashcardsView(!isFlashcardsView)}
                    >
                        {isFlashcardsView ? 'Show Table' : 'Show Flashcards'}
                    </button>
                    {!isFlashcardsView && (
                        <Select
                            isMulti
                            options={columnOptions}
                            value={selectedColumns.map(col => ({ value: col, label: col }))}
                            onChange={handleColumnChange}
                            className="flex-grow"
                        />
                    )}
                </div>
                {isFlashcardsView ? <Flashcards /> : <WordsTable columns={selectedColumns} />}
            </div>
        </div>
    );
}

// //App.jsx
// import React, { useState, useEffect } from 'react';
// import { Provider } from 'react-redux';
// import { store } from './features/store';

// function Content() {
//   const [lessons, setLessons] = useState([]);

//     useEffect(() => {
//         // Change the fetch URL to include the server's port number
//         fetch('http://localhost:3001/api/lessons')
//           .then(response => {
//             console.log(response); // Log the response object
//             if (!response.ok) {
//               throw new Error('Network response was not ok');
//             }
//             return response.text(); // Use text() instead of json() to read the response body as plain text
//           })
//           .then(text => {
//             try {
//               const data = JSON.parse(text); // Try to parse text as JSON
//               setLessons(data);
//             } catch (error) {
//               console.error('Error parsing JSON:', error);
//               console.log('Received text:', text); // Log the plain text response
//             }
//           })
//           .catch(error => {
//             console.error('There has been a problem with your fetch operation:', error);
//           });
//       }, []);
  

//   return (
//     <div className="lessons-table">
//       <h1>Lessons</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//           </tr>
//         </thead>
//         <tbody>
//           {lessons.map(lesson => (
//             <tr key={lesson.id}>
//               <td>{lesson.id}</td>
//               <td>{lesson.name}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

function App() {
    return (
        <Provider store={store}>
            <Content />
        </Provider>
    );
}

export default App;
