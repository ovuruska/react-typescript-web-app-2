import {CapacityRemoteDataSource} from "@data/datasources/capacity/capacity-remote-data-source";
import {CapacityRemoteDataSourceImpl} from "@data/datasources/capacity/capacity-remote-data-source-impl";
import {CapacityRepository} from "@domain/repositories/capacity-repository";
import {CapacityRepositoryImpl} from "@data/repositories/capacity/repository-impl";
import {HttpClient} from "@quicker/common/http-client";
import {HttpClientImpl} from "@quicker/common/http-client-impl";
import {AvailableRepository} from "@domain/repositories/available-repository";
import {AvailableRepositoryImpl} from "@data/repositories/available/repository-impl";
import {AvailableRemoteDataSource} from "@data/datasources/available/remote-data-source";
import {AvailableRemoteDataSourceImpl} from "@data/datasources/available/remote-data-source-impl";
import {CustomerRemoteDataSource} from "@data/datasources/customer/remote-data-source";
import {CustomerRemoteDataSourceImpl} from "@data/datasources/customer/remote-data-source-impl";
import {CustomerRepository} from "@domain/repositories/customer-repository";
import {CustomerRepositoryImpl} from "@data/repositories/customer/repository-impl";
import {Container} from "inversify";
import {BranchRemoteDataSource} from "@data/datasources/branch/remote-data-source";
import {BranchLocalDataSource} from "@data/datasources/branch/local-data-source";
import {BranchRemoteDataSourceImpl} from "@data/datasources/branch/remote-data-source-impl";
import {BranchLocalDataSourceImpl} from "@data/datasources/branch/local-data-source-impl";
import {GetMonthlyCapacityUseCase} from "@domain/usecases/capacity/get-monthly-capacity";
import {GetAvailableSlotsUseCase} from "@domain/usecases/available/get-available-slots";
import {GetMeUseCase} from "@domain/usecases/customer/get-me";
import {BranchRepositoryImpl} from "@data/repositories/branch/repository-impl";
import {BranchRepository} from "@domain/repositories/branch/repository";
import {GetAllBranchesUseCase} from "@domain/usecases/branch/get-all-branches";
import {EmployeeRemoteDataSource} from "@data/datasources/employee/remote-data-source";
import {EmployeeRemoteDataSourceImpl} from "@data/datasources/employee/remote-data-source-impl";
import {EmployeeRepository} from "@domain/repositories/employee/repository";
import {EmployeeRepositoryImpl} from "@data/repositories/employee/repository-impl";
import {GetAllGroomersUseCase} from "@domain/usecases/employee/get-all-groomers-use-case";
import {HttpClientSymbol} from "@domain/types/TYPES";
import { CapacityLocalDataSource } from '@data/datasources/capacity/local-data-source';
import { CapacityLocalDataSourceImpl } from '@data/datasources/capacity/local-data-source-impl';
import { ProductRemoteDataSource } from '@data/datasources/product/remote-data-source';
import { ProductRemoteDataSourceImpl } from '@data/datasources/product/remote-data-source-impl';
import { ProductLocalDataSource } from '@data/datasources/product/local-data-source';
import { ProductLocalDataSourceImpl } from '@data/datasources/product/local-data-source-impl';
import { ProductRepository } from '@domain/repositories/product/repository';
import { ProductRepositoryImpl } from '@data/repositories/product/repository-impl';
import { GetAllProductsUseCase } from '@domain/usecases/product/get-all-products';


export const containerBind = (container:Container) => {
  container.bind<CapacityRemoteDataSource>(CapacityRemoteDataSource).to(CapacityRemoteDataSourceImpl);
  container.bind<CapacityRepository>(CapacityRepository).to(CapacityRepositoryImpl);
  container.bind<GetMonthlyCapacityUseCase>(GetMonthlyCapacityUseCase).toSelf();
  container.bind<HttpClient>(HttpClientSymbol).to(HttpClientImpl).inSingletonScope();
  container.bind<AvailableRepository>(AvailableRepository).to(AvailableRepositoryImpl);
  container.bind<AvailableRemoteDataSource>(AvailableRemoteDataSource).to(AvailableRemoteDataSourceImpl);
  container.bind<GetAvailableSlotsUseCase>(GetAvailableSlotsUseCase).toSelf();
  container.bind<CustomerRemoteDataSource>(CustomerRemoteDataSource).to(CustomerRemoteDataSourceImpl);
  container.bind<CustomerRepository>(CustomerRepository).to(CustomerRepositoryImpl);
  container.bind<GetMeUseCase>(GetMeUseCase).toSelf();

  container.bind<BranchRepository>(BranchRepository).to(BranchRepositoryImpl).inSingletonScope();
  container.bind<BranchRemoteDataSource>(BranchRemoteDataSource).to(BranchRemoteDataSourceImpl).inSingletonScope();
  container.bind<BranchLocalDataSource>(BranchLocalDataSource).to(BranchLocalDataSourceImpl).inSingletonScope();
  container.bind<GetAllBranchesUseCase>(GetAllBranchesUseCase).toSelf().inSingletonScope();

  container.bind<EmployeeRemoteDataSource>(EmployeeRemoteDataSource).to(EmployeeRemoteDataSourceImpl);
  container.bind<EmployeeRepository>(EmployeeRepository).to(EmployeeRepositoryImpl);
  container.bind<GetAllGroomersUseCase>(GetAllGroomersUseCase).toSelf();

  container.bind<CapacityLocalDataSource>(CapacityLocalDataSource).to(CapacityLocalDataSourceImpl);

  container.bind<ProductRemoteDataSource>(ProductRemoteDataSource).to(ProductRemoteDataSourceImpl);
  container.bind<ProductLocalDataSource>(ProductLocalDataSource).to(ProductLocalDataSourceImpl);
  container.bind<ProductRepository>(ProductRepository).to(ProductRepositoryImpl);
  container.bind<GetAllProductsUseCase>(GetAllProductsUseCase).toSelf();
}
