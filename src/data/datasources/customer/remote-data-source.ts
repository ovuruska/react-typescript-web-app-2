import {injectable} from "inversify";
import {MeResponse} from "@domain/types/responses/me-response";
import {RemoteDataSource} from "@data/datasources/remote-data-source";

@injectable()
export abstract class CustomerRemoteDataSource extends RemoteDataSource {
  abstract getMe(): Promise<MeResponse>;
}
