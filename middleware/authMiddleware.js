import jwt from 'jsonwebtoken';

// Middleware to protect routes
export const authenticate = (req, res, next) => {

  

   // Skip authentication for specific Query and mutation
   if (req.body.operationName === 'Login' || req.body.operationName === 'Signup') {
    return next(); // Skip authentication for login/signup
  }

  // const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>

  const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YjQzNTc1NjUyOTg4YWNhNGVmZjBjNCIsInVzZXJuYW1lIjoic291cmF2QDEyMyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczOTg4Mzc3NCwiZXhwIjoxNzM5ODg3Mzc0fQ.P3TWiGJLF7Qvn4Ga7cto2lYsoLJFSBPRLMnUr3RCN-I"

  if (!token) {
    return res.status(401).send('Access Denied. No Token Provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info to the request object


    next();
  } catch (error) {
    return res.status(400).send('Invalid Token');
  }
};

// Middleware for role-based access control
export const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).send('Forbidden');
    }
    next();
  };
};




