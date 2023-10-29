//Flashcards.jsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectWords, selectCurrentCard, selectIsFlipped, selectIsRandom, setCurrentCard, setFlipped, toggleRandom, removeActiveCard, setWords, resetVocabWords, randomizeActiveCards } from '../features/vocabSlice';
import Select from 'react-select';
function Flashcards() {
    const dispatch = useDispatch();

    const words = useSelector(selectWords);
    const activeCards = useSelector(state => state.vocab.activeCards);
    const currentCard = useSelector(selectCurrentCard);
    const isFlipped = useSelector(selectIsFlipped);
    const isRandom = useSelector(selectIsRandom);

    const handleNextCard = () => {
        if (isRandom) {
            dispatch(setCurrentCard(Math.floor(Math.random() * activeCards.length))); 
        } else {
            const nextCard = (currentCard + 1) % activeCards.length; // Reference activeCards.length here
            dispatch(setCurrentCard(nextCard));
        }
        dispatch(setFlipped(false));  // Always set to front side
    };

        // Add these states for the front and back properties
        const [frontSide, setFrontSide] = useState(['noTones']);
        const [backSide, setBackSide] = useState(['hanzi', 'pinyin', 'english']);
    
        // This is the options that the user can select for the flashcards
        const cardOptions = [
            { value: 'hanzi', label: 'Hanzi' },
            { value: 'pinyin', label: 'Pinyin' },
            { value: 'noTones', label: 'No Tones' },
            { value: 'english', label: 'English' },
        ];
    
        const handleFrontChange = (selectedOptions) => {
            setFrontSide(selectedOptions.map(option => option.value));
        };
    
        const handleBackChange = (selectedOptions) => {
            setBackSide(selectedOptions.map(option => option.value));
        };
    

    const handleCardFlip = () => {
        dispatch(setFlipped(!isFlipped));
    };

    const resetFlashcards = () => {
        dispatch(setCurrentCard(0));
        dispatch(toggleRandom(false));
        dispatch(setFlipped(false));
        dispatch(resetVocabWords());
      };
    
      const gotThisWord = () => {
        dispatch(removeActiveCard()); // Use the new reducer to remove the current card
        handleNextCard();
      };
    
      const handleRandomize = () => {
        dispatch(toggleRandom(!isRandom));
        if (isRandom) {
            dispatch(resetVocabWords()); // If toggled off, reset the cards
        } else {
            dispatch(randomizeActiveCards()); // If toggled on, shuffle the cards
        }
    };
    
    const handlePrevCard = () => {
        if (isRandom) {
            dispatch(setCurrentCard(Math.floor(Math.random() * activeCards.length)));
        } else {
            const prevCard = (currentCard - 1 + activeCards.length) % activeCards.length;
            dispatch(setCurrentCard(prevCard));
        }
        dispatch(setFlipped(false));
    };
    
    
    useEffect(() => {
        // Focus the document.body when the component mounts
        document.body.focus();
    
        const handleKeyPress = (event) => {
            // Check if no active input is focused
            if (document.activeElement === document.body) {
                switch (event.keyCode) {
                    case 32:  // Space key
                        handleCardFlip();
                        event.preventDefault();  // To prevent any default behavior
                        break;
                    case 37:  // Left arrow key
                        handlePrevCard();
                        event.preventDefault();
                        break;
                    case 38:  // Up arrow key
                        handleCardFlip();
                        event.preventDefault();
                        break;
                    case 39:  // Right arrow key
                        handleNextCard();
                        event.preventDefault();
                        break;
                    case 40:  // Down arrow key
                        handleCardFlip();
                        event.preventDefault();
                        break;
                    default:
                        break;
                }
            }
        };
        
    
        // Add event listener
        document.addEventListener('keydown', handleKeyPress);
    
        // Remove event listener when component unmounts
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleCardFlip, handlePrevCard, handleNextCard]);
    


    return (
        <div className="flex flex-col items-center justify-start h-screen bg-gray-100">
            <div className="flex flex-col md:flex-row justify-center mb-4">
                <div className="mb-2 md:mb-0 md:mr-2">
                    <label>Front:</label>
                    <Select
                        isMulti
                        options={cardOptions}
                        value={frontSide.map(prop => ({ value: prop, label: cardOptions.find(opt => opt.value === prop).label }))}
                        onChange={handleFrontChange}
                    />
                </div>
                <div className="mt-2 md:mt-0 md:ml-2">
                    <label>Back:</label>
                    <Select
                        isMulti
                        options={cardOptions}
                        value={backSide.map(prop => ({ value: prop, label: cardOptions.find(opt => opt.value === prop).label }))}
                        onChange={handleBackChange}
                    />
                </div>
            </div>
            {activeCards.length > 0 && (
                <div className="relative">
                    <button
                        onClick={resetFlashcards}
                        className="mb-4 p-2 bg-red-300 hover:bg-red-400 rounded focus:outline-none"
                    >
                        Reset Flashcards
                    </button>

                    <div
                        onClick={handleCardFlip}
                        className={`p-8 w-64 h-48 bg-white shadow-lg transform transition-transform duration-500 ${isFlipped ? 'rotate-y-180' : ''} relative`}
                    >
                        <div 
                            className={`absolute inset-0 flex items-center justify-center backface-hidden ${!isFlipped ? 'visible opacity-100' : 'invisible opacity-0'}`}
                        >
                            {frontSide.map(prop => activeCards[currentCard][prop]).join(' - ')}
                        </div>
                        <div 
                            className={`absolute inset-0 flex items-center justify-center backface-hidden rotate-y-180 ${isFlipped ? 'visible opacity-100' : 'invisible opacity-0'}`}
                        >
                            {backSide.map(prop => activeCards[currentCard][prop]).join(' - ')}
                        </div>
                    </div>
                    <button
                        onClick={gotThisWord}
                        className="mt-4 p-2 bg-green-300 hover:bg-green-400 rounded focus:outline-none"
                    >
                        I've got this word
                    </button>
                    <button
                        onClick={handlePrevCard}
                        className="absolute left-0 mt-20 p-2 bg-gray-300 hover:bg-gray-400 rounded-full focus:outline-none"
                    >
                        {'<'}
                    </button>
                    <button
                        onClick={handleRandomize}
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
