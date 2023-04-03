import {MeResponse} from "@domain/types/responses/me-response";
import {injectable} from "inversify";

@injectable()
export abstract class CustomerRepository{
  abstract getMe(): Promise<MeResponse>;
}
