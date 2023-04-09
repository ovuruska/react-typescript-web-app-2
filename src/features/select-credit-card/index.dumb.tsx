import { CreditCardDetails } from '@domain/types/common/credit-card-details';
import style from './index.module.scss';
import { Box, Drawer } from '@mui/material';
import CtaSecondary from '@components/buttons/cta-secondary';
import CheckableCard from '@components/cards/checkable-card/checkable-card';
import React from 'react';
import { Close } from '@mui/icons-material';
import SelectBottomDrawer from '@components/drawers/select-bottom-drawer/select-bottom-drawer';
import WeakBtn from '@components/buttons/weak-btn/weak-btn';

export interface SelectCreditCardDumbProps {
  options?: CreditCardDetails[];
  onSelect?: (creditCard: CreditCardDetails) => void;
  selected?: CreditCardDetails | null;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

const SelectCreditCardDumb: React.FC<SelectCreditCardDumbProps> = ({
                                                                     options, onSelect, selected, open, setOpen,
                                                                   }: SelectCreditCardDumbProps) => {

  const handleClose = () => {
    setOpen && setOpen(false);
  };
  const handleOpen = () => {
    setOpen && setOpen(true);
  };

  let creditCardNumber = '';
  if (selected) {
    creditCardNumber = selected.cardNumber;
    creditCardNumber = creditCardNumber.slice(0, 4) + '**** **** **' + creditCardNumber.slice(14);
  }


  return <div className={style.selectCreditCardContainer}>
    <div className={style.selectCreditCard} >
      <label>{creditCardNumber}</label>
    </div>
    <WeakBtn onClick={handleOpen} content={'Change card'} />
    <SelectBottomDrawer open={open ?? false} >
      <Box
        className={style.selectCreditCard__drawer}
      >
        <div className={style.selectCreditCard__headerRow}>
          <div>
            <h2>Payment Methods</h2>
            <p className={style.selectCreditCard__instruction}>Select a payment method to use for this order</p>
          </div>
          <Close onClick={handleClose}/>

        </div>

        {options?.map((option, index) => {
          const { expiredDate, cardNumber, issuer } = option;
          const content = '****' + cardNumber?.slice(12) + ' expiring at ' + expiredDate;
          return <CheckableCard key={index} title={issuer} content={content}
                                checked={selected?.cardNumber === option.cardNumber}
                                onClicked={() => onSelect && onSelect(option)} />;
        })}
        <CtaSecondary onClick={handleClose} text={'Select card'} />

      </Box>

    </SelectBottomDrawer>
  </div>;


};

export default SelectCreditCardDumb;
