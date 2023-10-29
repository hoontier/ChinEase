// App.jsx
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './features/store';
import VocabSelector from './components/VocabSelector';
import WordsTable from './components/WordsTable';
import Flashcards from './components/Flashcards';

function Content() {
    const [isFlashcardsView, setIsFlashcardsView] = useState(false); // To manage which view is displayed

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <VocabSelector />
                <button 
                    className="mt-4 mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                    onClick={() => setIsFlashcardsView(!isFlashcardsView)}
                >
                    {isFlashcardsView ? 'Show Table' : 'Show Flashcards'}
                </button>
                {isFlashcardsView ? <Flashcards /> : <WordsTable />}
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

