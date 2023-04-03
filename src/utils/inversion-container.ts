import {ApiUrl, ApiUrlSymbol} from "@domain/types/symbols/api-url";
import {Container} from "inversify";
import {CapacityRemoteDataSource} from "@data/datasources/capacity/capacity-remote-data-source";
import {CapacityRemoteDataSourceImpl} from "@data/datasources/capacity/capacity-remote-data-source-impl";
import {CapacityRepository} from "@domain/repositories/capacity-repository";
import {CapacityRepositoryImpl} from "@data/repositories/capacity-repository-impl";
import {GetMonthlyCapacityUseCase} from "@domain/usecases/get-monthly-capacity";
import {AvailableRepository} from "@domain/repositories/available-repository";
import {AvailableRemoteDataSource} from "@data/datasources/available/remote-data-source";
import {AvailableRepositoryImpl} from "@data/repositories/available-repository-impl";
import {AvailableRemoteDataSourceImpl} from "@data/datasources/available/remote-data-source-impl";
import {GetAvailableSlotsUseCase} from "@domain/usecases/get-available-slots";
import {HttpClient, HttpClientSymbol} from "@quicker/common/http-client";
import {HttpClientImpl} from "@quicker/common/http-client-impl";
import {CustomerRemoteDataSource} from "@data/datasources/customer/remote-data-source";
import {CustomerRemoteDataSourceImpl} from "@data/datasources/customer/remote-data-source-impl";
import {CustomerRepository} from "@domain/repositories/customer-repository";
import {CustomerRepositoryImpl} from "@data/repositories/customer-repository-impl";
import {GetMeUseCase} from "@domain/usecases/get-me";

let container: Container;

export const createInversion = () => {
  container = new Container();

  container.bind<ApiUrl>(ApiUrlSymbol).toConstantValue({value:import.meta.env.VITE_API_URL as string});
  container.bind<CapacityRemoteDataSource>(CapacityRemoteDataSource).to(CapacityRemoteDataSourceImpl);
  container.bind<CapacityRepository>(CapacityRepository).to(CapacityRepositoryImpl);
  container.bind<GetMonthlyCapacityUseCase>(GetMonthlyCapacityUseCase).toSelf();
  container.bind<HttpClient>(HttpClientSymbol).to(HttpClientImpl);
  container.bind<AvailableRepository>(AvailableRepository).to(AvailableRepositoryImpl);
  container.bind<AvailableRemoteDataSource>(AvailableRemoteDataSource).to(AvailableRemoteDataSourceImpl);
  container.bind<GetAvailableSlotsUseCase>(GetAvailableSlotsUseCase).toSelf();
  container.bind<CustomerRemoteDataSource>(CustomerRemoteDataSource).to(CustomerRemoteDataSourceImpl);
  container.bind<CustomerRepository>(CustomerRepository).to(CustomerRepositoryImpl);
  container.bind<GetMeUseCase>(GetMeUseCase).toSelf();

}

export const getContainer = () => {
  if (!container) {
    createInversion();
    return container;
  }
  return container;
};
