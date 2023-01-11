import User from "../models/User.js";

/**get user data */
export const getUser = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        const {_id, userName, email, picturePath, cases} = user;
        res.status(200).json({_id, userName, email, picturePath, cases});
    } else {
        res.status(404);
        throw new Error("User not found");
    }
};

/**get log in status */
export const loginStatus = async (req, res) => {
    const token = req.cookies.token;
    if(!token) {
        res.json(false);
    }

    //verify token
    const verified = jwt.verify(token, procee.env.JWT_SECRET);
    if (verified) {
        res.json(true);
    } else {
        res.json(false);
    }
};

/*export const getUserWitnesses = async (req, res) => {
    try {
        const { id } = req.params; 
        const user = await User.findById(id);
        const witnesses = await Promise
            .all(user.witnesses.map((id) => User.findById(id)))
        const formattedWitnesses = witnesses.map(
            ({_id, userName, picturePath}) => {
                return {_id, userName, picturePath}
            }
        );
        res.status(200).json(formattedWitnesses);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}*/