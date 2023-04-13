import ApptCardCancelled from '@components/cards/appt-card/cancelled';
import { render } from '@testing-library/react';
import { EmployeeMockGenerator } from '@domain/types/__mock__/employee-generator';
import { BranchMockGenerator } from '@domain/types/__mock__/branch-generator';

const branchGenerator = new BranchMockGenerator();
const employeeGenerator = new EmployeeMockGenerator();

const employee = employeeGenerator.generateOne();
const branch = branchGenerator.generateOne();
const date = new Date().toISOString();

describe('ApptCardCancelled', () => {
  it('should be defined',() => {
    expect(ApptCardCancelled).toBeDefined();
  });
  it('should render correctly', () => {
    const wrapper = render(<ApptCardCancelled date={date} branch={branch} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should fire onClick', () => {
    const onClick = jest.fn();
    const wrapper = render(<ApptCardCancelled date={date} branch={branch} onClick={onClick} />);
    const apptCard = wrapper.getByTestId('appt-card');
    apptCard.click();
    expect(onClick).toBeCalled();
  });
  it('should render with WeWash parameter',()=>{
    const wrapper = render(<ApptCardCancelled date={date} branch={branch} service={'WeWash'} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render with Grooming parameter',()=>{
    const wrapper = render(<ApptCardCancelled date={date} branch={branch} service={'Grooming'} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render with employee',()=>{
    const wrapper = render(<ApptCardCancelled date={date} branch={branch} employee={employee} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render with employee + Grooming.',() => {
    const wrapper = render(<ApptCardCancelled date={date} branch={branch} employee={employee} service={'Grooming'} />);
    expect(wrapper).toMatchSnapshot();
  });

});
