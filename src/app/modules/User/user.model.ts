import { Schema, model } from "mongoose";
import { Tuser } from "./user.interface";
import bcrypt from 'bcrypt'
import config from "../../config";

const userSchema = new Schema<Tuser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['user', 'admin'], required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    isDeleted: { type: Boolean, default: false},
},
{
    timestamps: true,
},
)

userSchema.pre('save', async function(next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
    }
    next();
});

userSchema.post('save', function(doc, next) {
    doc.password = '';
    next();
}
)

export const UserModel = model<Tuser>('User', userSchema)

