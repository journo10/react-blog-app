import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ContextProvider } from './context/Context';
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
    <ContextProvider>
      <App />
    </ContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

