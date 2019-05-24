import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

describe('#getCountryList() using Promises', () => {
  it('should load country data', () => {
    return getCountryList()
    .then(data => {
      expect(data).toBeDefined()
      expect(data.title).toEqual('Germary')
    })
  })
})


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

