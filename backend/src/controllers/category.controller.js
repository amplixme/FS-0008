import { categoryService } from "../services/category.service.js";
import { success } from "../utils/response.js"; // Importación requerida por Mati

export const categoryController = {
  // GET /api/categories - Listar todas (Pública)
  async getAll(req, res, next) {
    try {
      const categories = await categoryService.getAll();
      return success(res, categories, 200);
    } catch (error) {
      next(error);
    }
  },

  // POST /api/categories - Crear (Admin)
  async create(req, res, next) {
    try {
      const { name, slug } = req.body;
      if (!name || !slug) {
        // Nota: Si prefieres que las validaciones de campos vacíos también pasen por el middleware, 
        // puedes lanzar un error con status 400. De momento se mantiene el res.status(400) directo si así lo deseas.
        return res.status(400).json({ error: "El nombre y el slug son obligatorios" });
      }

      const newCategory = await categoryService.create({ name, slug });
      return success(res, newCategory, 201);
    } catch (error) {
      next(error);
    }
  },

  // PUT /api/categories/:id - Actualizar (Admin)
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name, slug } = req.body;

      const updatedCategory = await categoryService.update(id, { name, slug });
      return success(res, updatedCategory, 200);
    } catch (error) {
      next(error);
    }
  },

  // DELETE /api/categories/:id - Eliminar (Admin)
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await categoryService.delete(id);
      return success(res, { message: "Categoría eliminada correctamente" }, 200);
    } catch (error) {
      // El middleware lee err.status o err.statusCode gracias a la última línea de tu errorHandler:
      // const status = err.status || 500;
      next(error); 
    }
  }
};