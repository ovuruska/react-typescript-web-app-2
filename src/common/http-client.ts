import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { injectable } from "inversify";
import { ApiUrl } from "@domain/types/symbols/api-url";
import axios from "axios";

@injectable()
export abstract class HttpClient {
  public readonly instance: AxiosInstance;

  constructor(protected readonly apiUrl: ApiUrl) {
    this.instance = axios.create({ baseURL: apiUrl.value });
  }

  abstract get<Response = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Response>>;

  abstract post<Request = any, Response = any>(
    url: string,
    data?: Request,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Response>>;

  abstract put<Request = any, Response = any>(
    url: string,
    data?: Request,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Response>>;

  abstract delete<Response = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Response>>;

  abstract patch<Request = any, Response = any>(
    url: string,
    data?: Request,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Response>>;

  abstract login(username: string, password: string): Promise<any>;
}

export const HttpClientSymbol = Symbol("HttpClient");
