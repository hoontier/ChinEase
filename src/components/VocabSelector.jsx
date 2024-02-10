// VocabSelector.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWords, selectWords, selectVocabList, setVocabListPart, setSelectedVocabLists, setView, /*setIsMatchView,*/ filterTraditionalDifferences, setIsShowingTraditionalDifferences} from '../features/vocabSlice';
import Select from 'react-select';

function VocabSelector() {
    const dispatch = useDispatch();
    const vocabListPart = useSelector(state => state.vocab.vocabListPart);
    const selectedVocabLists = useSelector(state => state.vocab.selectedVocabLists);
    const vocabListNames = useSelector(selectVocabList);
    const view = useSelector(state => state.vocab.view);
    const isMenuHidden = useSelector(state => state.vocab.isMenuHidden);
    const isShowingTraditionalDifferences = useSelector(state => state.vocab.isShowingTraditionalDifferences);

    const customStyles = {
        control: (base, state) => ({
            ...base,
            boxShadow: state.isFocused ? "0 0 0 0.2rem rgba(0,123,255,.25)" : 0,
            borderColor: state.isFocused ? "rgba(0,123,255,.25)" : base.borderColor,
            "&:hover": {
                borderColor: state.isFocused ? "rgba(0,123,255,.25)" : base.borderColor
            }
        })
    };

    

    const handleSelectChange = (selectedOptions) => {
        if (selectedOptions && selectedOptions.length > 0) {
            const vocabNames = selectedOptions.map(option => option.value);
            dispatch(setSelectedVocabLists(vocabNames)); // Update the selected vocab lists first
            dispatch(setVocabListPart('')); // Reset the vocabListPart
            dispatch(setWords(vocabNames)); // Then fetch the words
        } else {
            dispatch(setSelectedVocabLists([]));
            dispatch(setVocabListPart('')); // Reset the vocabListPart
            dispatch(setWords([]));
        }
    };
    

    const options = vocabListNames.map(name => ({ value: name, label: name }));

    const handlePartChange = (e) => {
        const part = e.target.value;
        dispatch(setVocabListPart(part)); // Set the selected part or group
        dispatch(setWords(selectedVocabLists)); // This will handle all cases based on the updated part
      };
      
    
      // Calculate the number of word groups
      const totalWords = useSelector(selectWords).length;
      const numGroups = Math.ceil(totalWords / 7);
    
      // Create options for selecting word groups
      const groupOptions = Array.from({ length: numGroups }, (_, i) => ({
        value: `group${i + 1}`,
        label: `Group ${i + 1}`
      }));


    const handleTraditionalDifferencesToggle = () => {
        dispatch(setIsShowingTraditionalDifferences()); // Toggle the isShowingTraditionalDifferences state
        dispatch(filterTraditionalDifferences()); // Add this line to filter the cards
    };
    

    return (
        <div className="mb-4">
            <label htmlFor="vocabDropdown" className="block text-gray-700 text-sm font-bold mb-2">Select Vocabulary:</label>
            <Select 
                isMulti
                styles={customStyles}
                options={options}
                onChange={handleSelectChange}
            />
            { selectedVocabLists.length === 1 ? (
                <>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Select Part:</label>
                    <select onChange={handlePartChange} value={vocabListPart}>
                        <option value="">All</option>
                        <option value="firstHalf">First Half</option>
                        <option value="secondHalf">Second Half</option>
                    </select>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Select Group:</label>
                    <select onChange={handlePartChange} value={vocabListPart}>
                        {/* Add an 'all' option here */}
                        <option value="">All</option>
                        {groupOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </>
            ) : null }
            {/* Button to toggle between showing the table and showing the flashcards */}
            {/* <button 
                className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none mr-4 ${selectedVocabLists.length !== 1 ? 'mt-5' : ''} ${selectedVocabLists.length == 1 ? 'ml-3' : ''}`}
                onClick={() => dispatch(setIsFlashcardsView())}
            >
                {isFlashcardsView ? 'Show Table' : 'Show Flashcards'}
                        </button> */}
            {/* Button to only show cards where the traditional characters are not the same as the simplified characters */}
            {/* <button
                className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none mr-4`}
                onClick={handleTraditionalDifferencesToggle}
            >
                {isShowingTraditionalDifferences ? 'Reset' : 'Only Traditional Differences'}
            </button> */}
            {/* Create a dropdown to switch between list, flashcard, and match mode */}
            <label className="block text-gray-700 text-sm font-bold mb-2">Select Mode:</label>
            <select onChange={(e) => {
                const mode = e.target.value;
                if (mode === 'flashcards') {
                    dispatch(setView('flashcards'));
                } else if (mode === 'match') {
                    dispatch(setView('match'));
                } else {
                    dispatch(setView("list"));
                }
            }
            }>
                <option value="list">List</option>
                <option value="flashcards">Flashcards</option>
                <option value="match">Match</option>
            </select>
        </div>
    );
}

export default VocabSelector;

// // VocabSelector.jsx
// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setWords, selectVocabList, setVocabListPart, setSelectedVocabLists, setIsFlashcardsView, setIsMenuHidden } from '../features/vocabSlice';
// import Select from 'react-select';

// function VocabSelector() {
//     const dispatch = useDispatch();
//     const vocabListPart = useSelector(state => state.vocab.vocabListPart);
//     const selectedVocabLists = useSelector(state => state.vocab.selectedVocabLists);
//     const vocabListNames = useSelector(selectVocabList);
//     const isFlashcardsView = useSelector(state => state.vocab.isFlashcardsView);
//     const isMenuHidden = useSelector(state => state.vocab.isMenuHidden);

    
//     const customStyles = {
//         control: (base, state) => ({
//             ...base,
//             boxShadow: state.isFocused ? "0 0 0 0.2rem rgba(0,123,255,.25)" : 0,
//             borderColor: state.isFocused ? "rgba(0,123,255,.25)" : base.borderColor,
//             "&:hover": {
//                 borderColor: state.isFocused ? "rgba(0,123,255,.25)" : base.borderColor
//             }
//         })
//     };

    

//     const handleSelectChange = (selectedOptions) => {
//         if (selectedOptions && selectedOptions.length > 0) {
//             const vocabNames = selectedOptions.map(option => option.value);
//             dispatch(setSelectedVocabLists(vocabNames)); // Update the selected vocab lists first
//             dispatch(setVocabListPart('')); // Reset the vocabListPart
//             dispatch(setWords(vocabNames)); // Then fetch the words
//         } else {
//             dispatch(setSelectedVocabLists([]));
//             dispatch(setVocabListPart('')); // Reset the vocabListPart
//             dispatch(setWords([]));
//         }
//     };
    

//     const options = vocabListNames.map(item => ({
//         value: item.id,
//         label: item.name 
//     }));

//     const handlePartChange = (e) => {
//         dispatch(setVocabListPart(e.target.value));
//         dispatch(setWords(selectedVocabLists));
//     };

//     return (
//         <div className="mb-4">
//             <label htmlFor="vocabDropdown" className="block text-gray-700 text-sm font-bold mb-2">Select Vocabulary:</label>
//             <Select 
//                 isMulti
//                 styles={customStyles}
//                 options={options}
//                 onChange={handleSelectChange}
//             />
//             { selectedVocabLists.length === 1 ? (
//                 <>
//                     <label className="block text-gray-700 text-sm font-bold mb-2">Select Part:</label>
//                     <select onChange={handlePartChange} value={vocabListPart}>
//                         <option value="">All</option>
//                         <option value="firstHalf">First Half</option>
//                         <option value="secondHalf">Second Half</option>
//                     </select>
//                 </>
//             ) : null }
//             <button 
//                 className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none mr-4 ${selectedVocabLists.length !== 1 ? 'mt-5' : ''} ${selectedVocabLists.length == 1 ? 'ml-3' : ''}`}
//                 onClick={() => dispatch(setIsFlashcardsView())}
//             >
//                 {isFlashcardsView ? 'Show Table' : 'Show Flashcards'}
//             </button>
//         </div>
//     );
// }

// export default VocabSelector;
