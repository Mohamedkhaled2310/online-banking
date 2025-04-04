import User from "../model/User.js";
import BankAccount from "../model/BankAccount.js";


// Get user profile based on the JWT (email already exists in req.user)
export const getProfile = async (req, res) => {
    const { email } = req.user; 
    console.log(email);
    try {
        const { email } = req.user;  // Get email from the authenticated user

        // Find the user by email
        const user = await User.findOne({ email }).select("-password");
        if (!user) {
            return res.status(404).json({ statusCode: 404, message: "User not found" });
        }

        // Fetch the associated bank account
        const bankAccount = await BankAccount.findOne({ user: user._id });
        if (!bankAccount) {
            return res.status(404).json({ statusCode: 404, message: "Bank account not found" });
        }

        // Return the profile data
        const profileData = {
            statusCode: 200,
            message: "Profile fetched successfully",
            data: {
                name: user.name,
                email: user.email,
                balance: bankAccount.balance,
            }
        };

        res.status(200).json(profileData);
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: "Server error", error: error.message });
    }
};

// Update user profile (name and password)
export const updateProfile = async (req, res) => {
    try {
        const { email } = req.user;  // Get email from the authenticated user
        const { name, password } = req.body; // Get the updated data

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ statusCode: 404, message: "User not found" });
        }

        // If the name is provided, update it
        if (name) user.name = name;

        // If password is provided, check if the current password matches, then update
        if (password) {
            user.password = password;
            }
        await user.save();
        res.status(200).json({ statusCode: 200, message: "Profile updated successfully" });

    } catch (error) {
        res.status(500).json({ statusCode: 500, message: "Server error", error: error.message });
    }
};
