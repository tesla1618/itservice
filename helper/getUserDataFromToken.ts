import jwt from "jsonwebtoken";

// Function to get user data from token
export const getUserDataFromToken = (cookies: string | undefined) => {
  try {
    let token = "";
    if (typeof window !== "undefined") {
      // Client-side: Access cookies using document.cookie
      token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
    } else if (cookies) {
      // Server-side: Parse cookies from the parameter
      const parsedCookies = cookies.split("; ").reduce((acc, cookie) => {
        const [name, value] = cookie.split("=");
        acc[name] = value;
        return acc;
      }, {});
      token = parsedCookies.token || "";
    } else {
      throw new Error("No cookies provided");
    }

    // Check if token exists
    if (!token) {
      throw new Error("Token not provided");
    }

    const decodedToken: any = jwt.verify(token, `${process.env.TOKEN_SECRET}`!);

    return decodedToken;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
