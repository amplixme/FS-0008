import { describe, it, expect, vi, beforeEach } from "vitest";
import prisma from "../prisma.client.js";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from "./post.service.js";

// Mock Prisma Client
vi.mock("../prisma.client.js", () => ({
  default: {
    post: {
      create: vi.fn(),
      findMany: vi.fn(),
      count: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  },
}));

describe("post.service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createPost", () => {
    it("crea un post y lo devuelve con autor y categorías", async () => {
      const mockPost = {
        id: 1,
        title: "Título",
        content: "Contenido",
        authorId: 1,
        author: { name: "Juan" },
        categories: [],
      };
      prisma.post.create.mockResolvedValue(mockPost);

      const result = await createPost(
        "Título",
        "Contenido",
        1,
        "cover.jpg",
        [1, 2],
      );

      expect(prisma.post.create).toHaveBeenCalledWith({
        data: {
          title: "Título",
          content: "Contenido",
          authorId: 1,
          coverImage: "cover.jpg",
          categories: { connect: [{ id: 1 }, { id: 2 }] },
        },
        include: {
          author: { select: { name: true } },
          categories: { select: { id: true, name: true, slug: true } },
        },
      });
      expect(result).toEqual(mockPost);
    });
  });

  describe("getAllPosts", () => {
    it("devuelve posts paginados con commentCount aplanado y meta correcta", async () => {
      const mockPosts = [
        { id: 1, title: "Post 1", _count: { comments: 3 } },
        { id: 2, title: "Post 2", _count: { comments: 0 } },
      ];
      prisma.post.findMany.mockResolvedValue(mockPosts);
      prisma.post.count.mockResolvedValue(2);

      const result = await getAllPosts({ page: 1, limit: 10 });

      expect(result.posts).toEqual([
        { id: 1, title: "Post 1", commentCount: 3 },
        { id: 2, title: "Post 2", commentCount: 0 },
      ]);
      expect(result.meta).toEqual({
        total: 2,
        page: 1,
        limit: 10,
        totalPages: 1,
      });
    });
  });

  describe("getPostById", () => {
    it("devuelve el post cuando existe", async () => {
      const mockPost = { id: 1, title: "Post 1" };
      prisma.post.findUnique.mockResolvedValue(mockPost);

      const result = await getPostById(1);

      expect(prisma.post.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: 1 } }),
      );
      expect(result).toEqual(mockPost);
    });

    it("devuelve null cuando el post no existe (el 404 se resuelve en el controller)", async () => {
      prisma.post.findUnique.mockResolvedValue(null);

      const result = await getPostById(999);

      expect(result).toBeNull();
    });
  });

  describe("updatePost", () => {
    it("actualiza un post y devuelve los datos actualizados", async () => {
      const mockUpdated = { id: 1, title: "Nuevo título", categories: [] };
      prisma.post.update.mockResolvedValue(mockUpdated);

      const result = await updatePost(
        1,
        "Nuevo título",
        "Nuevo contenido",
        "cover.jpg",
        [1],
      );

      expect(prisma.post.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          title: "Nuevo título",
          content: "Nuevo contenido",
          coverImage: "cover.jpg",
          categories: { set: [{ id: 1 }] },
        },
        include: {
          categories: { select: { id: true, name: true, slug: true } },
        },
      });
      expect(result).toEqual(mockUpdated);
    });

    it("no toca las categorías si categoryIds es undefined", async () => {
      const mockUpdated = { id: 1, title: "Sin cambio de categorías" };
      prisma.post.update.mockResolvedValue(mockUpdated);

      await updatePost(1, "Título", "Contenido", "cover.jpg", undefined);

      const callArgs = prisma.post.update.mock.calls[0][0];
      expect(callArgs.data.categories).toBeUndefined();
    });
  });

  describe("deletePost", () => {
    it("elimina un post por id", async () => {
      const mockDeleted = { id: 1, title: "Post eliminado" };
      prisma.post.delete.mockResolvedValue(mockDeleted);

      const result = await deletePost(1);

      expect(prisma.post.delete).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockDeleted);
    });
  });
});
