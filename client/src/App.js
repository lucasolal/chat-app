import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context";
// import "./App.css";

import { Main } from "./pages";
function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='*' element={<Main />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
