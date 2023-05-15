import { useEffect, useState } from 'react';
import { CreditCardInformation, CreditCardRecord } from '@domain/types/common/credit-card';
import { PaymentListCreditCardsUseCase } from '@domain/usecases/payment/list-credit-cards';
import { useInjection } from 'inversify-react';
import { PaymentCreateCreditCardUseCase } from '@domain/usecases/payment/create-credit-card';
import { PaymentDeleteCreditCardUseCase } from '@domain/usecases/payment/delete-credit-card';

export interface UseCardsReturnParams {
  cards: CreditCardRecord[];
  loading: boolean;
  error: string | null;
  addCard: (card: CreditCardInformation) => void;
  deleteCard: (cardId: number) => void;
}

export const useCards = (): UseCardsReturnParams => {
  const [cards, setCards] = useState<CreditCardRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const listCreditCards = useInjection<PaymentListCreditCardsUseCase>(PaymentListCreditCardsUseCase);
  const addCardUseCase = useInjection<PaymentCreateCreditCardUseCase>(PaymentCreateCreditCardUseCase);
  const deleteCardUseCase = useInjection<PaymentDeleteCreditCardUseCase>(PaymentDeleteCreditCardUseCase);


  useEffect(() => {
    listCreditCards.call().then((response) => {
      setCards(response);
      setError(null);
    }).catch((error) => {
      setError(error.toString());
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const addCard = async (card: CreditCardInformation) => {
    addCardUseCase.call(card).then((response) => {
      setCards([...cards, response]);
      setError(null);
    }).catch((error) => {
      setError(error.toString());
    });
  };

  const deleteCard = async (cardId: number) => {
    deleteCardUseCase.call(cardId).then((response) => {
      setCards(cards.filter((card) => card.id !== cardId));
      setError(null);
    }).catch((error) => {
      setError(error.toString());
    });
  };


  return { cards, loading, error, addCard, deleteCard };
};
