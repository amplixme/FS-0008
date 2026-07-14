import ToggleSwitch from "../../components/ui/ToggleSwitch";

function CreatePost() {
	return (
		<div className="pt-28 pb-20 max-w-7xl mx-auto px-6">
      <main className="pt-12 pb-32 px-6 max-w-[800px] mx-auto">
        <form className="flex flex-col gap-8" noValidate>
          <div>
            <label htmlFor="title" className="sr-only">
              Título del artículo
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Título del artículo"
              className="w-full bg-transparent border-none p-0 text-4xl md:text-5xl font-extrabold tracking-tight placeholder:text-on-surface-variant/30 focus:ring-0 leading-tight text-on-surface"
            />
          </div>

          <div>
            <label htmlFor="content" className="sr-only">
              Contenido del artículo
            </label>
            <textarea
              id="content"
              name="content"
              rows={14}
              placeholder="Escribe tu artículo aquí..."
              className="w-full bg-transparent border-none p-0 text-lg leading-relaxed text-on-surface placeholder:text-outline/40 focus:ring-0 resize-y"
            />
          </div>

          <ToggleSwitch
            name="published"
            label="Publicar ahora"
            description="Si lo dejas desactivado, el artículo se guarda como borrador."
          />
        </form>
      </main>
		</div>
	)
}

export default CreatePost;
