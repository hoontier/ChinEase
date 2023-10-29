import React, { useState } from 'react';
import Select from 'react-select';
import { Provider } from 'react-redux';
import { store } from './features/store';
import VocabSelector from './components/VocabSelector';
import WordsTable from './components/WordsTable';
import Flashcards from './components/Flashcards';

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

function App() {
    return (
        <Provider store={store}>
            <Content />
        </Provider>
    );
}

export default App;
