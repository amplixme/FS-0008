import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import Alert from "../components/ui/Alert";
import ImageUpload from "../components/common/ImageUpload";
import Spinner from "../components/common/Spinner";
import useAuth from "../hooks/useAuth";
import { editProfileSchema } from "../schemas/editProfile.schema";
import { getProfile, updateProfile } from "../services/user.service";
import ProgressActivityIcon from "~icons/material-symbols/progress-activity";

function EditProfile() {
  const { user, updateUser } = useAuth();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: "",
      bio: "",
      avatarUrl: "",
    },
  });

  const bio =
    useWatch({
      control,
      name: "bio",
    }) || "";

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
          reset({
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
  }, [reset, user?.id]);

  function clearMessages() {
    setError("");
  }

  async function onSubmit(formData) {
    setError("");

    try {
      const updatedProfile = await updateProfile({
        name: formData.name,
        bio: formData.bio || null,
        avatarUrl: formData.avatarUrl || null,
      });

      updateUser(updatedProfile);

      navigate(`/perfil/${updatedProfile.id ?? user.id}`, {
        state: {
          successMessage: "Perfil actualizado correctamente.",
        },
      });
    } catch (err) {
      setError(err.message);
    }
  }

  if (isLoading) {
    return (
      <div className="pt-28">
        <Spinner icon={ProgressActivityIcon} message="Cargando perfil..." />
      </div>
    );
  }

  return (
    <main className="pt-28 pb-20 max-w-2xl mx-auto px-6">
      <section className="bg-surface-container-lowest rounded-2xl p-8">
        <h1 className="text-3xl font-extrabold text-on-surface">
          Editar perfil
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-6"
          noValidate
        >
          <Controller
            name="avatarUrl"
            control={control}
            render={({ field }) => (
              <ImageUpload
                id="avatar-upload"
                value={field.value}
                onChange={(avatarUrl) => {
                  field.onChange(avatarUrl || "");
                  clearMessages();
                }}
                alt="Vista previa del avatar"
                aspectRatio="aspect-square max-w-64"
                recommendation="JPG, PNG o WEBP. Máximo 5 MB"
              />
            )}
          />

          {errors.avatarUrl && (
            <p role="alert" className="text-sm text-error">
              {errors.avatarUrl.message}
            </p>
          )}

          <label className="block">
            <span className="text-sm font-semibold text-on-surface">
              Nombre
            </span>
            <input
              type="text"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className="mt-1 w-full rounded-lg border border-outline-variant px-3 py-2"
              {...register("name", {
                onChange: clearMessages,
              })}
            />

            {errors.name && (
              <p
                id="name-error"
                role="alert"
                className="mt-1 text-sm text-error"
              >
                {errors.name.message}
              </p>
            )}
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-on-surface">
              Biografía
            </span>
            <textarea
              rows={5}
              aria-invalid={!!errors.bio}
              aria-describedby={errors.bio ? "bio-error" : undefined}
              className="mt-1 w-full rounded-lg border border-outline-variant px-3 py-2"
              {...register("bio", {
                onChange: clearMessages,
              })}
            />

            <span className="mt-1 block text-right text-sm text-outline">
              {bio.length}/200
            </span>

            {errors.bio && (
              <p
                id="bio-error"
                role="alert"
                className="mt-1 text-sm text-error"
              >
                {errors.bio.message}
              </p>
            )}
          </label>

          {error && <Alert type="error" message={error} />}

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 bg-primary text-on-primary font-bold rounded-full disabled:opacity-60"
            >
              {isSubmitting ? "Guardando..." : "Guardar cambios"}
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
