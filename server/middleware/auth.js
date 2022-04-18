import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    try {
        const token = req.header.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500; //if >500, it is google auth

        let decodedData;
        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'SECRETKEY');
            req.userId = decodedData?.id;
        }
        else {
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        console.log(error);
    }
};

export default auth;