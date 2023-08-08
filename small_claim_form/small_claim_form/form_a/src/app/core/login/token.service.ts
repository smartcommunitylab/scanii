import { Injectable } from "@angular/core";
import { SessionStorageService } from "ngx-webstorage";
import jwtDecode, { JwtPayload } from "jwt-decode";

@Injectable({
  providedIn: "root",
})
export class TokenService {
  constructor(private $sessionStorage: SessionStorageService) {}

  getToken(): string {
    return this.$sessionStorage.retrieve("authenticationToken") || "";
  }

  getClaimant(): string | null {
    const token = this.getToken();
    try {
      const jwtPayload = jwtDecode<CustomJwtPayload>(token);
      return jwtPayload.id;
    } catch (error) {
      console.error("Error while decoding the JWT token: ", error);
      return null;
    }
  }
}

interface CustomJwtPayload extends JwtPayload {
  id: string;
}
