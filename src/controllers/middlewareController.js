import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()


let verifyTocken = (req, res, next) => {
    let token = req.headers.token;
    if (!token) {
        return res.status(401).json("your are not authenticated")
    }
    if (token) {
        let accessToken = token.split(' ')[1];
        jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
            if (err) {
                return res.status(403).json("Token is not valid")
            }
            else {
                req.user = user
                next()
            }
        })
    }
    else {
        return res.status(403).json("sai")
    }
}

let verifyAdmin = (req, res, next) => {
    verifyTocken(req, res, () => {
        if (req.user.isAdmin === true) {
            console.log('may la admin')
            next();
        }
        else {
            return res.status(403).json("your are not authenticated")
        }
    }
    )
}

let verifyUser = (req, res, next) => {
    verifyTocken(req, res, () => {
        if (req.user.isAdmin === true || req.params.id === req.user.id) {
            next();

        }
        else {
            return res.status(403).json("your are not authenticated")
        }
    }
    )
}

module.exports = { verifyTocken, verifyAdmin, verifyUser }