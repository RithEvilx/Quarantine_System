import { APP_SECRET, APP_NAME } from "@/app/configs/app";
import cryptoJs from "crypto-js";
import Cookies from "js-cookie";

const charactor_list = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
const cookie_list = ["access_token", "refresh_token"] as const;

type CookieKey = (typeof cookie_list)[number];

type CookieNameMap = {
  [key in CookieKey]: string;
};

// 1) Use a global path (+ consistent options for set/remove)
const COOKIE_OPTS = {
  path: "/",
  sameSite: "lax" as const,
  secure: typeof window !== "undefined" ? window.location.protocol === "https:" : true,
};

// 2) Guard decryption; clear bad cookies instead of throwing
function safeDecrypt(b64: string, secret: string): string | null {
  try {
    const wa = cryptoJs.AES.decrypt(b64, secret);
    const s = cryptoJs.enc.Utf8.stringify(wa); // throws on malformed bytes
    if (!s) throw new Error("empty");
    return s;
  } catch {
    // remove both cookies with the SAME options so we don't loop on bad data
    Cookies.remove(generated_cookie.access_token, COOKIE_OPTS);
    Cookies.remove(generated_cookie.refresh_token, COOKIE_OPTS);
    return null;
  }
}

function generateCookieName(): CookieNameMap {
  let helper_c = 10;
  for (let i = 0; i < APP_NAME.length; i++) {
    helper_c += APP_NAME.charCodeAt(i) ^ APP_NAME.length;
  }

  const generated_cookie_name = {} as CookieNameMap;

  cookie_list.forEach((cookie) => {
    let temp_cookie_name = "";
    for (let j = 0; j < cookie.length; j++) {
      const charCode = Math.floor((cookie.charCodeAt(j) * helper_c) % charactor_list.length);
      temp_cookie_name += charactor_list[charCode];
    }
    generated_cookie_name[cookie] = temp_cookie_name;
  });

  return generated_cookie_name;
}

export const generated_cookie = generateCookieName();

export const cookies = {
  get_token: (): string | null => {
    const access_token = Cookies.get(generated_cookie.access_token);
    return access_token ? safeDecrypt(access_token, APP_SECRET) : null; // 3) use safe decrypt
  },
  get_refresh_token: (): string | null => {
    const refresh_token = Cookies.get(generated_cookie.refresh_token);
    return refresh_token ? safeDecrypt(refresh_token, APP_SECRET) : null; // 3) use safe decrypt
  },
  set_token: (access_token: string, refresh_token: string): void => {
    // Clear first to avoid “half state”, then set with global path
    Cookies.remove(generated_cookie.access_token, COOKIE_OPTS);
    Cookies.remove(generated_cookie.refresh_token, COOKIE_OPTS);

    Cookies.set(generated_cookie.access_token, cryptoJs.AES.encrypt(access_token, APP_SECRET).toString(), COOKIE_OPTS);
    Cookies.set(
      generated_cookie.refresh_token,
      cryptoJs.AES.encrypt(refresh_token, APP_SECRET).toString(),
      COOKIE_OPTS,
    );
  },
  clear_cookies: (): void => {
    Cookies.remove(generated_cookie.access_token, COOKIE_OPTS); // use same options!
    Cookies.remove(generated_cookie.refresh_token, COOKIE_OPTS);
  },
};
