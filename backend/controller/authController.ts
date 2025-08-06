import { Request, Response } from "express";
import { LoginDto, RegisterDto } from "../dtos/authDto";
import { loginService, registerService } from "../services/authService";
import chalk from "chalk";

const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as LoginDto;

    const response = await loginService({ email, password });

    return res.json(response);
  } catch (error) {
    console.error(chalk.bgRed("Login controller error:", error));
    return res.json({
      message: "Login failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const Register = async (req: Request, res: Response) => {
  try {
    let { fullname, email, password, country, phoneNumber, address, role } =
      req.body as RegisterDto;

    const formatingData = {
      fullname: fullname.trim(),
      email: email.toLowerCase().trim(),
      password: password.trim(),
      country: country.trim(),
      phoneNumber: phoneNumber ? phoneNumber.trim() : "",
      address: address ? address.trim() : "",
      role: role.trim(),
    };

    const response = await registerService(formatingData);

    return res.json(response);
  } catch (error) {
    console.error(chalk.bgRed("Register controller error:", error));
    return res.json({
      message: "Register failed",
      status: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

module.exports = {
  Login,
  Register,
};
