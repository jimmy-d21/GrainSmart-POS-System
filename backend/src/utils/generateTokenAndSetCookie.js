import jwt from "jsonwebtoken";
import ENV from "./ENV.js";

const generateTokenAndSetCookie = (res, staffId) => {
  const token = jwt.sign({ staffId }, ENV.jwt, { expiresIn: "1h" });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: ENV.server.node_env === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60,
  });
};

export default generateTokenAndSetCookie;
