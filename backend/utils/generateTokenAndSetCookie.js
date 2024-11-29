import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId, googleId = null) => {
	// Create token payload
	const payload = { userId };
	if (googleId) {
		payload.googleId = googleId; // Include Google ID if available
	}

	// Generate token with the payload
	const token = jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: "7d", // Token expires in 7 days
	});

	// Set token in cookie
	res.cookie("token", token, {
		httpOnly: true, // Prevents JavaScript access to the cookie
		secure: process.env.NODE_ENV === "production", // Secure in production
		sameSite: "strict", // Protects against CSRF
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
	});

	return token; // Return the token if needed for further processing
};
