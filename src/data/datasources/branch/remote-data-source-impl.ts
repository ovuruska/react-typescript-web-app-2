import {inject, injectable} from "inversify";
import {BranchRemoteDataSource} from "@data/datasources/branch/remote-data-source";
import {BranchEntity} from "@domain/types/common/branch";
import {HttpClient, HttpClientSymbol} from "@quicker/common/http-client";


@injectable()
export class BranchRemoteDataSourceImpl implements  BranchRemoteDataSource {
  constructor(@inject(HttpClientSymbol) private httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getAllBranches(): Promise<BranchEntity[]> {
    const response = await  this.httpClient.get<BranchEntity[]>('/api/branch/all');
    return response.data as BranchEntity[];
  }
}
