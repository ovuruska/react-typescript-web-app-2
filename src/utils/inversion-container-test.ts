import {ApiUrl, ApiUrlSymbol} from "@domain/types/symbols/api-url";
import {Container} from "inversify";
import 'reflect-metadata';
import {containerBind} from "@utils/common";

let container: Container;

export const createTestInversion = () => {
  container = new Container();


  container.bind<ApiUrl>(ApiUrlSymbol).toConstantValue({value: process.env.API_URL as string});
  containerBind(container);
}

export const getTestContainer = () => {
  if (!container) {
    createTestInversion();
    return container;
  }
  return container;
};
