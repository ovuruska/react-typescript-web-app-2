import { inject, injectable } from 'inversify';
import { PaymentRepository } from '@domain/repositories/payment';
import { CreditCardInformation, CreditCardRecord } from '@domain/types/common/credit-card';
import { PaymentRemoteDataSource } from '@data/datasources/payment/index.remote';
import { PaymentLocalDataSource } from '@data/datasources/payment/index.local';

@injectable()
export class PaymentRepositoryImpl implements PaymentRepository{
  constructor(
    @inject(PaymentRemoteDataSource) private paymentRemoteDataSource: PaymentRemoteDataSource,
    @inject(PaymentLocalDataSource) private paymentLocalDataSource: PaymentLocalDataSource
    ) {
  }

  async addCreditCard(creditCard: CreditCardInformation): Promise<CreditCardRecord> {
    const response = await this.paymentRemoteDataSource.addCreditCard(creditCard);
    if(!response) throw new Error('Error adding credit card');
    else {
      await this.paymentLocalDataSource.createCreditCard(response);
      return response;
    }
  }

  async deleteCreditCard(id: number): Promise<void> {
    await this.paymentRemoteDataSource.deleteCreditCard(id);
    await this.paymentLocalDataSource.deleteCreditCard(id);
  }

  async listCreditCards(): Promise<CreditCardRecord[]> {
    const response = await this.paymentLocalDataSource.listCreditCards();
    if(!response){
      const remoteResponse = await this.paymentRemoteDataSource.listCreditCards();
      if(!remoteResponse) throw new Error('Error listing credit cards');
      else {
        await this.paymentLocalDataSource.setAll(remoteResponse);
        return remoteResponse;
      }
    }else{
      this.paymentRemoteDataSource.listCreditCards().then(async (remoteResponse) => {
        await this.paymentLocalDataSource.setAll(remoteResponse);
      });
      return response;
    }
  }
}
