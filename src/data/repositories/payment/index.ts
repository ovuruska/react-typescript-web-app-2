import { inject, injectable } from 'inversify';
import { PaymentRepository } from '@domain/repositories/payment';
import { CreditCardInformation, CreditCardRecord } from '@domain/types/common/credit-card';
import { PaymentRemoteDataSource } from '@data/datasources/payment/index.remote';

@injectable()
export class PaymentRepositoryImpl implements PaymentRepository{
  constructor(@inject(PaymentRemoteDataSource) private paymentRemoteDataSource: PaymentRemoteDataSource) {
  }

  addCreditCard(creditCard: CreditCardInformation): Promise<CreditCardRecord> {
    return this.paymentRemoteDataSource.addCreditCard(creditCard);
  }

  deleteCreditCard(id: number): Promise<void> {
    return this.paymentRemoteDataSource.deleteCreditCard(id);
  }

  listCreditCards(): Promise<CreditCardRecord[]> {
    return this.paymentRemoteDataSource.listCreditCards();
  }

}
