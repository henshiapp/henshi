/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { wrappers } from "protobufjs";
import { Observable } from "rxjs";
import { Empty } from "../../../google/protobuf/empty";

export enum UserRole {
  FREE_USER = "FREE_USER",
  ADMIN = "ADMIN",
}

export interface OptionalUser {
  id?: string | undefined;
  name?: string | undefined;
  email?: string | undefined;
  role?: UserRole | undefined;
  emailConfirmed?: boolean | undefined;
  refreshToken?: string | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  emailConfirmed: boolean;
  refreshToken?: string | undefined;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

export interface UserOrUndefined {
  user?: User | undefined;
}

export const USERS_PACKAGE_NAME = "users";

wrappers[".google.protobuf.Timestamp"] = {
  fromObject(value: Date) {
    return { seconds: value.getTime() / 1000, nanos: (value.getTime() % 1000) * 1e6 };
  },
  toObject(message: { seconds: number; nanos: number }) {
    return new Date(message.seconds * 1000 + message.nanos / 1e6);
  },
} as any;

export interface UsersServiceClient {
  findOne(request: OptionalUser): Observable<UserOrUndefined>;

  create(request: CreateUserRequest): Observable<UserOrUndefined>;

  update(request: OptionalUser): Observable<Empty>;
}

export interface UsersServiceController {
  findOne(request: OptionalUser): Promise<UserOrUndefined> | Observable<UserOrUndefined> | UserOrUndefined;

  create(request: CreateUserRequest): Promise<UserOrUndefined> | Observable<UserOrUndefined> | UserOrUndefined;

  update(request: OptionalUser): void;
}

export function UsersServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findOne", "create", "update"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UsersService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UsersService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USERS_SERVICE_NAME = "UsersService";
