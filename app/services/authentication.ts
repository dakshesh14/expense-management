// cookie
import Cookies from "js-cookie";

import ApiBase from "./api-base";

import type { ILogin } from "@/types";

class AuthenticationServices extends ApiBase {
  static async login(username: string, password: string) {
    const response = await this.post<ILogin>(
      "/login/",
      {
        username,
        password,
      },
      {}
    );

    this.setAccessToken(response.access_token);
    this.setRefreshToken(response.refresh_token);
  }

  static async logout() {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
  }

  static refreshToken = async () => {
    const response = await this.post<any>("/token/refresh/", {
      refresh: Cookies.get("refreshToken"),
    });
    Cookies.set("accessToken", response.access, {
      expires: 7,
    });
    return response.access;
  };

  static getUserDetails = async () => {
    return await this.get("/user/");
  };
}

export default AuthenticationServices;
