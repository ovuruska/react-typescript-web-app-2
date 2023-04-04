import {MeResponse} from "@domain/types/responses/me-response";
import mockAxios from "jest-mock-axios";
import {CustomerRemoteDataSource} from "@data/datasources/customer/remote-data-source";
import {getTestContainer} from "@utils/inversion-container-test";
import {Container} from "inversify";
import {CustomerRemoteDataSourceImpl} from "@data/datasources/customer/remote-data-source-impl";

describe('CustomerRemoteDataSourceImpl', () => {
  let customerRemoteDataSource: CustomerRemoteDataSource;
  let container: Container;
  beforeAll(() => {
    container = getTestContainer();
    customerRemoteDataSource = container.get(CustomerRemoteDataSource);

  });
  it('should fetch customers successfully', async () => {
    const data = {
      id: 1,
      lifetime_tips: 0,
      lifetime_product_sales: 0,
      lifetime_service_sales: 0,
      dogs: [],
      created_at: "2021-01-01T00:00:00.000Z",
      updated_at: "2021-01-01T00:00:00.000Z",
      name: "Test",
      uid: "test",
      email: "",
      phone: "",
      address: "",
      role: 1,
      user: 1
    } as MeResponse;
    mockAxios.get.mockResolvedValue({data });

    const response = await customerRemoteDataSource.getMe();

    expect(mockAxios.get).toHaveBeenCalledWith('/api/me', undefined);

    expect(response).toEqual(data);
  });
});
