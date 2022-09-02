import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()


let verifyTocken = (req, res, next) => {
    let token = req.body.accessToken;
    if (!token) {
        return res.status(401).json("missing token")
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
        return res.status(403).json("your are not authenticated")
    }
}

let verifyAdmin = (req, res, next) => {
    verifyTocken(req, res, () => {
        if (req.user.isAdmin === true) {
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
        console.log(req.query, req.user.id)
        if (req.user.isAdmin === true || req.params.id === req.user.id) {
            next();

        }
        else {
            return res.status(403).json("your are not authenticated ss")
        }
    }
    )
}

module.exports = { verifyTocken, verifyAdmin, verifyUser }