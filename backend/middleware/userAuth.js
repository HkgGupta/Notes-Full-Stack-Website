import jwt from "jsonwebtoken";

export const userCheckAuth = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (token) {
            token = token.split(" ")[1];
            const USER_SECRET_KEY = process.env.USER_SECRET_KEY;

            const verify = await jwt.verify(token, USER_SECRET_KEY);

            if (verify) {
                req.userInfo = verify.credential;
                next();
            } else {
                return res.status(401).json({
                    error_message: "Unauthorized"
                });
            }
        } else {
            return res.status(401).json({
                error_message: "Unauthorized"
            });
        }
    } catch (error) {
        return res.status(401).json({
            error_message: "Auth error " + error
        });
    }
};