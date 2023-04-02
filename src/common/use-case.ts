import {injectable} from "inversify";

@injectable()
export abstract class UseCase<Params, Result> {
  abstract call(params: Params): Promise<Result>;
}
