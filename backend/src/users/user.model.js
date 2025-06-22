const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    profileImage: String,
    bio: { type: String, maxLength: 200 },
    profession: String,
    createdAt: { type: Date, default: Date.now },
})

// Hashing password before saving
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password'))
        return next();
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();

});

userSchema.methods.comparePassword = async function (candidatePassword) {
    const user = this;
    return await bcrypt.compare(candidatePassword, user.password);
};

const User = new model('User', userSchema);
module.exports = User;