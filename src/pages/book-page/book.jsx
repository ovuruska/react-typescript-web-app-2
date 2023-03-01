import { useState } from "react";
import BookService from "../../components/book-service-card/bookServiceCard";
import PetCard from "../../components/pet-card/petCard";
import "./book.css";

export default function Book() {
  const [progress, setprogress] = useState(0);

  return (
    <div className="wrapper">
      <div className="progress-bar-wrapper">
        <div className="progress progress-1">
          <span className="dot">1</span>
          <h3 className={progress === 0 ? "bold" : ""}>Select Dog</h3>
          <div className="h-line"></div>
        </div>
        <div className="progress progress-2">
          <span className="dot">2</span>
          <h3 className={progress === 1 ? "bold" : ""}>Select Service</h3>
          <div className="h-line"></div>
        </div>
        <div className="progress progress-3">
          <span className="dot">3</span>
          <h3 className={progress === 2 ? "bold" : ""}>Book</h3>
        </div>
      </div>
      {progress === 0 && <PetCard />}
      {progress === 1 && <BookService />}

      <a
        className="book-btn"
        style={{
          marginTop: "auto",
        }}
        onClick={(e) => {
          e.preventDefault();
          setprogress((old) => old + 1);
        }}
      >
        Proceed
      </a>
    </div>
  );
}
