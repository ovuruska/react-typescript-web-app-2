/*
import PageCard from '@components/cards/page-card/page-card';
import logoSrc from "../../assets/logo.png";
import style from "./index.module.scss";
import ProfileBtn from '@components/buttons/profile-btn';
import Dogo from "@assets/dogo.png";
import CtaPrimary from '@components/buttons/cta-primary/cta-primary';
import { ProductEntity } from '@domain/types/common/product';
import { BranchEntity } from '@domain/types/common/branch';
import React from 'react';

export interface ThanksPageDumbProps {
  products?: ProductEntity[];
  date?: string;
  service?: string;
  employee?: ProductEntity;
  branch?: BranchEntity;
  onClick?: () => void;
}

const ThanksPageDumb : React.FC<ThanksPageDumbProps> = ({
  products,
  date,
  service,
  employee,
  branch,
  onClick
}:ThanksPageDumbProps ) => {

  // 03.03.2023 Thu - 09:00
  const formattedDate = date ? new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  }) : undefined;

  return <PageCard>
    <div className={style.thanksPage}>
      <div className={style.thanksPageHeader}>
        <img alt="scrubbers logo" className={"logo"} src={logoSrc}></img>
        <ProfileBtn/>
      </div>
      <div className={style.thanksPageColumn}>
        <img src={Dogo}/>
        <h2>Thank you</h2>
        <h3>Reservation is confirmed!</h3>
        <CtaPrimary onClick={onClick} content={"Go to home"}/>

      </div>

    </div>
    <div className={style.appointmentDetails}>
      <div className={style.appointmentDetailsColumn}>
        <div className={style.appointmentDetailsColumn__Detail}>
          <p>Date - Time</p>
          <p>{formattedDate ?? " "}</p>
        </div>
        <div className={style.appointmentDetailsColumn__Detail}>
          <p>Service</p>
          <p>{service ?? ""}</p>
        </div>
        {employee &&
          <div className={style.appointmentDetailsColumn__Detail}>
            <p>Groomer</p>
            <p>John Doe</p>
          </div>
        }
        <div className={style.appointmentDetailsColumn__Detail}>
          <p>Location</p>
          <p>{branch?.name ?? ""}</p>
        </div>
      </div>
      <div className={style.appointmentDetailsDivider}/>
      <div className={style.appointmentDetailsThanks}>
        <p>Thanks for selecting Scrubbers for your
          pets grooming needs!</p>
        <p>
          Appointments need to be cancelled/changed at a minimum of 24 hours in advance from your appointment time to avoid being charged the full price of the service.
        </p>
      </div>


    <div className={style.appointmentDetailsDivider}/>
      <div className={style.appointmentDetailsExtra}>
      <p>Add-ons</p>
        {
          (products == undefined || products.length === 0) ? <p>No add-ons selected</p> : (products as ProductEntity[]).map((product) => {
            return<p>{product.name}  <span>{product.category}</span></p>

          })
        }
      </div>

  </div>


  </PageCard>
}

export default ThanksPageDumb;

 */

// Path: src/pages/thanks/index.spec.tsx

import ThanksPageDumb, { ThanksPageDumbProps } from '@pages/thanks/index.dumb';
import { BranchMockGenerator } from '@domain/types/__mock__/branch-generator';
import { EmployeeMockGenerator } from '@domain/types/__mock__/employee-generator';
import ProductMockGenerator from '@domain/types/__mock__/product-generator';
import { render } from '@testing-library/react';



