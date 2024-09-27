import jwt from "jsonwebtoken";
const secret = "rajbirsingh1234";

export async function authenticateuser(req, res, next) {
    // Retrieve token from cookies
    const token = req.cookies["token"]; // Access the token from cookies
    if (!token) {
        return res.status(401).json({ error: "Please authenticate using a valid token" });
    }

    try {
        // Verify the token
        const data = jwt.verify(token, secret);
        req.user = data.user;
        next(); // Pass control to the next middleware
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
}
