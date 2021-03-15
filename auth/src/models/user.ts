import mongoose from 'mongoose';
import { Password } from "../services/password";

// Interface to describe the properties required for a new User
interface UserAttributes {
    email: string;
    password: string;
}

// Interface to describe the properties of the User model
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttributes): UserDoc
}

// Interface to describe the properties a User Model has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            ret.id = ret._id;
            delete ret._id;
        },
        versionKey: false
    }
});

userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

userSchema.statics.build = (attrs: UserAttributes) => {
    return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };