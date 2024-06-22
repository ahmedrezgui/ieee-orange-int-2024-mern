import './App.css';
import { BrowserRouter, Route, Routes, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
          </Routes>

        </div>


      </BrowserRouter>
    </div>
  );
}

export default App;
