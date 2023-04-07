import {injectable} from "inversify";


@injectable()
export abstract class MockGenerator<T> {
  abstract generateOne(): T;

  abstract generateMany(count: number): T[];
}
