import {BranchEntity} from "@domain/types/common/branch";
import {BranchLocalDataSource} from "@data/datasources/branch/local-data-source";
import {injectable} from "inversify";

@injectable()
export class BranchLocalDataSourceImpl extends BranchLocalDataSource {
  getAllBranches(): BranchEntity[] | null{
    // Get from session storage
    const branches = sessionStorage.getItem('branches');
    if (branches) {
      return JSON.parse(branches) as BranchEntity[];
    }
    else {
      return null;
    }
  }

  setAllBranches(branches: BranchEntity[]): void {
    sessionStorage.setItem('branches', JSON.stringify(branches));
  }
}
