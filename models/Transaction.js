const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema(
    {
        reference: {
            type: String,
            required: true,
            unique: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            enum: ['debit', 'credit'],
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        channel: {
            type: String,
            enum: ['pos', 'web', 'atm'],
            required: true,
        },
        status: {
            type: String,
            default: "success"
        },
        cardType: {
            type: String,
            default: null
        },
        terminalID: {
            type: String,
            default: null
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User' // Reference to the User model
        }
    },
    { timestamps: true }
);

module.exports = Transaction = mongoose.model("Transaction", TransactionSchema);
