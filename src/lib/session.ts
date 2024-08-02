import { parse, serialize } from "cookie";
import { cookies } from "next/headers";
import { defaultThemeColor, defaultThemeScheme } from "./theme";
import jwt, { JwtPayload } from "jsonwebtoken";

const SESSION_COOKIE_NAME = "RS_session";
const SESSION_SECRET = process.env.SESSION_SECRET || "SESSION_SECRET";

if (!SESSION_SECRET) {
  throw new Error("SESSION_SECRET must be set");
}

export type UserSession = {
  userId: string | null;
  scheme: string;
  theme: string;
};

function getUserSession(): UserSession | null {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionCookie) return null;

  try {
    const parsedCookies = parse(sessionCookie);
    const token = parsedCookies[SESSION_COOKIE_NAME];
    const decoded = jwt.verify(token, SESSION_SECRET) as JwtPayload;
    const userSession: UserSession = {
      userId: decoded.userId as string,
      scheme: decoded.scheme as string,
      theme: decoded.theme as string,
    };
    return userSession;
  } catch (e: any) {
    // eslint-disable-next-line no-console
    console.error("[session] error: " + e.message);
    return null;
  }
}

export function getUserInfo(): UserSession {
  const session = getUserSession();
  const userId = session?.userId ?? null;
  const scheme = session?.scheme || defaultThemeScheme;
  const theme = session?.theme ?? defaultThemeColor;
  return {
    userId,
    scheme,
    theme,
  };
}

export function setUserSession(userSession: UserSession) {
  const cookieStore = cookies();
  const token = jwt.sign(userSession, SESSION_SECRET, { expiresIn: "30d" });
  const serializedSession = serialize(SESSION_COOKIE_NAME, token, {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    httpOnly: true,
  });
  cookieStore.set(SESSION_COOKIE_NAME, serializedSession);
}
