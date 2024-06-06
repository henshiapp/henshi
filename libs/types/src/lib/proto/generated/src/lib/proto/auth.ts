/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export interface MeRequest {
  jwt?: string | undefined;
}

export interface JwtUser {
  id: string;
  name: string;
  email: string;
  role: string;
  emailConfirmed: boolean;
  iat: number;
  exp: number;
}

export interface JwtUserOrUndefined {
  user?: JwtUser | undefined;
}

export const AUTH_PACKAGE_NAME = "auth";

export interface AuthServiceClient {
  me(request: MeRequest): Observable<JwtUserOrUndefined>;
}

export interface AuthServiceController {
  me(request: MeRequest): Promise<JwtUserOrUndefined> | Observable<JwtUserOrUndefined> | JwtUserOrUndefined;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["me"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";
