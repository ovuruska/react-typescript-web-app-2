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

const ApptCardCompleted: React.FC<ApptCardProps> = ({
                                             date, employee, service, branch, onClick

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

  return <div data-testid={"appt-card"}onClick={onClick} className={style.apptCard__completed}>
    <div className={style.apptCard__left__completed}>
      <h3 className={style.apptCard__leftHeader__completed}>
        {dateStr}
      </h3>
      <h4 className={style.apptCard__leftSubheader__completed}>
        {hourStr}
      </h4>
    </div>
    <div className={style.apptCard__right}>
        <div className={style.apptCard__right__left}>
          <div className={style.apptCard__leftRow}>
           <h3  className={style.apptCard__leftHeader__completed}>{employeeName ?? "WeWash"}</h3>
            <div className={style.apptCard__leftCard__completed}>
              <p>Completed</p>
            </div>
          </div>
          <h4 className={style.apptCard__leftSubheader}>
            {branch.name}
          </h4>
        </div>

      {service == 'WeWash' ? <WeWashIcon /> : <GroomingIcon />}
    </div>

  </div>;
};


export default ApptCardCompleted;
