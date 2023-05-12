import { PaymentRepositoryImpl } from '@data/repositories/payment/index';
import { Container } from 'inversify';
import { getTestContainer } from '@utils/inversion-container-test';
import { PaymentRemoteDataSource } from '@data/datasources/payment/index.remote';
import { CreditCardInformation, CreditCardRecord } from '@domain/types/common/credit-card';
import { mock } from 'jest-mock-extended';
import { PaymentRepository } from '@domain/repositories/payment';

describe('PaymentRepositoryImpl', () => {
  let paymentRepositoryImpl: PaymentRepositoryImpl;
  let container : Container;
  let paymentRemoteDataSource : PaymentRemoteDataSource;

  beforeAll(()=>{
    container = getTestContainer();
    paymentRepositoryImpl = container.get(PaymentRepository) as PaymentRepositoryImpl;
    paymentRemoteDataSource = container.get(PaymentRemoteDataSource);
  });
  beforeEach(()=>{
    jest.resetAllMocks();
  });
  it('should be defined', () => {
    expect(paymentRepositoryImpl).toBeDefined();
  });
  it('should call paymentRemoteDataSource.addCreditCard', async () => {
    const creditCardRecord = mock<CreditCardRecord>();
    jest.spyOn(paymentRemoteDataSource, 'addCreditCard').mockResolvedValueOnce(creditCardRecord);
    const creditCardInformation = mock<CreditCardInformation>();
    await paymentRepositoryImpl.addCreditCard(creditCardInformation);
    expect(paymentRemoteDataSource.addCreditCard).toHaveBeenCalledWith(creditCardInformation);
  });
  it('should call paymentRemoteDataSource.deleteCreditCard', async () => {
    const id = 1;
    jest.spyOn(paymentRemoteDataSource, 'deleteCreditCard').mockResolvedValueOnce();
    await paymentRepositoryImpl.deleteCreditCard(id);
    expect(paymentRemoteDataSource.deleteCreditCard).toHaveBeenCalledWith(id);
  });
  it('should call paymentRemoteDataSource.listCreditCards', async () => {
    const creditCardRecords = mock<CreditCardRecord[]>();
    jest.spyOn(paymentRemoteDataSource, 'listCreditCards').mockResolvedValueOnce(creditCardRecords);
    const response = await paymentRepositoryImpl.listCreditCards();
    expect(paymentRemoteDataSource.listCreditCards).toHaveBeenCalled();
    expect(response).toEqual(creditCardRecords);
  });
});
