import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}

function generateToken(userId: string): string {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' });
}

export { generateToken };