import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { inject, injectable } from "inversify";
import { ApiUrl, ApiUrlSymbol } from "@domain/types/symbols/api-url";
import { HttpClient } from "./http-client";
import { Credentials } from "@domain/types/common/credentials";
import { CredentialsSymbol } from "@domain/types/TYPES";

@injectable()
export class HttpClientImpl implements HttpClient {
  public instance: AxiosInstance;
  private authToken: string | null;

  constructor(
    @inject<ApiUrl>(ApiUrlSymbol) protected apiUrl: ApiUrl,
    @inject<Credentials>(CredentialsSymbol)
    private readonly credentials: Credentials
  ) {
    this.instance = axios.create({ baseURL: apiUrl.value });
    this.credentials = credentials;
    this.authToken = localStorage.getItem("authToken");

    if (this.authToken) {
      this.instance
        .get("/api/auth/customer/verify", {
          headers: {
            Authorization: `Token ${this.authToken}`,
          },
        })
        .then(() => {
          this.instance.defaults.headers.common[
            "Authorization"
          ] = `Token ${this.authToken}`;
        })
        .catch((err) => {
          this.authToken = null;
        });
    }

    this.instance.interceptors.response.use(
      (response: any) => {
        if (response.status === 401) {
        } else {
          return response;
        }
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
  }

  async login(username: "b", password: "b"): Promise<void> {
    if (this.authToken) return;
    try {
      const response = await this.instance.post("/api/auth/customer/login", {
        username,
        password,
      });
      if (response.status === 200) {
        this.setAuthToken(response.data.token);
      }
    } catch (error) {
      throw new Error("Authentication failed");
    }
  }

  async verify(): Promise<boolean> {
    if (!this.authToken) return false;
    try {
      const response = await this.instance.get("/api/auth/customer/verify", {
        headers: {
          Authorization: `Token ${this.authToken}`,
        },
      });
      return response.status === 200;
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(new Error("Wrong token"));
      });
    }
  }

  private setAuthToken(token: string): void {
    this.authToken = token;
    this.instance.defaults.headers.common["Authorization"] = `Token ${token}`;
    localStorage.setItem("authToken", token);
  }

  public purgeAuthToken(): void {
    this.authToken = null;
    delete this.instance.defaults.headers.common["Authorization"];
    localStorage.removeItem("authToken");
  }

  get<Response = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Response>> {
    return this.instance.get<Response>(url, config);
  }

  post<Request = any, Response = any>(
    url: string,
    data?: Request,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Response>> {
    return this.instance.post<Response>(url, data, config);
  }

  put<Request = any, Response = any>(
    url: string,
    data?: Request,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Response>> {
    return this.instance.put<Response>(url, data, config);
  }

  delete<Response = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Response>> {
    return this.instance.delete<Response>(url, config);
  }

  patch<Request = any, Response = any>(
    url: string,
    data?: Request,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Response>> {
    return this.instance.patch<Response>(url, data, config);
  }

  checkStatus(): Promise<AxiosResponse> {
    return this.get("/api/auth/customer/verify", {
      withCredentials: false,
    });
  }
}
