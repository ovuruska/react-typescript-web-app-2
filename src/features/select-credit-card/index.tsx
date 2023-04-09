import React from 'react';
import { CreditCardDetails } from '@domain/types/common/credit-card-details';
import SelectCreditCardDumb from '@features/select-credit-card/index.dumb';
import { CreditCardDetailsMockGenerator } from '@domain/types/__mock__/credit-card-details-generator';

export interface SelectCreditCardProps {
  onSelect?: (creditCard: CreditCardDetails) => void;

}

const creditCardGenerator = new CreditCardDetailsMockGenerator();
const creditCards = creditCardGenerator.generateMany(5);


const SelectCreditCard: React.FC<SelectCreditCardProps> = ({
                                                             onSelect,
                                                           }: SelectCreditCardProps) => {



  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<CreditCardDetails | null>(creditCards[0]);


  const handleSelect = (creditCard: CreditCardDetails) => {
    setSelected(creditCard);
    onSelect && onSelect(creditCard);
  };

  return <SelectCreditCardDumb onSelect={handleSelect} options={creditCards} selected={selected} open={open}
                               setOpen={setOpen} />;
};

export default SelectCreditCard;
