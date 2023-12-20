import React from 'react';
import { useSelector } from 'react-redux';

function WordsTable({ columns }) {
    const words = useSelector(state => state.vocab.words);

    return (
        <div>
            <div className="mb-4 text-lg">Number of Words Selected: {words.length}</div>
            <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                    <tr>
                        {columns.includes('Number') && <th className="px-4 py-2">Number</th>}
                        {columns.includes('Simplified') && <th className="px-4 py-2">Simplified</th>}
                        {columns.includes('Traditional') && <th className="px-4 py-2">Traditional</th>}
                        {columns.includes('Pinyin') && <th className="px-4 py-2">Pinyin</th>}
                        {columns.includes('No Tones') && <th className="px-4 py-2">No Tones</th>}
                        {columns.includes('English') && <th className="px-4 py-2">English</th>}
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {words.map((word, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                            {columns.includes('Number') && <td className="px-4 py-2">{index + 1}</td>}
                            {columns.includes('Simplified') && <td className="px-4 py-2">{word.simplified}</td>}
                            {columns.includes('Traditional') && <td className="px-4 py-2">{word.traditional}</td>}
                            {columns.includes('Pinyin') && <td className="px-4 py-2">{word.pinyin}</td>}
                            {columns.includes('No Tones') && <td className="px-4 py-2">{word.noTones}</td>}
                            {columns.includes('English') && <td className="px-4 py-2">{word.english}</td>}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


export default WordsTable;
