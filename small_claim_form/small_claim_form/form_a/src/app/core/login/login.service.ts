import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SessionStorageService } from "ngx-webstorage";
import { Login } from "./login.model";
import { Observable, map } from "rxjs";
import { SERVER_API_URL } from "src/app/app.constants";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private $sessionStorage: SessionStorageService
  ) {}

  login(credentials: Login): Observable<void> {
    return this.http
      .post<any>(SERVER_API_URL + "auth/v1/login", credentials)
      .pipe(map((response) => this.authenticateSuccess(response)));
  }

  private authenticateSuccess(response: any): void {
    const jwt = response.data.token;
    this.$sessionStorage.store("authenticationToken", jwt);
  }
}