describe('ThanksPageDumb', () => {
  const branchGenerator = new BranchMockGenerator();
  const employeeGenerator = new EmployeeMockGenerator();
  const productGenerator = new ProductMockGenerator();

  it('should be defined', () => {
    expect(ThanksPageDumb).toBeDefined();
  });

  it('should render correctly', () => {
    const props = {
      products: productGenerator.generateMany(2),
      date: new Date().toISOString(),
      service: "Service",
      employee: employeeGenerator.generateOne(),
      branch: branchGenerator.generateOne(),
      onClick: () => {}
    } as ThanksPageDumbProps;
    const wrapper = render(<ThanksPageDumb {...props}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('employee row should raise exception if employee is undefined.', () => {
    const props = {
      products: productGenerator.generateMany(2),
      date: new Date().toISOString(),
      service: "Service",
      branch: branchGenerator.generateOne(),
      onClick: () => {}
    } as ThanksPageDumbProps;
    const {getByTestId} = render(<ThanksPageDumb {...props}/>);

    try{
      getByTestId("thanks-page-employee-row");
      throw new Error("Employee row should not be visible if employee is undefined.");
    }catch(e){
      expect(e).toBeDefined();
    }

    const branchRow = getByTestId("thanks-page-branch-row");
    const serviceRow = getByTestId("thanks-page-service-row");
    const dateRow = getByTestId("thanks-page-date-row");
    expect(branchRow).toBeTruthy();
    expect(serviceRow).toBeTruthy();
    expect(dateRow).toBeTruthy();

  });
  it('employee row should be visible if employee is defined and should contain employee name.', () => {
    const props = {
      products: productGenerator.generateMany(2),
      date: new Date().toISOString(),
      service: "Service",
      employee: employeeGenerator.generateOne(),
      branch: branchGenerator.generateOne(),
      onClick: () => {}
    } as ThanksPageDumbProps;
    const {getByTestId} = render(<ThanksPageDumb {...props}/>);
    const employeeRow = getByTestId("thanks-page-employee-row");
    const branchRow = getByTestId("thanks-page-branch-row");
    const serviceRow = getByTestId("thanks-page-service-row");
    const dateRow = getByTestId("thanks-page-date-row");
    expect(branchRow).toBeTruthy();
    expect(serviceRow).toBeTruthy();
    expect(dateRow).toBeTruthy();
    expect(employeeRow).toBeTruthy();

    expect(employeeRow.textContent).toContain(props.employee?.name);

  });

  it('should render correctly if products is undefined.', () => {
    const props = {
      date: new Date().toISOString(),
      service: "Service",
      employee: employeeGenerator.generateOne(),
      branch: branchGenerator.generateOne(),
      onClick: () => {}
    } as ThanksPageDumbProps;
    const wrapper = render(<ThanksPageDumb {...props}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should include add-ons if products is defined. Product length should be equal to product-item.', () => {
    const props = {
      products: productGenerator.generateMany(2),
      date: new Date().toISOString(),
      service: "Service",
      employee: employeeGenerator.generateOne(),
      branch: branchGenerator.generateOne(),
      onClick: () => {}
    } as ThanksPageDumbProps;
    const {getAllByTestId} = render(<ThanksPageDumb {...props}/>);
    const productItems = getAllByTestId("thanks-page-product-item");
    expect(productItems.length).toEqual(props.products?.length);
  });

  it('should not include add-ons if products is empty.', () => {
    const props = {
      products: [],
      date: new Date().toISOString(),
      service: "Service",
      employee: employeeGenerator.generateOne(),
      branch: branchGenerator.generateOne(),
      onClick: () => {}
    } as ThanksPageDumbProps;
    const {queryAllByTestId} = render(<ThanksPageDumb {...props}/>);
    const productItems = queryAllByTestId("thanks-page-product-item");
    expect(productItems.length).toEqual(0);
  });

  it('should fire onClick if cta-primary is clicked.', () => {
    const props = {
      products: [],
      date: new Date().toISOString(),
      service: "Service",
      employee: employeeGenerator.generateOne(),
      branch: branchGenerator.generateOne(),
      onClick: jest.fn()
    } as ThanksPageDumbProps;
    const {getByTestId} = render(<ThanksPageDumb {...props}/>);
    const ctaPrimary = getByTestId("cta-primary");
    ctaPrimary.click();
    expect(props.onClick).toBeCalled();
  });

});
