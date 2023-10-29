import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectWords } from '../features/vocabSlice';

function Flashcards() {
    const words = useSelector(selectWords);
    const [currentCard, setCurrentCard] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isRandom, setIsRandom] = useState(false); // State to determine if cards are shown randomly

    const handleNextCard = () => {
        if (isRandom) {
            setCurrentCard(Math.floor(Math.random() * words.length)); // If random, pick a random card
        } else {
            setCurrentCard(prev => (prev + 1) % words.length); // If not, go to the next card
        }
        setIsFlipped(false);
    };

    const handlePrevCard = () => {
        if (isRandom) {
            setCurrentCard(Math.floor(Math.random() * words.length)); // If random, pick a random card
        } else {
            setCurrentCard(prev => (prev - 1 + words.length) % words.length); // If not, go to the previous card
        }
        setIsFlipped(false);
    };

    const handleCardFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const toggleRandom = () => {
        setIsRandom(!isRandom);
    };

    return (
        <div className="flex flex-col items-center justify-start h-screen bg-gray-100">
            {words.length > 0 && (
                <div className="relative">
                    <div
                        onClick={handleCardFlip}
                        className={`p-8 w-64 h-48 bg-white shadow-lg transform transition-transform duration-500 ${isFlipped ? 'rotate-y-180' : ''} relative`}
                    >
                        <div 
                            className={`absolute inset-0 flex items-center justify-center backface-hidden ${!isFlipped ? 'visible opacity-100' : 'invisible opacity-0'}`}
                        >
                            {words[currentCard].noTones}
                        </div>
                        <div 
                            className={`absolute inset-0 flex items-center justify-center backface-hidden rotate-y-180 ${isFlipped ? 'visible opacity-100' : 'invisible opacity-0'}`}
                        >
                            {`${words[currentCard].hanzi} - ${words[currentCard].pinyin} - ${words[currentCard].english}`}
                        </div>
                    </div>

                    <button
                        onClick={handlePrevCard}
                        className="absolute left-0 mt-20 p-2 bg-gray-300 hover:bg-gray-400 rounded-full focus:outline-none"
                    >
                        {'<'}
                    </button>
                    <button
                        onClick={toggleRandom}
                        className="absolute left-1/2 transform -translate-x-1/2 mt-20 p-2 bg-blue-300 hover:bg-blue-400 rounded-full focus:outline-none"
                    >
                        {isRandom ? 'Ordered' : 'Random'}
                    </button>
                    <button
                        onClick={handleNextCard}
                        className="absolute right-0 mt-20 p-2 bg-gray-300 hover:bg-gray-400 rounded-full focus:outline-none"
                    >
                        {'>'}
                    </button>
                </div>
            )}
        </div>
    );
}

export default Flashcards;
