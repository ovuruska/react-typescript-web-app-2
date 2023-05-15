import { useCards } from '@hooks/payment/use-cards';
import { PaymentMethodsDumb } from '@pages/payment-methods/index.dumb';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '@quicker/route-names';


export const PaymentMethodsPage = () => {
  const { cards, deleteCard } = useCards();
  const navigate = useNavigate();
  const goToAddCard = () => {
    navigate(RouteNames.ADD_CARD);
  };
  const goToBack = () => {
    navigate(RouteNames.MY_ACCOUNT);
  };


  return <PaymentMethodsDumb cards={cards} goBack={goToBack} onAddCard={goToAddCard}
                             onDeleteCard={deleteCard} />;

};
