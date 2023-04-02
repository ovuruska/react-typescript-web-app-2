import {ApiUrl, ApiUrlSymbol} from "@domain/types/symbols/api-url";
import {Container} from "inversify";
import 'reflect-metadata';
import {CapacityRemoteDataSource} from "@data/datasources/capacity/capacity-remote-data-source";
import {CapacityRemoteDataSourceImpl} from "@data/datasources/capacity/capacity-remote-data-source-impl";

let container: Container;

export const createInversion = () => {
  container = new Container();

  container.bind<ApiUrl>(ApiUrlSymbol).toConstantValue({value:import.meta.env.VITE_API_URL as string});
  container.bind<CapacityRemoteDataSource>(CapacityRemoteDataSource).to(CapacityRemoteDataSourceImpl);
}

export const getContainer = () => {
  if (!container) {
    createInversion();
    return container;
  }
  return container;
};
