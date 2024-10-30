const jwt = require("jsonwebtoken");


const auth=(req,res,next)=>{
   const token = req.cookies.token;
   if(!token){
    return res.status(401).send({
        success : false,
        message : "Unauthorized"
    })
   }

   try {
    const decoded = jwt.verify(token , process.env.JWT_KEY);
    req.user = decoded
    next()
   } catch (error) {
    return res.status(401).send({
        success : false,
        message : "unauthorized"
    })
   }
}

module.exports = auth