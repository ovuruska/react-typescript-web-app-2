import "./App.css";
import HomePage from "./pages/homepage/homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookPage from "./pages/bookpage/bookpage";
import AutoLogin from "@components/auth/auto-login";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AutoLogin><HomePage /></AutoLogin>} />
          <Route path="/book" element={<AutoLogin><BookPage /></AutoLogin>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
