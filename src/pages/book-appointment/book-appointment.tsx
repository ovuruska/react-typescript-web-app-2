import React, { ReactNode, useEffect, useRef, useState } from "react";
import "../../App.css";
import BookBtn from "@components/buttons/book-btn/book-btn";
import BookCard from "@components/buttons/book-card/book-card";


const BookAppointmentPage: React.FC = () => {
  useEffect(() => {}, []);



  return (
    <div className="home-page page">
      <BookCard text={"Name Surname"}/>
    </div>
  );
};

export default BookAppointmentPage;
