import React from 'react';
import { useSelector } from 'react-redux';

function WordsTable({ columns }) {
    const words = useSelector(state => state.vocab.words);

    return (
        <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
                <tr>
                    {columns.includes('Hanzi') && <th className="px-4 py-2">Hanzi</th>}
                    {columns.includes('Pinyin') && <th className="px-4 py-2">Pinyin</th>}
                    {columns.includes('No Tones') && <th className="px-4 py-2">No Tones</th>}
                    {columns.includes('English') && <th className="px-4 py-2">English</th>}
                </tr>
            </thead>
            <tbody className="text-gray-700">
                {words.map((word, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                        {columns.includes('Hanzi') && <td className="px-4 py-2">{word.hanzi}</td>}
                        {columns.includes('Pinyin') && <td className="px-4 py-2">{word.pinyin}</td>}
                        {columns.includes('No Tones') && <td className="px-4 py-2">{word.noTones}</td>}
                        {columns.includes('English') && <td className="px-4 py-2">{word.english}</td>}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default WordsTable;
