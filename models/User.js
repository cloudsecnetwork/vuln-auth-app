const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Import Schema from Mongoose

// Function to generate a random 4-digit code
function generateRecoveryCode() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        accountBalance: {
            type: Number,
            default: 0,
        },
        address: {
            type: String,
            default: "NA",
        },
        dateOfBirth: {
            type: String,
            default: "NA",
        },
        recoveryCode: {
            type: String,
        },
    },
    { timestamps: true }
);

// Middleware to generate recovery code before saving
UserSchema.pre('save', function (next) {
    // Generate random recovery code only if it doesn't exist yet
    if (!this.recoveryCode) {
        this.recoveryCode = generateRecoveryCode();
    }
    next();
});

module.exports = User = mongoose.model("User", UserSchema);
