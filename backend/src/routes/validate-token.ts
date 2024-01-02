import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const headerToken = req.headers["authorization"];

  if (headerToken && headerToken.startsWith("Bearer ")) {
    const bearerToken = headerToken.slice(7);

    jwt.verify(bearerToken, process.env.SECRET_KEY ?? "^H:E{Ll", (err, decoded) => {
      if (err) {
        return res.status(401).json({
          msg: "Acceso denegado, token inválidox",
        });
      }
      next();
    });
  } else {
    res.status(401).json({
      msg: "Acceso denegado, token no proporcionado",
    });
  }
};


export default validateToken;
