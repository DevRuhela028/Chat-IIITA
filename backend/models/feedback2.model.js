import mongoose from "mongoose";

const feedback2Schema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);
export const Feedback2 = mongoose.model("Feedback2", feedback2Schema);
