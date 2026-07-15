import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { postSchema } from "../../schemas/postSchema";
import { create } from "../../services/post.service";
import Alert from "../../components/ui/Alert";
import ToggleSwitch from "../../components/ui/ToggleSwitch";

function CreatePost() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: { 
      title: "", 
      content: "", 
      // published: false 
    },
  });

  const onSubmit = async (formData) => {
    setServerError(null);
    try {
      const post = await create(formData);
      navigate(`/posts/${post.id}`);
    } catch (err) {
      setServerError(err.message);
    }
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-6">
      <main className="pt-12 pb-32 px-6 max-w-[800px] mx-auto">
        {serverError && (
          <div className="mb-8">
            <Alert type="error" message={serverError} />
          </div>
        )}

        <form
          className="flex flex-col gap-8"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div>
            <label htmlFor="title" className="sr-only">
              Título del artículo
            </label>
            <input
              id="title"
              type="text"
              placeholder="Título del artículo"
              className="w-full bg-transparent border-none p-0 text-4xl md:text-5xl font-extrabold tracking-tight placeholder:text-on-surface-variant/30 focus:ring-0 leading-tight text-on-surface"
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? "title-error" : undefined}
              {...register("title")}
            />
            {errors.title && (
              <p id="title-error" className="text-sm text-error mt-2">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="content" className="sr-only">
              Contenido del artículo
            </label>
            <textarea
              id="content"
              rows={14}
              placeholder="Escribe tu artículo aquí..."
              className="w-full bg-transparent border-none p-0 text-lg leading-relaxed text-on-surface placeholder:text-outline/40 focus:ring-0 resize-y"
              aria-invalid={!!errors.content}
              aria-describedby={errors.content ? "content-error" : undefined}
              {...register("content")}
            />
            {errors.content && (
              <p id="content-error" className="text-sm text-error mt-2">
                {errors.content.message}
              </p>
            )}
          </div>

          {/*
            El backend aun no persiste este campo.
            createPostSchema (backend) solo valida title y content, por lo que
            "published" se descarta silenciosamente al llegar al servidor.
            El toggle ya funciona correctamente del lado del frontend (el valor
            viaja bien en el payload) - falta que el schema del backend lo declare
            y que el service lo guarde en la base.
          */}

          <ToggleSwitch
            label="Publicar ahora"
            description="Si lo dejas desactivado, el artículo se guarda como borrador."
            {...register("published")}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="self-start px-8 py-3 bg-primary text-on-primary font-bold rounded-full shadow-lg shadow-primary/20 hover:bg-primary-container active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Publicando..." : "Publicar"}
          </button>
        </form>
      </main>
    </div>
  );
}

export default CreatePost;