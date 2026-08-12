import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../prisma.client.js", () => ({
  default: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}));

vi.mock("bcrypt", () => ({
  default: {
    hash: vi.fn(),
    compare: vi.fn(),
  },
}));

vi.mock("jsonwebtoken", () => ({
  default: {
    sign: vi.fn(),
  },
}));

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prisma.client.js";
import authService from "./auth.service.js";

describe("authService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.JWT_SECRET = "test-secret";
  });

  describe("createUser", () => {
    it("registers a new user successfully", async () => {
      const userData = {
        name: "Ada Lovelace",
        email: "ada@example.com",
        password: "Password123!",
      };
      const createdUser = {
        id: 1,
        name: userData.name,
        email: userData.email,
        createdAt: new Date("2026-08-11T00:00:00.000Z"),
      };

      prisma.user.findUnique.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue("hashed-password");
      prisma.user.create.mockResolvedValue(createdUser);

      await expect(authService.createUser(userData)).resolves.toEqual(createdUser);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: userData.email },
      });
      expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, 10);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          name: userData.name,
          email: userData.email,
          password: "hashed-password",
          role: "USER",
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      });
    });

    it("rejects registration when the email already exists", async () => {
      prisma.user.findUnique.mockResolvedValue({ id: 1 });

      await expect(
        authService.createUser({
          name: "Ada Lovelace",
          email: "ada@example.com",
          password: "Password123!",
        }),
      ).rejects.toMatchObject({ status: 409 });

      expect(bcrypt.hash).not.toHaveBeenCalled();
      expect(prisma.user.create).not.toHaveBeenCalled();
    });
  });

  describe("loginUser", () => {
    const storedUser = {
      id: 1,
      name: "Ada Lovelace",
      email: "ada@example.com",
      password: "stored-hash",
      role: "USER",
    };

    it("logs in successfully and returns a token and safe user data", async () => {
      prisma.user.findUnique.mockResolvedValue(storedUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("signed-token");

      await expect(
        authService.loginUser({
          email: storedUser.email,
          password: "Password123!",
        }),
      ).resolves.toEqual({
        token: "signed-token",
        user: {
          id: storedUser.id,
          email: storedUser.email,
          name: storedUser.name,
          role: storedUser.role,
        },
      });

      expect(bcrypt.compare).toHaveBeenCalledWith("Password123!", storedUser.password);
      expect(jwt.sign).toHaveBeenCalledWith(
        {
          userId: storedUser.id,
          email: storedUser.email,
          name: storedUser.name,
          role: storedUser.role,
        },
        "test-secret",
        { expiresIn: "24h" },
      );
    });

    it("rejects login when the password is incorrect", async () => {
      prisma.user.findUnique.mockResolvedValue(storedUser);
      bcrypt.compare.mockResolvedValue(false);

      await expect(
        authService.loginUser({
          email: storedUser.email,
          password: "wrong-password",
        }),
      ).rejects.toMatchObject({ status: 401 });

      expect(jwt.sign).not.toHaveBeenCalled();
    });

    it("rejects login when the user does not exist", async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      bcrypt.compare.mockResolvedValue(false);

      await expect(
        authService.loginUser({
          email: "missing@example.com",
          password: "Password123!",
        }),
      ).rejects.toMatchObject({ status: 401 });

      expect(bcrypt.compare).toHaveBeenCalledWith(
        "Password123!",
        expect.any(String),
      );
      expect(jwt.sign).not.toHaveBeenCalled();
    });
  });
});
