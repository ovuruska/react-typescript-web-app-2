import { ApiUrl, ApiUrlSymbol } from "@domain/types/symbols/api-url";
import { Container } from "inversify";
import {containerBind} from "@utils/common";
import {CredentialsSymbol} from "@domain/types/TYPES";
import {Credentials} from "@domain/types/common/credentials";

let container: Container;

export const createInversion = () => {
  container = new Container();

  container
    .bind<ApiUrl>(ApiUrlSymbol)
    .toConstantValue({ value: import.meta.env.VITE_API_URL as string });

  const credentials = {
    username:import.meta.env.VITE_API_USERNAME as string,
    password:import.meta.env.VITE_API_PASSWORD as string,
  } as Credentials;


  container
    .bind<Credentials>(CredentialsSymbol)
    .toConstantValue(credentials);

  containerBind(container);
};

export const getContainer = () => {
  if (!container) {
    createInversion();
    return container;
  }
  return container;
};
