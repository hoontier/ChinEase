// VocabSelector.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWords, selectVocabListNames, setVocabListPart, setSelectedVocabLists } from '../features/vocabSlice';
import Select from 'react-select';

function VocabSelector() {
    const dispatch = useDispatch();
    const vocabListPart = useSelector(state => state.vocab.vocabListPart);
    const selectedVocabLists = useSelector(state => state.vocab.selectedVocabLists);
    const vocabListNames = useSelector(selectVocabListNames);

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
        dispatch(setVocabListPart(e.target.value));
        dispatch(setWords(selectedVocabLists));
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
                </>
            ) : null }
        </div>
    );
}

export default VocabSelector;
