const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

//signup endpoint
exports.signup = async(req, res) => {
    const { email, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    // Only allow valid roles, fallback to default if invalid
    const validRoles = ["Admin", "Blogger"];
    const userRole = validRoles.includes(role) ? role : undefined;
    const user = await User.create({ email, password: hashed, ...(userRole && { role: userRole }) });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
    res.json({ token });
};

//login endpoint

exports.login = async (req, res) =>{
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user) return res.status(404).json({message: "User not found"});

    const match = await bcrypt.compare(password , user.password);
    if(!match)  return res.status(401).json({message: "incorrect password"});

    const token = jwt.sign({ id: user._id , role: user.role}, process.env.JWT_SECRET, {
        expiresIn : '1h'
    });
    res.json({token});

};