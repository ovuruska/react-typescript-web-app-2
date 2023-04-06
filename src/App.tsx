import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("./pages/homepage/homepage"));
const BookPage = lazy(() => import("./pages/bookpage/bookpage"));

import { useInjection } from "inversify-react";
import { useEffect } from "react";
import { HttpClient, HttpClientSymbol } from "@quicker/common/http-client";
import { lazy, Suspense } from "react";

function App() {
  const client = useInjection<HttpClient>(HttpClientSymbol);

  useEffect(() => {
    client.login("b", "b");
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<div>{/* TODO FALLBACK SPİNNER */}</div>}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="/book"
            element={
              <Suspense fallback={<div>{/* TODO FALLBACK SPİNNER */}</div>}>
                <BookPage />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
