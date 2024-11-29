import bcryptjs from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { OAuth2Client } from "google-auth-library";
import { User } from "../models/user.model.js";
import { Feedback2 } from "../models/feedback2.model.js";

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
	service: 'Gmail', 
	auth: {
		user: process.env.EMAIL_USERNAME, 
		pass: process.env.EMAIL_PASSWORD,  
	},
});

// Function to send verification email
export const sendVerificationEmail = async (email, token) => {
	const mailOptions = {
		from: process.env.EMAIL_USERNAME,
		to: email,
		subject: 'CHAT-IIITA : Verify your email',
		text: `You tried to login CHAT-IIITA . Please verify your email by entering the following code :  ${token}`
	};
	await transporter.sendMail(mailOptions);
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (req, res) => {
    const { token } = req.body; // Get the token from the request body

    try {
        const ticket = await client.verifyIdToken({
            idToken: token, // Verify the ID token
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload(); // Get the payload from the verified token

        const { email, name, sub: googleId } = payload;

        // Find the user in your database
        let user = await User.findOne({ email });

        if (!user) {
            // If the user doesn't exist, create a new one
            user = await User.create({
                email,
                name,
                googleId,
                isVerified: true, // Set email as verified
            });
        } else {
            // If the user exists, update any relevant fields if necessary
            user.googleId = googleId; // Update Google ID if it's changed
            await user.save();
        }

        // Generate token and set cookie
        generateTokenAndSetCookie(res, user._id, googleId); // Use user._id for the user ID

        // Respond with the user data if needed
        res.status(200).json({ user: { email, name, googleId } });
    } catch (error) {
        console.error("Error verifying Google token:", error);
        res.status(403).json({ message: "Failed to authenticate with Google" });
    }
};




export const signup = async (req, res) => {
	const { email, password, name } = req.body;

	try {
		if (!email || !password || !name) {
			throw new Error("All fields are required");
		}

		const userAlreadyExists = await User.findOne({ email });
		if (userAlreadyExists) {
			return res.status(400).json({ success: false, message: "User already exists" });
		}

		const hashedPassword = await bcryptjs.hash(password, 10);
		const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

		const user = new User({
			isPassword: true,
			email,
			password: hashedPassword,
			name,
			verificationToken,
			verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
		});

		await user.save();

		// Send verification email
		await sendVerificationEmail(user.email, verificationToken);

		//JWT token and set in cookie
		generateTokenAndSetCookie(res, user._id);

		res.status(201).json({
			success: true,
			message: "User created successfully. Verification email sent.",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};
export const verifyEmail = async (req, res) => {
    const { code } = req.body;

    try {
        // Find the user by verification token and check if the token is not expired
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
        }

        // Mark the user as verified and remove the token
        user.isVerified = true;
		user.isPassword = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        // Optionally send a welcome email
        await transporter.sendMail({
            from: process.env.EMAIL_USERNAME,
            to: user.email,
            subject: 'Email Verified',
            text: `Thank you for verifying your email, ${user.name}!
			Regards,
			Team CHAT-IIITA`
        });

        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        console.log("error in verifyEmail", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
// Function to send password reset email
const sendPasswordResetEmail = async (email, resetToken) => {
	const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
	const mailOptions = {
		from: process.env.EMAIL_USERNAME,
		to: email,
		subject: 'Password Reset Request',
		text: `You are receiving this email because you requested a password reset. Please click the following link to reset your password: ${resetUrl}`
	};

	await transporter.sendMail(mailOptions);
};

// Function to send password reset success email
const sendResetSuccessEmail = async (email) => {
	const mailOptions = {
		from: process.env.EMAIL_USERNAME,
		to: email,
		subject: 'Password Reset Successful',
		text: `Your password has been successfully reset. You can now log in with your new password.`
	};

	await transporter.sendMail(mailOptions);
};

// setting password
export const setPass = async(req,res) => {
	const {email , password} = req.body;
	try {
		const user = await User.findOne({email});
		if(!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}
		if (password) {
			const hashedPassword = await bcryptjs.hash(password, 10);
			user.password = hashedPassword;
			user.isPassword = true;
		}
		await user.save();
		res.status(200).json({
			success: true,
			message: "Profile updated successfully",
			user: {
			  ...user._doc,
			  password:undefined
			},
		  });
	}
	catch(error) {
		res.status(400).json({ success: false, message: error.message });
	}
}

// Forgot password controller
export const forgotPassword = async (req, res) => {
	const { email } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		// Generate reset token
		const resetToken = crypto.randomBytes(20).toString("hex");
		user.resetPasswordToken = resetToken;
		user.resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

		await user.save();

		// Send password reset email
		await sendPasswordResetEmail(user.email, resetToken);

		res.status(200).json({ success: true, message: "Password reset link sent to your email." });
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

// Reset password controller
export const resetPassword = async (req, res) => {
	const { token } = req.params;
	const { password } = req.body;

	try {
		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpiresAt: { $gt: Date.now() },
		});

		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
		}

		// Update password
		const hashedPassword = await bcryptjs.hash(password, 10);
		user.password = hashedPassword;
		user.isPassword = true,
		user.resetPasswordToken = undefined;
		user.resetPasswordExpiresAt = undefined;
		await user.save();

		// Send password reset success email
		await sendResetSuccessEmail(user.email);

		res.status(200).json({ success: true, message: "Password reset successful." });
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
};

export const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}
		const isPasswordValid = await bcryptjs.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}

		generateTokenAndSetCookie(res, user._id);

		user.lastLogin = new Date();
		await user.save();

		res.status(200).json({
			success: true,
			message: "Logged in successfully",
			user: {
				...user._doc,
				password: undefined,
			},
		});
	} catch (error) {
		console.log("Error in login ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};

export const logout = async (req, res) => {
	res.clearCookie("token");
	res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const checkAuth = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};
// Update Profile Controller
export const updateProfile = async (req, res) => {
	const { name, email, password } = req.body;
	try {
	  // Find the user by ID (assuming req.userId comes from authentication middleware)
	  const user = await User.findById(req.userId);
  
	  if (!user) {
		return res.status(404).json({ success: false, message: "User not found" });
	  }
  
	  if (email && email !== user.email) {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
		  return res.status(400).json({ success: false, message: "Email is already in use" });
		}
		user.email = email;
	  }
  
	  // Update name if provided
	  if (name) {
		user.name = name;
	  }
  
	  // Update password if provided (hash it first)
	  if (password) {
		const hashedPassword = await bcryptjs.hash(password, 10);
		user.password = hashedPassword;
	  }
  
	  // Save the updated user
	  await user.save();
  
	  // Return the updated user information, excluding password
	  res.status(200).json({
		success: true,
		message: "Profile updated successfully",
		user: {
		  ...user._doc,
		  password: undefined,
		},
	  });
	} catch (error) {
	  console.log("Error in updateProfile", error);
	  res.status(500).json({ success: false, message: "Server error" });
	}
  };
  // Feedback submission controller
export const feedback = async (req, res) => {
	console.log("feedback req: ", req)
  
	try {
		const { name, message } = req.body;

		// Create a new feedback entry
		const feedback = new Feedback2({
			name,
			message
		});

		await feedback.save(); // Save to database

		res.status(201).json({ message: 'Feedback submitted successfully!' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error submitting feedback.' });
	}
  };
  
  //delete profile

  export const deleteUser = async (req, res) => {
	const { id } = req.params;
  
	try {
	  // Find and delete the user by ID
	  const deletedUser = await User.findOneAndDelete({email:id});
  
	  if (!deletedUser) {
		return res.status(404).json({ message: "User not found" });
	  }
  
	  res.status(200).json({ message: "User successfully deleted" });
	} catch (error) {
	  res.status(500).json({ message: "Error deleting user", error: error.message });
	}
  };