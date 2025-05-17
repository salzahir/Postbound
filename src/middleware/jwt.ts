import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}

function generateToken(userId: string): string {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' });
}


function verifyToken(token: string): jwt.JwtPayload {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (typeof decoded !== "object" || decoded === null || !("id" in decoded)) {
            throw new Error("Invalid token payload");
        }
        return decoded as jwt.JwtPayload;
    } catch (error) {
        throw new Error("Invalid token");
    }
}

export { generateToken, verifyToken };