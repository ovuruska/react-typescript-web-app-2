import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { inject, injectable } from "inversify";
import { ApiUrl, ApiUrlSymbol } from "@domain/types/symbols/api-url";

@injectable()
export class HttpClientImpl {
  private instance: AxiosInstance;
  private authToken: string | null;

  constructor(@inject<ApiUrl>(ApiUrlSymbol) readonly apiUrl: ApiUrl) {
    this.instance = axios.create({ baseURL: apiUrl.value });
    this.authToken = localStorage.getItem("authToken");

    if (this.authToken) {
      this.instance.defaults.headers.common[
        "Authorization"
      ] = `Token ${this.authToken}`;
    }

    this.instance.interceptors.response.use(
      (response: any) => {
        if (response.status === 401) {
          this.purgeAuthToken();
        } else {
          return response;
        }
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
  }

  async login(username: string, password: string): Promise<void> {
    try {
      const response = await this.instance.post("/api/auth/customer/login", {
        username: "b",
        password: "b",
      });
      console.log(response);
      if (response.data.token) {
        this.setAuthToken(response.data.token);
      }
    } catch (error) {
      throw new Error("Authentication failed");
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
