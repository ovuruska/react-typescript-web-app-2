import "./bookpage.scss";
import BackBtn from "@components/buttons/back-btn";
import AvailableSlots from "@features/available-slots/available-slots";
import SurgeCalendar from "@features/surge-calendar/surge-calendar";


const GroomingAppBar = () => {
  const textColor = "#27946D";

  return <div className="book-header">
    <div className={"book-header__back-btn"}>
      <BackBtn/>

    </div>

    <div className="container">
      <h2 className="subtitle">Grooming</h2>
      <h1 className="title">Book for</h1>
    </div>
  </div>;
};

const BookPage: React.FC = () => {
  return <div className="book-page page">
    <GroomingAppBar/>
    <SurgeCalendar/>
    <AvailableSlots date={new Date()} service={"Full Grooming"}/>
  </div>;
};

export default BookPage;
