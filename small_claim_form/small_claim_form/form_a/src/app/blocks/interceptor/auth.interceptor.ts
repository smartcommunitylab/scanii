import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { SessionStorageService } from "ngx-webstorage";
import { SERVER_API_URL } from "src/app/app.constants";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private sessionStorage: SessionStorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      !request ||
      !request.url ||
      (request.url.startsWith("http") &&
        !(SERVER_API_URL && request.url.startsWith(SERVER_API_URL)))
    ) {
      return next.handle(request);
    }

    const token = this.sessionStorage.retrieve("authenticationToken");
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: "Bearer " + token,
        },
      });
    }
    return next.handle(request);
  }
}
