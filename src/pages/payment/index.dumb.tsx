import React from 'react'
import style from './index.module.scss'
import { EmployeeEntity } from '@domain/types/common/employee';
import { BranchEntity } from '@domain/types/common/branch';
import WarningBtn from '@components/buttons/warning-btn/warning-btn';
import SelectCreditCard from '@features/select-credit-card';



export interface PaymentPageDumbProps  {
  employee: EmployeeEntity;
  branch:BranchEntity;
  date: string;
  service: string;
}


const PaymentPageDumb : React.FC<PaymentPageDumbProps> = ({

                                    }:PaymentPageDumbProps) => {
  return <div className={style.paymentPage}>
    <WarningBtn content="Some policies we would like to make you aware of." />
    <h3 className={style.paymentPage__header3}>Credit Card</h3>
    <SelectCreditCard/>
  </div>
}


export default PaymentPageDumb;
