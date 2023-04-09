import {DailyAvailableSlot} from "@domain/types/responses/daily-available-slots-response";
import {injectable} from "inversify";
import {MockGenerator} from "@domain/types/__mock__/mock-generator";
import {faker} from "@faker-js/faker";
import {EmployeeMockGenerator} from "@domain/types/__mock__/employee-generator";
import {BranchMockGenerator} from "@domain/types/__mock__/branch-generator";


@injectable()
export class DailyAvailableSlotMockGenerator extends MockGenerator<DailyAvailableSlot>{
  private employeeMockGenerator: EmployeeMockGenerator = new EmployeeMockGenerator();
  private branchMockGenerator: BranchMockGenerator = new BranchMockGenerator();

  generateMany(count: number): DailyAvailableSlot[] {
    return new Array(count).fill(null).map(() => this.generateOne());
  }

  generateOne(): DailyAvailableSlot {
    return {
      start: faker.date.past().toString(),
      end: faker.date.past().toString(),
      employee: this.employeeMockGenerator.generateOne(),
      branch: this.branchMockGenerator.generateOne()
    } as DailyAvailableSlot;


  }

}
