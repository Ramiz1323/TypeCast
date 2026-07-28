import { Types } from "mongoose"

export interface IUser {
    _id: string,
    name: string,
    email: string,
    password: string,
    mobile: string,
    createdAt?: Date,
    updatedAt?: Date
}

export interface RegisterBody{
    name: string,
    email: string,
    password: string,
    mobile: string
}

export interface LoginBody {
    email: string,
    password: string
}

export interface JWTPayload{
    userId: Types.ObjectId,
    email?: string
}