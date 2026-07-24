import { categoryService } from "../services/category.service.js";
import { success } from "../utils/response.js"; 

export const categoryController = {
  async getAll(req, res, next) {
    try {
      const categories = await categoryService.getAll();
      return success(res, categories, 200);
    } catch (error) {
      next(error);
    }
  },

  async create(req, res, next) {
  try {
    const { name, slug } = req.body;

      const newCategory = await categoryService.create({ name, slug });
      return success(res, newCategory, 201);
    } catch (error) {
      next(error);
    }
  },

 
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

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await categoryService.delete(id);
      return success(res, { message: "Categoría eliminada correctamente" }, 200);
    } catch (error) {
      next(error); 
    }
  }
};
