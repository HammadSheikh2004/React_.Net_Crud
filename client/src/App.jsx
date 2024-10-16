import React from 'react';
import Header from './Components/ReuseableComponents/Header';
import Create from './Components/Pages/Create';
import Show from './Components/Pages/Show'; // Import the Show component
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Edit from './Components/Pages/Edit';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Create />} />
            <Route path="/showData" element={<Show />} />
            <Route path="/editData/:id" element={<Edit />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
