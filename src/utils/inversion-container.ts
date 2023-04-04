import { ApiUrl, ApiUrlSymbol } from "@domain/types/symbols/api-url";
import { Container } from "inversify";
import {containerBind} from "@utils/common";

let container: Container;

export const createInversion = () => {
  container = new Container();

  container
    .bind<ApiUrl>(ApiUrlSymbol)
    .toConstantValue({ value: import.meta.env.VITE_API_URL as string });
  containerBind(container);
};

export const getContainer = () => {
  if (!container) {
    createInversion();
    return container;
  }
  return container;
};
