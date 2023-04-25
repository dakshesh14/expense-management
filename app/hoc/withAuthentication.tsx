import { NextPage } from "next";
import Router from "next/router";

// services
import Authentication from "@/services/authentication";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const convertCookieStringToObject = (
  cookieHeader: string | undefined
) => {
  const list: any = {};
  if (!cookieHeader) return list;

  cookieHeader.split(`;`).forEach(function (cookie) {
    // eslint-disable-next-line prefer-const
    let [name, ...rest] = cookie.split(`=`);
    name = name?.trim();
    if (!name) return;
    const value = rest.join(`=`).trim();
    if (!value) return;
    list[name] = decodeURIComponent(value);
  });

  return list;
};

const withAuth = (Component: NextPage) => {
  const WithAuth: NextPage = (props) => {
    return <Component {...props} />;
  };

  WithAuth.getInitialProps = async (ctx) => {
    const isServer = typeof window === "undefined";
    const cookies = isServer ? ctx?.req?.headers.cookie : document.cookie;

    const accessToken = convertCookieStringToObject(cookies)["accessToken"];

    const nextPage = ctx?.asPath;
    const loginRoute = nextPage
      ? "/login?next=" + nextPage
      : "/login";

    if (!accessToken) {
      if (isServer) {
        ctx?.res?.writeHead(302, { Location: loginRoute });
        ctx?.res?.end();
      } else {
        Router.push(loginRoute);
      }
    }

    let userDetail: any;

    if (isServer) {
      userDetail = fetch(`${baseUrl}/user/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => data);
    } else {
      userDetail = await Authentication.getUserDetails();
    }

    if (!userDetail) {
      let refreshTokenResponse: any;

      if (isServer) {
        const refreshToken =
          convertCookieStringToObject(cookies)["refreshToken"];

        await fetch(`${baseUrl}/token/refresh/`, {
          method: "POST",
          body: JSON.stringify({ refresh: refreshToken }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            refreshTokenResponse = data;
          });
      } else {
        refreshTokenResponse = await Authentication.refreshToken();
      }

      if (isServer && !refreshTokenResponse) {
        ctx?.res?.writeHead(302, { Location: loginRoute });
        ctx?.res?.end();
      } else if (!refreshTokenResponse) {
        if (!refreshTokenResponse) Router.push(loginRoute);
      }
    }

    const componentProps =
      Component.getInitialProps && (await Component.getInitialProps(ctx));

    return { ...componentProps, userDetail };
  };

  return WithAuth;
};

export default withAuth;
