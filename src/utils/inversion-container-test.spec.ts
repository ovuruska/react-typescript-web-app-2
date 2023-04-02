import {getTestContainer} from "@utils/inversion-container-test";
import {ApiUrl, ApiUrlSymbol} from "@domain/types/symbols/api-url";

describe("Inversion container", () => {
  it("should create a container", () => {
    const container = getTestContainer();
    expect(container).toBeDefined();
  });

  it("should contain API_URL.", () => {
    const container = getTestContainer();
    const apiUrl: ApiUrl = container.get(ApiUrlSymbol);
    expect(apiUrl).toBeDefined();
    expect(apiUrl.value).toBeDefined();
  });
});
