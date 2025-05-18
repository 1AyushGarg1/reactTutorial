import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    lastName: {
        type: String,
        default: 'last name',
        maxlength: 50,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    location: {
        type: String,
        default: 'not specified',
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    avatar:String,
    avatarPublicId: String,
}, { timestamps: true });

userSchema.methods.toJSON = function () {
    let obj = this.toObject();
    delete obj.password;
    return obj;
}

export default mongoose.model('User', userSchema);