import { Request, Response, query } from "express";
import connection from "../db/connection";
import bcrypt from "bcrypt";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({
      where: { iduser: id },
    });

    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({
      msg: "Error retrieving user",
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { login, password } = req.body;
  try {
    const user: any = await User.findOne({
      where: {
        [Op.or]: [{ username: login }, { email: login }],
      },
    });

    if (!user) {
      return res.status(400).json({
        msg: `No existe un usuario con el nombre o correo ${login}`,
      });
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(400).json({
        msg: "Password Incorrecta",
      });
    }

    const token = jwt.sign(
      {
        iduser: user.iduser,
        username: user.username,
        type: user.type,
      },
      process.env.SECRET_KEY ?? "^H:E{Ll",
      { expiresIn: '3h' }
    );

    res.json({ token });
  } catch (error) {
    console.error(`Login error: `, error);
    res.status(500).json({
      msg: "Ocurrió un error al intentar iniciar sesión",
    });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const [results, metadata] = await connection.query("SELECT * FROM users");
    res.json(results);
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({
      msg: "Error retrieving users",
    });
  }
};

// Define the isValidPassword function outside of the postUser function
function isValidPassword(password: string): boolean {
  const hasMinLength = password.length >= 8;
  const hasSpecialChars = /[^A-Za-z0-9]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumbers = /\d/.test(password);
  return hasMinLength && hasSpecialChars && hasUpperCase && hasNumbers;
}

export const signInUser = async (req: Request, res: Response) => {
  const { fullname, username, email, password, type, position } = req.body;
  try {
    const userExistsEmail = await User.findOne({ where: { email: email } });
    const userExistsUsername = await User.findOne({
      where: { username: username },
    });
    if (userExistsEmail) {
      return res.status(400).json({
        msg: `Ya existe un usuario con el correo ${email}`,
      });
    }
    if (userExistsUsername) {
      return res.status(400).json({
        msg: `Ya existe un usuario con el username ${username}`,
      });
    }
    if (!/.*@skam\.com$/.test(email)) {
      return res.status(400).json({
        msg: `Este correo ${email} no cumple con los estandares de la organización`,
      });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({
        msg: "La contraseña no cumple con los requisitos de seguridad",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      fullname,
      username,
      email,
      password: hashedPassword,
      type,
      position,
    });

    res.json({
      msg: `Usuario ${fullname} creado exitosamente`,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Ocurrió un error al crear el usuario",
    });
  }
};

export const putUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        msg: "User not found",
        id: id,
      });
    }
    if (updateData.hasOwnProperty("password") && updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    await user.update(updateData);
    res.json({
      msg: "User updated",
      user: user,
    });
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({
      msg: "Error updating user",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await User.destroy({
      where: { iduser: id },
    });

    if (result === 0) {
      return res.status(404).json({
        msg: "User not found",
        id: id,
      });
    }

    res.json({
      msg: "User deleted successfully",
    });
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({
      msg: "Error deleting user",
    });
  }
};
