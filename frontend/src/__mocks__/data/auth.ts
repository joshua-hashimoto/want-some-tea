import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import { SignInResponse } from "~/models/auth";

const generateToken = (payload: Record<string, unknown>) => {
  const secretKey = "yourSecretKey"; // Replace with your own secret key
  const options = {
    expiresIn: "1h", // Token expiration time
  };

  return jwt.sign(payload, secretKey, options);
};

export const signInResponse: SignInResponse = {
  accessToken: generateToken({
    userId: uuidv4(),
  }),
};
