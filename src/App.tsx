import "./App.css";
import HomePage from "./pages/homepage/homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookPage from "./pages/bookpage/bookpage";
import {useInjection} from "inversify-react";
import {ApiUrl, ApiUrlSymbol} from "@domain/types/symbols/api-url";

function App() {
  const apiUrl = useInjection<ApiUrl>(ApiUrlSymbol);
  console.log(apiUrl);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book" element={<BookPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
