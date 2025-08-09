import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../db/client.js";

export async function register(req, res) {
  try {
    const { email, password, name, surname } = req.body;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ error: "Email already used" });
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hash, name, surname },
    });
    res
      .status(201)
      .json({
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname,
      });
  } catch (e) {
    res.status(500).json({ error: "Register failed" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname,
      },
    });
  } catch {
    res.status(500).json({ error: "Login failed" });
  }
}
