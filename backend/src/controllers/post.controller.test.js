import { describe, it, expect, vi, beforeEach } from "vitest";
import * as postService from "../services/post.service.js";
import { success } from "../utils/response.js";
import { update, remove } from "./post.controller.js";

// Mockeamos el servicio y el helper de respuesta: 
// En esta parte solo probamos la lógica de autorización del controller, no el service en sí.
vi.mock("../services/post.service.js");
vi.mock("../utils/response.js");

describe("post.controller", () => {
  let req, res, next;

  beforeEach(() => {
    vi.clearAllMocks();
    req = { params: { id: "1" }, body: {}, user: { id: 1, role: "USER" } };
    res = {};
    next = vi.fn();
  });

  describe("update", () => {
    it("devuelve 404 cuando el post no existe", async () => {
      postService.getPostById.mockResolvedValue(null);

      await update(req, res, next);

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({ status: 404 }),
      );
      expect(postService.updatePost).not.toHaveBeenCalled();
    });

    it("devuelve 403 cuando el usuario no es el autor ni ADMIN", async () => {
      postService.getPostById.mockResolvedValue({ id: 1, authorId: 2 });
      req.user = { id: 1, role: "USER" };

      await update(req, res, next);

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({ status: 403 }),
      );
      expect(postService.updatePost).not.toHaveBeenCalled();
    });

    it("permite actualizar cuando el usuario es el autor", async () => {
      postService.getPostById.mockResolvedValue({ id: 1, authorId: 1 });
      postService.updatePost.mockResolvedValue({ id: 1, title: "Actualizado" });
      req.user = { id: 1, role: "USER" };
      req.body = { title: "Actualizado" };

      await update(req, res, next);

      expect(postService.updatePost).toHaveBeenCalled();
      expect(success).toHaveBeenCalledWith(
        res,
        { id: 1, title: "Actualizado" },
        200,
      );
      expect(next).not.toHaveBeenCalled();
    });

    it("permite actualizar cuando el usuario es ADMIN aunque no sea el autor", async () => {
      postService.getPostById.mockResolvedValue({ id: 1, authorId: 2 });
      postService.updatePost.mockResolvedValue({
        id: 1,
        title: "Actualizado por admin",
      });
      req.user = { id: 1, role: "ADMIN" };

      await update(req, res, next);

      expect(postService.updatePost).toHaveBeenCalled();
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("remove", () => {
    it("devuelve 404 cuando el post no existe", async () => {
      postService.getPostById.mockResolvedValue(null);

      await remove(req, res, next);

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({ status: 404 }),
      );
      expect(postService.deletePost).not.toHaveBeenCalled();
    });

    it("devuelve 403 cuando el usuario no es el autor ni ADMIN", async () => {
      postService.getPostById.mockResolvedValue({ id: 1, authorId: 2 });
      req.user = { id: 1, role: "USER" };

      await remove(req, res, next);

      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({ status: 403 }),
      );
      expect(postService.deletePost).not.toHaveBeenCalled();
    });

    it("elimina el post cuando el usuario es el autor", async () => {
      postService.getPostById.mockResolvedValue({ id: 1, authorId: 1 });
      postService.deletePost.mockResolvedValue({ id: 1 });
      req.user = { id: 1, role: "USER" };

      await remove(req, res, next);

      expect(postService.deletePost).toHaveBeenCalledWith("1");
      expect(success).toHaveBeenCalledWith(
        res,
        { message: "Post eliminado con éxito" },
        200,
      );
    });
  });
});
