import {CustomerRemoteDataSource} from "@data/datasources/customer/remote-data-source";
import {MeResponse} from "@domain/types/responses/me-response";
import {inject, injectable} from "inversify";
import {HttpClient, HttpClientSymbol} from "@quicker/common/http-client";


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
