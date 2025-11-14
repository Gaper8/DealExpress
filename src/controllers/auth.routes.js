const { AppError } = require("../utils/errors");
const User = require("../models/User");
const { generateToken } = require("../middleware/authMiddleware");
const { useSyncExternalStore } = require("react");

const registerController = async (req, res, next) => {
  const { username, bio, email, password } = req.body;

  // check if user already exists (pseudo or email)
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });

  if (existingUser) {
    return next(new AppError("Utilisateur déjà existant", 409));
  }

  const user = new User({
    username,
    bio,
    email,
    password,
  });
  await user.save();

  const jwtToken = generateToken(user._id);

  res.status(201).json({
    message: "Utilisateur enregistré avec succès",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      bio: user.bio,
      createdAt: user.createdAt,
    },
    token: jwtToken,
  });
};

const loginController = async (req, res, next) => {
    const { email, password } = req.body;
    const ExistingUser = await User.findOne({email});

    if (!ExistingUser) {
        return next(new AppError("l'utilisateur n'existe pas", 401));
    }

    const passwordMatch = await ExistingUser.comparePassword(password);
    if(!passwordMatch) {
        throw new AppError("Invalid email or password", 400);
    }

    const jwtToken = generateToken(ExistingUser._id);
    return res.status(200).json({
        message: "Login successful",
        user: ExistingUser,
        token: jwtToken
    });
}

const getUserController = async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        message: "User fetched successfully",
        user: user
    });
}

module.exports = { registerController, loginController, getUserController };