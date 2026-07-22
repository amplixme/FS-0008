import { categoryService } from "../services/category.service.js";

export const categoryController = {
  // GET /api/categories - Listar todas (Pública)
  async getAll(req, res) {
    try {
      const categories = await categoryService.getAll();
      return res.status(200).json(categories);
    } catch (error) {
      return res.status(500).json({ error: "Error al obtener las categorías" });
    }
  },

  // POST /api/categories - Crear (Admin)
  async create(req, res) {
    try {
      const { name, slug } = req.body;
      if (!name || !slug) {
        return res.status(400).json({ error: "El nombre y el slug son obligatorios" });
      }

      const newCategory = await categoryService.create({ name, slug });
      return res.status(201).json(newCategory);
    } catch (error) {
      return res.status(500).json({ error: "Error al crear la categoría" });
    }
  },

  // PUT /api/categories/:id - Actualizar (Admin)
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, slug } = req.body;

      const updatedCategory = await categoryService.update(id, { name, slug });
      return res.status(200).json(updatedCategory);
    } catch (error) {
      console.error("ERROR REAL EN UPDATE:", error); // <-- Agrega esta línea
      return res.status(500).json({ error: "Error al actualizar la categoría" });
    }
  },

  // DELETE /api/categories/:id - Eliminar (Admin)
  async delete(req, res) {
    try {
      const { id } = req.params;
      await categoryService.delete(id);
      return res.status(200).json({ message: "Categoría eliminada correctamente" });
    } catch (error) {
      if (error.statusCode === 409) {
        return res.status(409).json({ error: "No se puede eliminar una categoría con posts asociados" });
      }
      return res.status(500).json({ error: "Error al eliminar la categoría" });
    }
  }
};
