import {EmployeeEntity} from "@domain/types/common/employee";
import {NoParams} from "@quicker/common/no-params";
import {UseCaseWithNoParams} from "@quicker/common/use-case";
import {EmployeeRepository} from "@domain/repositories/employee/repository";
import {inject, injectable} from "inversify";

@injectable()
export class GetAllGroomers implements UseCaseWithNoParams<EmployeeEntity[]> {

  constructor(@inject(EmployeeRepository) private employeeRepository: EmployeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  async call(): Promise<EmployeeEntity[]> {
    return this.employeeRepository.getEmployees({role: "15"});
  }
}
