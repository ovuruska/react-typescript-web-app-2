import {ApiUrl, ApiUrlSymbol} from "@domain/types/symbols/api-url";
import {Container} from "inversify";
import 'reflect-metadata';
import {CapacityRemoteDataSource} from "@data/datasources/capacity/capacity-remote-data-source";
import {CapacityRemoteDataSourceImpl} from "@data/datasources/capacity/capacity-remote-data-source-impl";
import {CapacityRepository} from "@domain/repositories/capacity-repository";
import {CapacityRepositoryImpl} from "@data/repositories/capacity-repository-impl";
import {GetMonthlyCapacityUseCase} from "@domain/usecases/get-monthly-capacity";
import {AvailableRemoteDataSource} from "@data/datasources/available/remote-data-source";
import {AvailableRemoteDataSourceImpl} from "@data/datasources/available/remote-data-source-impl";
import {AvailableRepository} from "@domain/repositories/available-repository";
import {AvailableRepositoryImpl} from "@data/repositories/available-repository-impl";
import {HttpClientImpl} from "@quicker/common/http-client-impl";
import {GetAvailableSlotsUseCase} from "@domain/usecases/get-available-slots";
import {HttpClient, HttpClientSymbol} from "@quicker/common/http-client";

let container: Container;

export const createTestInversion = () => {
  container = new Container();


  container.bind<ApiUrl>(ApiUrlSymbol).toConstantValue({value: process.env.API_URL as string});

  container.bind<CapacityRemoteDataSource>(CapacityRemoteDataSource).to(CapacityRemoteDataSourceImpl);
  container.bind<CapacityRepository>(CapacityRepository).to(CapacityRepositoryImpl);
  container.bind<GetMonthlyCapacityUseCase>(GetMonthlyCapacityUseCase).toSelf();
  container.bind<HttpClient>(HttpClientSymbol).to(HttpClientImpl);
  container.bind<AvailableRepository>(AvailableRepository).to(AvailableRepositoryImpl);
  container.bind<AvailableRemoteDataSource>(AvailableRemoteDataSource).to(AvailableRemoteDataSourceImpl);
  container.bind<GetAvailableSlotsUseCase>(GetAvailableSlotsUseCase).toSelf();
}

export const getTestContainer = () => {
  if (!container) {
    createTestInversion();
    return container;
  }
  return container;
};
