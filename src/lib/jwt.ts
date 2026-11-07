import { JWTPayload } from "@/types/user.types";
import jwt from 'jsonwebtoken';

function getJwtSecret(): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET environment variable is missing.");
    }
    return secret;
}

export const generateToken = (payload: JWTPayload) => {
    return jwt.sign(payload, getJwtSecret(), {
        expiresIn: '7d'
    });
};

export const verifyToken = (token: string): any => {
    return jwt.verify(token, getJwtSecret());
};
