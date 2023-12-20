//Flashcards.jsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectWords, selectCurrentCard, selectIsFlipped, selectIsRandom, setCurrentCard, setFlipped, toggleRandom, removeActiveCard, resetVocabWords, randomizeActiveCards, setIsMenuHidden } from '../features/vocabSlice';
import Select from 'react-select';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { Howl } from 'howler';

function Flashcards() {
    const dispatch = useDispatch();

    const words = useSelector(selectWords);
    const activeCards = useSelector(state => state.vocab.activeCards);
    const currentCard = useSelector(selectCurrentCard);
    const isFlipped = useSelector(selectIsFlipped);
    const isRandom = useSelector(selectIsRandom);
    const isMenuHidden = useSelector(state => state.vocab.isMenuHidden);
    

    const playTextToSpeech = async (text) => {
        try {
            const response = await fetch('/synthesize-speech', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });
            const data = await response.json();

            const audioSrc = `data:audio/wav;base64,${data.audioContent}`;
            const sound = new Howl({ src: [audioSrc], format: ['wav'] });
            sound.play();
        } catch (error) {
            console.error('Error in text to speech conversion', error);
        }
    };
    

    const handleNextCard = () => {
        const nextCard = (currentCard + 1) % activeCards.length; // Reference activeCards.length here
        dispatch(setCurrentCard(nextCard));
        dispatch(setFlipped(false));  // Always set to front side
    };

        // Add these states for the front and back properties
        const [frontSide, setFrontSide] = useState(['noTones']);
        const [backSide, setBackSide] = useState(['simplified', 'pinyin', 'english']);
    
        // This is the options that the user can select for the flashcards
        const cardOptions = [
            { value: 'simplified', label: 'Simplified' },
            { value: 'pinyin', label: 'Pinyin' },
            { value: 'noTones', label: 'No Tones' },
            { value: 'english', label: 'English' },
            { value: 'traditional', label: 'Traditional'}
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
        const nextCard = (currentCard) % activeCards.length; // Reference activeCards.length here
        dispatch(setCurrentCard(nextCard));
        dispatch(setFlipped(false)); 
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
        const prevCard = (currentCard - 1 + activeCards.length) % activeCards.length;
        dispatch(setCurrentCard(prevCard));
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

    useEffect(() => {
        if (!isFlipped && frontSide.includes('simplified')) {
            const textToRead = activeCards[currentCard]['simplified'];
            playTextToSpeech(textToRead);
        }
    }, [isFlipped, currentCard, frontSide, activeCards]);
    


    return (
        <div className="flex flex-col items-center justify-start bg-gray-100">
            {/* If the menu is hidden, hide this */}
            <div className="flex flex-col md:flex-row justify-center mb-4">
            {!isMenuHidden && (
                <>
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
                </>
            )}
            {/* Make the button text's font size extra small */}

            </div>
            {activeCards.length > 0 && (
                <div className="relative">
                    <button
                        onClick={resetFlashcards}
                        className="p-2 bg-red-300 hover:bg-red-400 rounded focus:outline-none"
                    >
                        Reset Flashcards
                    </button>
                    <div className="flex flex-col items-center">
                        <div className="mt-4 flex items-center">
                            <Typography color="text.primary">
                                Cards are:&nbsp;
                            </Typography>
                            <Typography color={isRandom ? "text.secondary" : "text.primary"} className="ml-2">
                                Ordered
                            </Typography>
                            <Switch
                                checked={isRandom}
                                onChange={handleRandomize}
                                color="primary"
                                className="mx-2"
                            />
                            <Typography color={isRandom ? "text.primary" : "text.secondary"}>
                                Random
                            </Typography>
                        </div>
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
                        <div className="flex justify-center w-64 mt-5">
                            <button
                                onClick={handlePrevCard}
                                className="absolute left-0 p-2 bg-gray-300 hover:bg-gray-400 rounded-full focus:outline-none"
                            >
                                {'<'}
                            </button>
                            <button
                                onClick={gotThisWord}
                                className="absolute left-1/2 transform -translate-x-1/2 p-2  bg-green-300 hover:bg-green-400 rounded-full focus:outline-none"
                            >
                                Got it!
                            </button>
                            <button
                                onClick={handleNextCard}
                                className="absolute right-0 p-2 bg-gray-300 hover:bg-gray-400 rounded-full focus:outline-none"
                            >
                                {'>'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* If there are no active cards, display a message and a button to reset the flashcards */}
            {activeCards.length === 0 && (
                <div className="flex flex-col items-center justify-top h-full">
                    <p className="text-2xl mb-4">You've completed this set!</p>
                    <button
                        onClick={resetFlashcards}
                        className="p-2 bg-red-300 hover:bg-red-400 rounded focus:outline-none"
                    >
                        Reset Flashcards
                    </button>
                </div>
            )}
        </div>
    );
}

export default Flashcards;
