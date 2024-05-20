// Match.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// TODO: unclick
// This shits absurdly long
// Some of them are reclicked or unclicked. 
// Cards reshuffle on soft refresh, 

export default function Match() {
    const words = useSelector(state => state.vocab.activeCards);
    const [cards, setCards] = useState([]);
    const [selectedIndices, setSelectedIndices] = useState([]);
    const [matchedIndices, setMatchedIndices] = useState([]);
    const [timeTaken, setTimeTaken] = useState(0); // Track time taken
    const [highScore, setHighScore] = useState(Infinity); // Use Infinity as the initial high score
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [timerId, setTimerId] = useState(null);
    const dispatch = useDispatch();

    const startGame = () => {
        setGameStarted(true);
        setGameOver(false);
        setTimeTaken(0);
        setMatchedIndices([]);
        setSelectedIndices([]);
        clearInterval(timerId); // Clear any existing timer
        const id = setInterval(() => {
            setTimeTaken(prev => {
                console.log('Timer Tick:', prev + 1); // Log the time update
                return prev + 1;
            });
        }, 1000);
        setTimerId(id);
        console.log('Timer Started:', id); // Log when the timer starts
    };
    
    const resetGame = () => {
        setCards(shuffleArray([...cards]));
        setSelectedIndices([]);
        setMatchedIndices([]);
        setTimeTaken(0);
        clearInterval(timerId);
        setGameOver(false);
        setGameStarted(false);
    };
    
    // Add useEffect for cleanup on component unmount
    useEffect(() => {
        return () => {
            clearInterval(timerId); // Clear timer on component unmount
        };
    }, [timerId]); // Run cleanup when timerId changes

    const softResetGame = () => {
        setCards(shuffleArray([...cards]));
        setSelectedIndices([]);
        setMatchedIndices([]);
        setTimeTaken(0); // Reset the time taken
        // Note: Do not clear timerId, setGameOver, or setGameStarted
    };
    // Utility function to shuffle an array
    const shuffleArray = (array) => {
        let currentIndex = array.length, randomIndex;
        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    };

    useEffect(() => {
        if (words.length > 0) {
            const cardsData = words.flatMap(word => [
                { content: word.pinyin, match: word.simplified },
                { content: word.simplified, match: word.pinyin }
            ]);
            setCards(shuffleArray([...cardsData]));
        }
    }, [words]);


    const handleClick = (index) => {
        if (selectedIndices.length === 2) {
            setSelectedIndices([index]);
        } else {
            setSelectedIndices(prev => [...prev, index]);
        }
    };

    useEffect(() => {
        if (selectedIndices.length === 2) {
            const [firstIndex, secondIndex] = selectedIndices;
            if (
                cards[firstIndex].content === cards[secondIndex].match ||
                cards[secondIndex].content === cards[firstIndex].match
            ) {
                setMatchedIndices(prev => [...prev, firstIndex, secondIndex]);
            }
            setSelectedIndices([]); // Reset selectedIndices immediately without a timeout
        }
    }, [selectedIndices]);

    useEffect(() => {
        // Check if all words have been matched
        if (matchedIndices.length === cards.length && cards.length > 0) {
            setGameOver(true);
            clearInterval(timerId);
            if (timeTaken < highScore) {
                setHighScore(timeTaken);
            }
        }
    }, [matchedIndices, cards.length]);

    return (
        <div>
            <div className="flex justify-between">
                <div>
                    <h1 className="text-3xl mb-4">Match</h1>
                    {!gameStarted && (
                        <button onClick={startGame} className="p-2 bg-blue-300 hover:bg-blue-400 rounded focus:outline-none md:h-10 md:self-center text-sm cursor-pointer">
                            Start Game
                        </button>
                    )}
                    {gameOver && (
                        <button onClick={resetGame} className="p-2 bg-green-300 hover:bg-green-400 rounded focus:outline-none md:h-10 md:self-center text-sm cursor-pointer">
                            Reset Game
                        </button>
                    )}
                    {gameStarted && !gameOver && (
                        <button onClick={softResetGame} className="p-2 bg-yellow-300 hover:bg-yellow-400 rounded focus:outline-none md:h-10 md:self-center text-sm cursor-pointer">
                            Reset
                        </button>
                    )}
                </div>
                <div>
                    <h2>Time Taken: {timeTaken} seconds</h2>
                    <h2>Best Time: {highScore === Infinity ? 'N/A' : `${highScore} seconds`}</h2>
                </div>
            </div>
            {gameStarted && !gameOver && (
                <div className="grid grid-cols-6 gap-4">
                    {cards.map((card, index) => (
                        <div 
                            key={index} 
                            onClick={() => handleClick(index)} 
                            className={`p-4 rounded focus:outline-none md:h-10 md:self-center text-sm cursor-pointer
                                ${matchedIndices.includes(index) ? 'bg-gray-400' : // Grey for matched cards
                                selectedIndices.includes(index) ? 'bg-blue-400' : // Different color for selected cards
                                'bg-blue-300 hover:bg-blue-400' // Default color for unselected cards
                            }`}>
                            {card.content}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );   
}