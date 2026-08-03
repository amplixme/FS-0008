import * as userService from "../services/user.service.js";
import { success } from "../utils/response.js";

export const getProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const profile = await userService.getPublicProfile(id);

    return success(res, profile, 200);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, bio, avatarUrl } = req.body;

    const updatedProfile = await userService.updateProfile(userId, {
      name: name,
      bio: bio,
      avatarUrl: avatarUrl,
    });

    return success(res, updatedProfile, 200);
  } catch (error) {
    next(error);
  }
};
