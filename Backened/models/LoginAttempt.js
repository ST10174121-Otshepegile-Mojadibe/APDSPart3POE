import mongoose from "mongoose";

const loginAttemptSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        immutable: true,
        trim: true,
        match: [/^[a-zA-Z0-9_]+$/, "Only alphanumeric characters and underscores are allowed"]
    },
    ipAddress: {
        type: String,
        required: true,
        immutable: true,
        validate: {
            validator: function(v) {
                return /^(\d{1,3}\.){3}\d{1,3}$/.test(v); // Basic IPv4 validation
            },
            message: props => `${props.value} is not a valid IP address`
        }
    },
    successfulLogin: {
        type: Boolean,
        required: true,
        immutable: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
        immutable: true
    }
});

export default mongoose.model("LoginAttempt", loginAttemptSchema);
