// WordsTable.jsx
import React from 'react';
import { useSelector } from 'react-redux';

function WordsTable() {
    const words = useSelector(state => state.vocab.words);

    return (
        <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
                <tr>
                    <th className="px-4 py-2">Hanzi</th>
                    <th className="px-4 py-2">Pinyin</th>
                    <th className="px-4 py-2">No Tones</th>
                    <th className="px-4 py-2">English</th>
                </tr>
            </thead>
            <tbody className="text-gray-700">
                {words.map((word, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                        <td className="px-4 py-2">{word.hanzi}</td>
                        <td className="px-4 py-2">{word.pinyin}</td>
                        <td className="px-4 py-2">{word.noTones}</td>
                        <td className="px-4 py-2">{word.english}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default WordsTable;
