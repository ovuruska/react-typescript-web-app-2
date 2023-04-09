/*import React from "react";
import "./index.module.scss";
import WeWashIcon from "@components/icons/wewash-icon";
import GroomingIcon from '@components/icons/grooming-icon';
import { EmployeeEntity } from '@domain/types/common/employee';
import { BranchEntity } from '@domain/types/common/branch';

interface ApptCardProps {
  date: string;
  employee?: EmployeeEntity;
  service?: string;
  branch: BranchEntity;
  onClick?: () => void;
}

const ApptCard: React.FC<ApptCardProps> = ({
  date,
  employee,
  service,
  branch,
  onClick,

} : ApptCardProps) => {
  return <div>

  </div>;
};

export default ApptCard;


 */
// Path: src/components/cards/appt-card-clickable/index.stories.tsx
import React from "react";
import { Story, Meta } from "@storybook/react";
import { faker } from "@faker-js/faker";

import { EmployeeMockGenerator } from "@domain/types/__mock__/employee-generator";
import {BranchMockGenerator} from '@domain/types/__mock__/branch-generator';
import ApptCard, { ApptCardProps }  from './index';


export default {
  component:ApptCard,
  title:"Components/Cards/ApptCard"
} as Meta;

const employeeGenerator = new EmployeeMockGenerator();
const branchGenerator = new BranchMockGenerator();

const employee = employeeGenerator.generateOne();
const branch = branchGenerator.generateOne();
const employeeLongName = employeeGenerator.generateOne();
employeeLongName.name = faker.datatype.string(3000);

const branchLongName = branchGenerator.generateOne();
branchLongName.name = faker.datatype.string(3000);

const Template: Story<ApptCardProps> = (args) => <ApptCard {...args} />;
export const Grooming = Template.bind({});
Grooming.args = {
  date: faker.date.future().toLocaleDateString(),
  branch,
  employee,
  service: "Grooming",
};

export const GroomingWithEmployee = Template.bind({});
GroomingWithEmployee.args = {
  ...Grooming.args,
};

export const GroomingWithEmployeeLongName = Template.bind({});

GroomingWithEmployeeLongName.args = {
  ...GroomingWithEmployee.args,
  employee: employeeLongName,
}

export const GroomingWithBranchLongName = Template.bind({});
GroomingWithBranchLongName.args = {
  ...GroomingWithEmployee.args,
  branch: branchLongName,
}


export const WeWash = Template.bind({});
WeWash.args = {
  ...Grooming.args,
  employee:undefined,
  service: "WeWash",
};

