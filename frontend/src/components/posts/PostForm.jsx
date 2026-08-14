import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "../../schemas/postSchema";
import { useCategories } from "../../hooks/useCategories";
import ToggleSwitch from "../ui/ToggleSwitch";
import Spinner from "../common/Spinner";
import ErrorMessage from "../common/ErrorMessage";
import ImageUpload from "../common/ImageUpload";
import ProgressActivityIcon from "~icons/material-symbols/progress-activity";
import ErrorIcon from "~icons/material-symbols/error-outline";

function PostForm({ initialValues, onSubmit }) {
  const {
    categories,
    isLoading: categoriesLoading,
    error: categoriesError,
    handleRetry,
  } = useCategories();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      coverImage: null,
      categoryIds: [],
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
        <Controller
          name="coverImage"
          control={control}
          render={({ field }) => (
            <ImageUpload
              key={field.value ?? "empty-cover"}
              id="cover-image-upload"
              value={field.value}
              onChange={field.onChange}
              alt="Vista previa de la portada del artículo"
              recommendation="JPG, PNG o WEBP. Máximo 5 MB"
            />
          )}
        />

        {errors.coverImage && (
          <p role="alert" className="text-sm text-error mt-2">
            {errors.coverImage.message}
          </p>
        )}
      </div>
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

      <fieldset className="flex flex-col gap-3">
        <legend className="text-sm font-semibold text-on-surface mb-1">
          Categorías
        </legend>

        {categoriesLoading && (
          <Spinner
            icon={ProgressActivityIcon}
            message="Cargando categorías..."
          />
        )}

        {!categoriesLoading && categoriesError && (
          <ErrorMessage
            icon={ErrorIcon}
            message="No se pudieron cargar las categorías"
            onRetry={handleRetry}
          />
        )}

        {!categoriesLoading && !categoriesError && (
          // Contenedor que muestra las categorias para seleccionar.
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <label
                key={category.id}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-outline-variant text-sm font-medium text-on-surface-variant cursor-pointer has-checked:border-primary has-checked:bg-primary-fixed has-checked:text-on-primary-fixed transition-colors"
              >
                <input
                  type="checkbox"
                  value={category.id}
                  className="sr-only"
                  {...register("categoryIds")}
                />
                {category.name}
              </label>
            ))}
          </div>
        )}
      </fieldset>

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
