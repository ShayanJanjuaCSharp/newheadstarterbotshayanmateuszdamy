import { Schema, model, models} from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already Exists'],
        required: [true, 'Email required']

    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    image:{
        type: String,
    }
})

const User = models.User || model('User', UserSchema);

export default User;

