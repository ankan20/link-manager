import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || "your_secret_key";

// Convert the secret to a Uint8Array for `jose`
const secretKey = new TextEncoder().encode(JWT_SECRET);

/**
 * Generate a JWT token
 * @param userId - The user's ID
 * @returns {Promise<string>} - The signed JWT token
 */
export const generateToken = async (userId: number) => {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secretKey);

  return token;
};

/**
 * Verify a JWT token
 * @param token - The JWT token to verify
 * @returns {Promise<object | null>} - The decoded token payload if valid, otherwise null
 */
export const verifyToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload; // Decoded payload
  } catch (error) {
    // console.error("JWT verification error:", error);
    console.log(error)
    return null;
  }
};
