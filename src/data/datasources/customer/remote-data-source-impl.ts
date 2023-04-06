import {CustomerRemoteDataSource} from "@data/datasources/customer/remote-data-source";
import {MeResponse} from "@domain/types/responses/me-response";
import {inject, injectable} from "inversify";
import {HttpClient} from "@quicker/common/http-client";
import {HttpClientSymbol} from "@domain/types/TYPES";


@injectable()
export class CustomerRemoteDataSourceImpl implements CustomerRemoteDataSource{
  constructor(@inject<HttpClient>(HttpClientSymbol) private client: HttpClient){
    this.client = client;
  }

  async getMe(): Promise<MeResponse> {
    const response = await this.client.get<MeResponse>('/api/me');
    return response.data as MeResponse;
  }

}
