// import jwt from 'jsonwebtoken'

// const userAuth = async (req, res, next) => {
//     const { token } = req.headers;

//     if (!token) {
//         return res.json({ success: false, message: 'Not Authorized. Login again' })
//     }

//     try {
//         const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)

//         if (tokenDecode.id) {
//            req.userId = tokenDecode.id;
//         } else {
//             return res.json({ success: false, message: 'Not Authorized. Login again' })
//         }
//         next();

//     } catch (error) {
//         res.json({ success: false, message: error.message })
//     }
// }

// export default userAuth;


import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.json({ success: false, message: "Not Authorized. Login again" });
    }

    const token = authHeader.split(" ")[1]; // Extract TOKEN from "Bearer TOKEN"

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id) {
      return res.json({ success: false, message: "Not Authorized. Login again" });
    }

    req.userId = decoded.id;
    next();

  } catch (error) {
    return res.json({ success: false, message: "Not Authorized. Login again" });
  }
};

export default userAuth;
