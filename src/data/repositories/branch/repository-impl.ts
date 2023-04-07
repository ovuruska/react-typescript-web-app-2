import { inject, injectable } from "inversify";
import { BranchLocalDataSource } from "@data/datasources/branch/local-data-source";
import { BranchRemoteDataSource } from "@data/datasources/branch/remote-data-source";
import { BranchRepository } from "@domain/repositories/branch/repository";
import { BranchEntity } from "@domain/types/common/branch";

@injectable()
export class BranchRepositoryImpl implements BranchRepository {
  constructor(
    @inject(BranchRemoteDataSource)
    private remoteDataSource: BranchRemoteDataSource,
    @inject(BranchLocalDataSource)
    private localDataSource: BranchLocalDataSource
  ) {}

  async getAllBranches(): Promise<BranchEntity[]> {
    const localBranches = this.localDataSource.getAllBranches();
    if (localBranches !== null) {
      return Promise.resolve(localBranches);
    } else {
      const remoteBranches = await this.remoteDataSource.getAllBranches();
      this.localDataSource.setAllBranches(remoteBranches);
      return Promise.resolve(remoteBranches);
    }
  }
}
