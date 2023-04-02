import "./App.css";
import HomePage from "./pages/homepage/homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BookPage from "./pages/bookpage/bookpage";
import {useInjection} from "inversify-react";
import {useEffect} from "react";
import {HttpClient, HttpClientSymbol} from "@quicker/common/http-client";

function App() {
  const client = useInjection<HttpClient>(HttpClientSymbol);

  useEffect(()=>{
    client.login("b","b");
  },[])


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
