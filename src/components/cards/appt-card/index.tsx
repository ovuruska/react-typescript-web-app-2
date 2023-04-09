import React from 'react';
import style from './index.module.scss';
import WeWashIcon from '@components/icons/wewash-icon';
import GroomingIcon from '@components/icons/grooming-icon';
import { EmployeeEntity } from '@domain/types/common/employee';
import { BranchEntity } from '@domain/types/common/branch';

export interface ApptCardProps {
  date: string;
  employee?: EmployeeEntity;
  service?: string;
  branch: BranchEntity;
  onClick?: () => void;
}

const getShortMonthName = (date: Date) => {
  const formatter = new Intl.DateTimeFormat('en', { month: 'short' });
  return formatter.format(date.getMonth());
};

const ApptCard: React.FC<ApptCardProps> = ({
                                             date, employee, service, branch, onClick,

                                           }: ApptCardProps) => {
  // Mar. 28 from date
  const dateObj = new Date(date);
  const month = getShortMonthName(dateObj);
  const day = dateObj.getDate();

  const dateStr = `${month}${month == 'May' ? '' : '.'} ${day < 10 ? '0' : ''}${day}`;
  const weekday = dateObj.toLocaleString('en-us', { weekday: 'short' });
  // 05.00 PM from date
  // Other than 'numeric'
  const time = dateObj.toLocaleString('en-us', { hour: 'numeric', minute: 'numeric' });

  let employeeName = null;
  if (employee) {
    employeeName = employee.name.split(" ")[0];
  }

  const hourStr = `${time} ${weekday}`;

  return <div data-testid={"appt-card"}onClick={onClick} className={style.apptCard}>
    <div className={style.apptCard__left}>
      <p className={style.apptCard__leftHeader}>
        {dateStr}
      </p>
      <p className={style.apptCard__leftSubheader}>
        {hourStr}
      </p>
    </div>
    <div className={style.apptCard__right}>
      <div className={style.apptCard__right__left}>
        <div className={style.apptCard__right__leftHeader}>
          {employeeName ?? "WeWash"}
        </div>
        <div className={style.apptCard__right__leftSubheader}>
          {branch.name}
        </div>
      </div>
      {service == 'WeWash' ? <WeWashIcon /> : <GroomingIcon />}
    </div>

  </div>;
};

export default ApptCard;
