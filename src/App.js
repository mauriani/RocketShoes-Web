import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './pages/components/Header';
import GlobalStyle from './pages/styles/global';
import Routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes />
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
