import { create } from "zustand";
import axios from "axios";
import { Navigate } from "react-router-dom";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:3000/api/auth" : "/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    message: null,

    submit: async (name, message) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/feedback`, { name, message });
            set({ message: "Feedback submitted successfully", isLoading: false });
        } catch (error) {
            set({
                error: error.response?.data?.message || "Error submitting feedback",
                isLoading: false,
            });
            throw error;
        }
    },

    signup: async (email, password, name) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/signup`, { email, password, name });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch (error) {
            set({ error: error.response.data.message || "Error signing up", isLoading: false });
            throw error;
        }
    },

    setPass: async (email , password) => {
        set({isLoading:true , error: null});
        try {
            const response = await axios.post(`${API_URL}/setPass` , {email , password});
            set({user: response.data.user , isLoading:false});
        }
        catch (error) {
            set({error: error.response.data.message || "Error setting up password", isLoading: false });
            throw error;
        }
    },

    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });
            set({
                isAuthenticated: true,
                user: response.data.user,
                error: null,
                isLoading: false,
            });
        } catch (error) {
            set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
            throw error;
        }
    },

    googleLogin: async (idToken) => {
		set({ isLoading: true, error: null });
		try {
			// Use the idToken to authenticate the user
			const response = await axios.post(`${API_URL}/googleAuth`, {
				token: idToken, // Pass the idToken correctly
			});
	
			set({
				isAuthenticated: true,
				user: response.data.user,
				error: null,
				isLoading: false,
			});
		} catch (error) {
			set({ error: error.response?.data?.message || "Error signing up with Google", isLoading: false });
			throw error;
		}
	},
	
	
	
	googleSignup: async (googleToken) => {
		set({ isLoading: true, error: null });
		try {
			// Send the Google token directly to your backend for verification
			const response = await axios.post(`${API_URL}/googleAuth`, { token: googleToken });
	
			// Assuming the backend returns user data in response
			set({
				isAuthenticated: true,
				user: response.data.user, // Make sure your backend sends the user object
				error: null,
				isLoading: false,
			});
		} catch (error) {
			set({ error: error.response?.data?.message || "Error signing up with Google", isLoading: false });
			throw error;
		}
	},
	
	
	// Helper function to fetch the profile information from Google
	// fetchGoogleProfile: async (token) => {
	// 	const res = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`);
	// 	return res.data;
	// },
	

    logout: async () => {
        set({ isLoading: true, error: null });
        try {
            await axios.post(`${API_URL}/logout`);
            set({ user: null, isAuthenticated: false, error: null, isLoading: false });
            Navigate("/");
        } catch (error) {
            set({ error: "Error logging out", isLoading: false });
            throw error;
        }
    },

    verifyEmail: async (code) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/verify-email`, { code });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
            return response.data;
        } catch (error) {
            set({ error: error.response.data.message || "Error verifying email", isLoading: false });
            throw error;
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/check-auth`);
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
        } catch (error) {
            set({ error: null, isCheckingAuth: false, isAuthenticated: false });
        }
    },

    forgotPassword: async (email) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/forgot-password`, { email });
            set({ message: response.data.message, isLoading: false });
        } catch (error) {
            set({
                isLoading: false,
                error: error.response.data.message || "Error sending reset password email",
            });
            throw error;
        }
    },

    resetPassword: async (token, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
            set({ message: response.data.message, isLoading: false });
        } catch (error) {
            set({
                isLoading: false,
                error: error.response.data.message || "Error resetting password",
            });
            throw error;
        }
    },

    editProfile: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.put(`${API_URL}/profile`, { name, email, password });
            set({ user: response.data.user, isLoading: false, error: null });
            alert("Profile updated successfully!");
            
        } catch (error) {
            set({ error: error.response?.data?.message || "Error updating profile", isLoading: false });
            alert("Failed to update profile.");
            throw error;
        }
    },

    deleteUser: async (email) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.delete(`${API_URL}/deleteUser/${email}`);
          
        } catch (error) {
            set({ error: error.response?.data?.message || "Error deleting profile", isLoading: false });
            throw error;
        }
    }
}));
