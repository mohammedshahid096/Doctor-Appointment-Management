import Cookies from "js-cookie";

const GetCookie = () => {
  const cookie_token = Cookies.get("DpToken");
  return cookie_token;
};

export default GetCookie;
