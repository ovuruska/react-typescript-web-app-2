/*import {GetAllBranchesUseCase} from "@domain/usecases/branch/get-all-branches";
import {Container} from "inversify";
import {getTestContainer} from "@utils/inversion-container-test";
import mock = jest.mock;
import mockAxios from "jest-mock-axios";

describe('GetAllBranchesUseCase', () => {
  let getAllBranchesUseCase: GetAllBranchesUseCase;
  let container: Container;

  beforeAll(() => {
    container = getTestContainer();
    getAllBranchesUseCase = container.get(GetAllBranchesUseCase);
  });


  it('should be defined', () => {
    expect(getAllBranchesUseCase).toBeDefined();
  });

  it('should return all branches', async () => {

    const branches = [
      {
        id: 1,
        name: 'branch1',
        address: 'address1',
        phone: 'phone1',
        email: 'email1',
        description: 'description1',
      }
    ];

    mockAxios.get.mockResolvedValue({data: branches});
    const result = await getAllBranchesUseCase.call();
    expect(branches.length).toBeGreaterThan(0);


  });
});


 */

// Path: src/domain/usecases/employee/get-all-groomers.spec.ts
import {getTestContainer} from "@utils/inversion-container-test";
import {GetAllGroomers} from "@domain/usecases/employee/get-all-groomers";
import {Container} from "inversify";
import mockAxios from "jest-mock-axios";

describe('GetAllGroomers', () => {
  let getAllGroomers: GetAllGroomers;
  let container: Container;

  beforeAll(() => {
    container = getTestContainer();
    getAllGroomers = container.get(GetAllGroomers);
  });

  it('should be defined', () => {
    expect(getAllGroomers).toBeDefined();
  });

  it('should return all groomers', async () => {

    const groomers = [
      {
        id: 1,
        createdAt: '2021-01-01',
        name: 'groomer1',
        email: 'email1',
        phone: 'phone1',
        role: "15",
      }
    ];

    mockAxios.get.mockResolvedValue({data: groomers});

    const result = await getAllGroomers.call();
    expect(result).toEqual(groomers);
    expect(mockAxios.get).toHaveBeenCalledWith('/api/employees', {params: {role: "15"}});

  });

});
