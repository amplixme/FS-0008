import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "../../schemas/postSchema";
import ToggleSwitch from "../ui/ToggleSwitch";

function PostForm({ initialValues, onSubmit }) {
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
    values: initialValues,
  });

  return (
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
        {isSubmitting ? "Guardando..." : "Publicar"}
      </button>
    </form>
  );
}

export default PostForm;
