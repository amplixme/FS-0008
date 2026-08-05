import { useEffect, useState } from "react";
import { Link } from "react-router";
import Alert from "../components/ui/Alert";
import ImageUpload from "../components/common/ImageUpload";
import Spinner from "../components/common/Spinner";
import useAuth from "../hooks/useAuth";
import { getProfile, updateProfile } from "../services/user.service";

function EditProfile() {
  const { user, updateUser } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    avatarUrl: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      if (!user?.id) {
        setError("No se pudo identificar al usuario.");
        setIsLoading(false);
        return;
      }

      try {
        const profile = await getProfile(user.id);

        if (isMounted) {
          setFormData({
            name: profile.name || "",
            bio: profile.bio || "",
            avatarUrl: profile.avatarUrl || "",
          });
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSaving(true);
    setError("");
    setSuccess("");

    try {
      const updatedProfile = await updateProfile({
        name: formData.name.trim(),
        bio: formData.bio.trim() || null,
        avatarUrl: formData.avatarUrl || null,
      });

      setFormData({
        name: updatedProfile.name || "",
        bio: updatedProfile.bio || "",
        avatarUrl: updatedProfile.avatarUrl || "",
      });

      updateUser(updatedProfile);
      setSuccess("Perfil actualizado correctamente.");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div className="pt-28">
        <Spinner icon="progress_activity" message="Cargando perfil..." />
      </div>
    );
  }

  return (
    <main className="pt-28 pb-20 max-w-2xl mx-auto px-6">
      <section className="bg-surface-container-lowest rounded-2xl p-8">
        <h1 className="text-3xl font-extrabold text-on-surface">
          Editar perfil
        </h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <ImageUpload
            id="avatar-upload"
            value={formData.avatarUrl}
            onChange={(avatarUrl) => {
              setFormData((currentData) => ({
                ...currentData,
                avatarUrl: avatarUrl || "",
              }));
              setError("");
              setSuccess("");
            }}
            alt="Vista previa del avatar"
            aspectRatio="aspect-square max-w-64"
            recommendation="JPG, PNG o WEBP. Máximo 5 MB"
          />

          <label className="block">
            <span className="text-sm font-semibold text-on-surface">
              Nombre
            </span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="mt-1 w-full rounded-lg border border-outline-variant px-3 py-2"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-on-surface">
              Biografía
            </span>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              maxLength={200}
              rows={5}
              className="mt-1 w-full rounded-lg border border-outline-variant px-3 py-2"
            />
            <span className="mt-1 block text-right text-sm text-outline">
              {formData.bio.length}/200
            </span>
          </label>

          <Alert type="error" message={error} />
          <Alert type="success" message={success} />

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={isSaving || !formData.name.trim()}
              className="px-5 py-2 bg-primary text-on-primary font-bold rounded-full disabled:opacity-60"
            >
              {isSaving ? "Guardando..." : "Guardar cambios"}
            </button>

            <Link
              to={`/perfil/${user?.id}`}
              className="px-5 py-2 border border-outline rounded-full font-bold"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}

export default EditProfile;