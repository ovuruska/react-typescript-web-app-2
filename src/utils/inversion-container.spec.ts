import {getContainer} from "@utils/inversion-container";

describe("Inversion container", () => {
  it("should create a container", () => {
    const container = getContainer();
    expect(container).toBeDefined();
  });

});
