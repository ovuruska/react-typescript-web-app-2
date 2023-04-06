import {ApiUrl, ApiUrlSymbol} from "@domain/types/symbols/api-url";
import {Container} from "inversify";
import 'reflect-metadata';
import {containerBind} from "@utils/common";
import {Credentials} from "@domain/types/common/credentials";
import {CredentialsSymbol} from "@domain/types/TYPES";

let container: Container;

export const createTestInversion = () => {
  container = new Container();


  container.bind<ApiUrl>(ApiUrlSymbol).toConstantValue({value: process.env.API_URL as string});
  container
    .bind<Credentials>(CredentialsSymbol)
    .toConstantValue({
      username:process.env.API_USERNAME as string,
      password:process.env.API_PASSWORD as string,
    });

  containerBind(container);
}

export const getTestContainer = () => {
  if (!container) {
    createTestInversion();
    return container;
  }
  return container;
};
