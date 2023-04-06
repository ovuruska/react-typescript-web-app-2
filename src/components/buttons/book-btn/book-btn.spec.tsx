import BookButton from "@components/buttons/book-btn/book-btn";
import {fireEvent, render} from "@testing-library/react";

/*
import styles from './book-btn.module.scss';

interface BookBtnProps {
  text?: string;
  onClick?: () => void;
}

const BookBtn = ({text, onClick}: BookBtnProps) => (
  <div data-testid={"book-btn"} className={styles.bookBtn} onClick={onClick}>
    {text}
  </div>
);
export default BookBtn;

 */
describe("BookButton", () => {
  it("should be defined", () => {
    expect(BookButton).toBeDefined();
  });

  it("should render correctly", () => {
    const wrapper = render(<BookButton />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with text', () => {
    const wrapper = render(<BookButton text={"Book Now"}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with onClick', () => {
    const wrapper = render(<BookButton onClick={() => console.log("clicked")}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with text and onClick', () => {
    const wrapper = render(<BookButton text={"Book Now"} onClick={() => console.log("clicked")}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('onClick should not be called when book button is clicked.', () => {
    const onClick = jest.fn();
    const {getByTestId} = render(<BookButton onClick={onClick}/>);
    const bookButton = getByTestId("book-btn");
    bookButton.click();
    expect(onClick).toHaveBeenCalled();
  });


});
