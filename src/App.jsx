//App.jsx
import React, { useState } from 'react';
import Select from 'react-select';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store } from './features/store';
import VocabSelector from './components/VocabSelector';
import WordsTable from './components/WordsTable';
import Flashcards from './components/Flashcards';
import Match from './components/Match';
import { setIsMenuHidden } from './features/vocabSlice';
// import { PrismaCleint } from '@prisma/client';

function Content() {
    const dispatch = useDispatch();
    const view = useSelector(state => state.vocab.view);
    const [selectedColumns, setSelectedColumns] = useState(['Number', 'Simplified', 'Zhuyin', 'Traditional', 'Pinyin', 'English']); // Default columns
    const isMenuHidden = useSelector(state => state.vocab.isMenuHidden);

    const columnOptions = [
        { value: 'Number', label: 'Number' },
        { value: 'Simplified', label: 'Simplified' },
        { value: 'Zhuyin', label: 'Zhuyin'},
        { value: 'Pinyin', label: 'Pinyin' },
        { value: 'No Tones', label: 'No Tones' },
        { value: 'English', label: 'English' },
        { value: 'Traditional', label: 'Traditional' }
    ];
    

    const handleColumnChange = (selectedOptions) => {
        setSelectedColumns(selectedOptions.map(option => option.value));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-start sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            { !isMenuHidden && (
            <>
                <VocabSelector />
                <div className="flex mt-4 mb-4 items-center">
                        <Select
                            isMulti
                            options={columnOptions}
                            value={selectedColumns.map(col => ({ value: col, label: col }))}
                            onChange={handleColumnChange}
                            className="flex-grow"
                        />
                </div>
            </>
            )}
                <button
                    onClick={() => dispatch(setIsMenuHidden(!isMenuHidden))}
                    className="p-2 bg-blue-300 hover:bg-blue-400 rounded focus:outline-none md:h-10 md:self-center text-sm"

                >
                    {isMenuHidden ? 'Show Menu' : 'Hide Menu'}
                </button>
                {/* {isFlashcardsView ? <Flashcards /> : <WordsTable columns={selectedColumns} />} */}
                {/* if view === list, render the WordsTable component. If view==="flashcards", render the flahscards component. if view==="match", render the match component */}
                {view === 'list' ? <WordsTable columns={selectedColumns} /> : view === 'flashcards' ? <Flashcards /> : <Match />}
            </div>
        </div>
    );
}

function App() {
    return (
        <Provider store={store}>
            <Content />
        </Provider>
    );
}

export default App;

// //App.jsx
// import React, { useState, useEffect } from 'react';
// import Select from 'react-select';
// import { Provider, useSelector, useDispatch } from 'react-redux';
// import { store } from './features/store';
// import VocabSelector from './components/VocabSelector';
// // import { fetchVocabLists, fetchVocabulary } from './features/vocabSlice';
// import WordsTable from './components/WordsTable';
// import Flashcards from './components/Flashcards';
// import { setIsMenuHidden } from './features/vocabSlice';
// // import { PrismaCleint } from '@prisma/client';

// function Content() {
//     const dispatch = useDispatch();
//     const isFlashcardsView = useSelector(state => state.vocab.isFlashcardsView);
//     const [selectedColumns, setSelectedColumns] = useState(['Number', 'Hanzi', 'Pinyin', 'English']); // Default columns
//     const isMenuHidden = useSelector(state => state.vocab.isMenuHidden);

//     // useEffect(() => {
//     //     dispatch(fetchVocabLists());
//     //     dispatch(fetchVocabulary());
//     // }, [dispatch]);

//     const columnOptions = [
//         { value: 'Number', label: 'Number' },
//         { value: 'Hanzi', label: 'Hanzi' },
//         { value: 'Pinyin', label: 'Pinyin' },
//         { value: 'No Tones', label: 'No Tones' },
//         { value: 'English', label: 'English' }
//     ];
    

//     const handleColumnChange = (selectedOptions) => {
//         setSelectedColumns(selectedOptions.map(option => option.value));
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 flex flex-col justify-start sm:py-12">
//             <div className="relative py-3 sm:max-w-xl sm:mx-auto">
//             { !isMenuHidden && (
//             <>
//                 <VocabSelector />
//                 <div className="flex mt-4 mb-4 items-center">
//                     {!isFlashcardsView && (
//                         <Select
//                             isMulti
//                             options={columnOptions}
//                             value={selectedColumns.map(col => ({ value: col, label: col }))}
//                             onChange={handleColumnChange}
//                             className="flex-grow"
//                         />
//                     )}
//                 </div>
//             </>
//             )}
//                 <button
//                     onClick={() => dispatch(setIsMenuHidden(!isMenuHidden))}
//                     className="p-2 bg-blue-300 hover:bg-blue-400 rounded focus:outline-none md:h-10 md:self-center text-sm"

//                 >
//                     {isMenuHidden ? 'Show Menu' : 'Hide Menu'}
//                 </button>
//                 {isFlashcardsView ? <Flashcards /> : <WordsTable columns={selectedColumns} />}
//             </div>
//         </div>
//     );
// }

// function App() {
//     return (
//         <Provider store={store}>
//             <Content />
//         </Provider>
//     );
// }

// export default App;
