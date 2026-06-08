import mongoose from "mongoose";
import { IUser } from "@/types/user.types";
import bcrypt from 'bcrypt';

let userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        trim: true,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"]
    },
    mobile: {
        type: String,
        minlength: [10, "Minimum 10 digits required"],
        maxlength: [10, "Maximum 10 digits allowed"]
    },
}, { timestamps: true });

userSchema.pre("save", function (): void {
    if (!this.isModified("password")) return;
    this.password = bcrypt.hashSync(this.password, 10);
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;