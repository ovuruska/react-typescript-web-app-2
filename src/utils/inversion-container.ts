import {ApiUrl, ApiUrlSymbol} from "@domain/types/symbols/api-url";
import {Container} from "inversify";
import 'reflect-metadata';

let container: Container;

export const createInversion = () => {
  container = new Container();


  if( typeof process !== 'undefined') container.bind<ApiUrl>(ApiUrlSymbol).toConstantValue({value: process.env.API_URL as string});
  else container.bind<ApiUrl>(ApiUrlSymbol).toConstantValue({value:import.meta.env.VITE_API_URL as string});

}

export const getContainer = () => {
  if (!container) {
    createInversion();
    return container;
  }
  return container;
};
