/*
import {ApiUrlSymbol} from "@domain/types/symbols";
import {Container} from "inversify";

let container: Container;

export const inject = () => {
  container = new Container();
  container.bind(ApiUrlSymbol).toConstantValue(process.env.API_URL);


}

export const getContainer = () => container;

 */

import {getContainer} from "@utils/inversion-container";
import {ApiUrl, ApiUrlSymbol} from "@domain/types/symbols/api-url";

describe("Inversion container", () => {
  it("should create a container", () => {
    const container = getContainer();
    expect(container).toBeDefined();
  });

  it("should have API url variable set.", () => {
    const container = getContainer();
    const apiUrl = container.get<ApiUrl>(ApiUrlSymbol);
    expect(apiUrl).toBeDefined();
    expect(apiUrl.value).toBeDefined();
  });


});
