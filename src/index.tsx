import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as ContractContext from './components/contexts/ContractDataContext';

ReactDOM.render(
  <React.StrictMode>
    <ContractContext.Provider>
      <App />
    </ContractContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
