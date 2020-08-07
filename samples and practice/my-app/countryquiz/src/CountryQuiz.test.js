import React from 'react';
import ReactDOM from 'react-dom';
import CountryQuiz from './CountryQuiz';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CountryQuiz />, div);
  ReactDOM.unmountComponentAtNode(div);
});
