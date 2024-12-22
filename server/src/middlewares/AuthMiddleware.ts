import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"

const authMiddleware = (req:Request, res:Response, next:NextFunction) => {
    const authHeader = req.headers.authorization
    if(authHeader === null || authHeader === undefined) {
        return res.status(401).json({status:401, message: "Unauthorized" })
    }
    const token = authHeader.split(" ")[1]

    //Verifying the token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) {
            return res.status(403).json({status:403, message: "Invalid token" })
        }
        req.user = user as AuthUser;
        next()
    })
}

export default authMiddleware