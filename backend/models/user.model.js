import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: function() {
				// Password is only required if googleId is not present
				return !this.googleId;
			},
		},
		name: {
			type: String,
			required: true,
		},
		googleId: {
			type: String,
			unique: true,
			sparse: true, // Allows unique index on null values
		},
		lastLogin: {
			type: Date,
			default: Date.now,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		isPassword: {
			type: Boolean,
			default: false,
		},
		resetPasswordToken: String,
		resetPasswordExpiresAt: Date,
		verificationToken: String,
		verificationTokenExpiresAt: Date,
	},
	{ timestamps: true }
);

export const User = mongoose.model("User", userSchema);
