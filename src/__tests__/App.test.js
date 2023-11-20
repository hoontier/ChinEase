// // App.test.js
// import React from 'react';
// import { shallow } from 'enzyme';
// import Content from '../App.jsx';


// describe('Content', () => {

//     // Renders a VocabSelector component
//     it('should render a VocabSelector component', () => {
//       const wrapper = shallow(<Content />);
//       expect(wrapper.find(VocabSelector)).toHaveLength(1);
//     });

//     // Renders a WordsTable component by default
//     it('should render a WordsTable component by default', () => {
//       const wrapper = shallow(<Content />);
//       expect(wrapper.find(WordsTable)).toHaveLength(1);
//     });

//     // Renders a Flashcards component when 'Show Flashcards' button is clicked
//     it('should render a Flashcards component when "Show Flashcards" button is clicked', () => {
//       const wrapper = shallow(<Content />);
//       wrapper.find('button').simulate('click');
//       expect(wrapper.find(Flashcards)).toHaveLength(1);
//     });

//     // Renders an empty WordsTable component when no vocab lists are selected
//     it('should render an empty WordsTable component when no vocab lists are selected', () => {
//       const wrapper = shallow(<Content />);
//       expect(wrapper.find(WordsTable).prop('columns')).toEqual([]);
//       expect(wrapper.find(WordsTable).find('tbody').children()).toHaveLength(0);
//     });

//     // Renders an empty Flashcards component when no vocab lists are selected
//     it('should render an empty Flashcards component when no vocab lists are selected', () => {
//       const wrapper = shallow(<Content />);
//       expect(wrapper.find(Flashcards).find('div')).toHaveLength(0);
//     });

//     // Renders an empty Flashcards component when no active cards are available
//     it('should render an empty Flashcards component when no active cards are available', () => {
//       const wrapper = shallow(<Content />);
//       wrapper.find('button').simulate('click');
//       expect(wrapper.find(Flashcards).find('div')).toHaveLength(0);
//     });
// });
