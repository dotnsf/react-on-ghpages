import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Page0 from './pages/Page0';
import PageA from './pages/PageA';
import PageB from './pages/PageB';

const Router = () => {
  useEffect(() => {
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <Routes>
        <Route path={`/`} element={<Page0 />} />
        <Route path={`/a`} element={<PageA />} />
        <Route path={`/b`} element={<PageB />} />
      </Routes>
    </React.Fragment>
  );
};

const App = () => (
  <BrowserRouter>
    <Router />
  </BrowserRouter>
);

export default App;
