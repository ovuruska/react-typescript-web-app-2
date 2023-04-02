import {ApiUrl, ApiUrlSymbol} from "@domain/types/symbols/api-url";
import {Container} from "inversify";
import 'reflect-metadata';
import {CapacityRemoteDataSource} from "@data/datasources/capacity/capacity-remote-data-source";
import {CapacityRemoteDataSourceImpl} from "@data/datasources/capacity/capacity-remote-data-source-impl";
import {CapacityRepository} from "@domain/repositories/capacity-repository";
import {CapacityRepositoryImpl} from "@data/repositories/capacity-repository-impl";
import {GetMonthlyCapacityUseCase} from "@domain/usecases/get-monthly-capacity";
import {CapacityRemoteDataSourceMock} from "@data/datasources/capacity/capacity-remote-data-source-mock";

let container: Container;

export const createTestInversion = () => {
  container = new Container();


  container.bind<ApiUrl>(ApiUrlSymbol).toConstantValue({value: process.env.API_URL as string});
  container.bind<CapacityRemoteDataSource>(CapacityRemoteDataSource).to(CapacityRemoteDataSourceMock);
  container.bind<CapacityRepository>(CapacityRepository).to(CapacityRepositoryImpl);
  container.bind<GetMonthlyCapacityUseCase>(GetMonthlyCapacityUseCase).toSelf();
}

export const getTestContainer = () => {
  if (!container) {
    createTestInversion();
    return container;
  }
  return container;
};
