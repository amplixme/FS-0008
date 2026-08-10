import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PostCard from "./PostCard";
import { MemoryRouter } from "react-router";

const mockPost = {
  id: 1,
  coverImage: "https://placehold.co/600x400",
  published: false,
  title: "Refactorización de código legacy sin morir en el intento",
  author: {
    id: 6,
    name: "Standard User",
    avatarUrl: "https://placehold.co/32x32",
  },
  createdAt: "2026-03-20T19:00:00.000Z",
  updatedAt: "2026-08-03T12:04:20.576Z",
  commentCount: 4,
  categories: [
    {
      id: "20460158-11c0-4922-8f93-a8d9cfeaa685",
      name: "Programación",
      slug: "programacion",
    },
  ],
};

describe("PostCard", () => {
  it("renderiza el titulo del post", () => {
    render(
      <MemoryRouter>
        <PostCard post={mockPost} />
      </MemoryRouter>,
    );
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
  });

  it("renderiza el autor del post", () => {
    render(
      <MemoryRouter>
        <PostCard post={mockPost} />
      </MemoryRouter>,
    );
    expect(screen.getByText(mockPost.author.name)).toBeInTheDocument();
  });

  it("trunca el contenido del post si es demasiado largo", () => {
    // Generamos un texto de 200 caracteres
    const longContent = "A".repeat(200);

    render(
      <MemoryRouter>
        <PostCard post={{ ...mockPost, content: longContent }} />
      </MemoryRouter>,
    );

    // queryByText para que no lance error
    expect(screen.queryByText(longContent)).not.toBeInTheDocument();

    const truncatedContent = "A".repeat(150);
    expect(
      screen.getByText(truncatedContent, { exact: false }),
    ).toBeInTheDocument();
  });

  it("muestra maximo 3 categorias y el contador con el sobrante (+N)", () => {
    const postWithManyCategories = {
      ...mockPost,
      categories: [
        {
          id: "20460158-11c0-4922-8f93-a8d9cfeaa685",
          name: "Programación",
          slug: "programacion",
        },
        {
          id: "20460158-11c0-4922-8f93-a8d9cfeaa686",
          name: "Desarrollo Web",
          slug: "desarrollo-web",
        },
        {
          id: "20460158-11c0-4922-8f93-a8d9cfeaa687",
          name: "JavaScript",
          slug: "javascript",
        },
        {
          id: "20460158-11c0-4922-8f93-a8d9cfeaa688",
          name: "React",
          slug: "react",
        },
        {
          id: "20460158-11c0-4922-8f93-a8d9cfeaa689",
          name: "Algoritmos",
          slug: "algoritmos",
        },
      ],
    };

    render(
      <MemoryRouter>
        <PostCard post={postWithManyCategories} />
      </MemoryRouter>,
    );

    // Verifica que las primeras 3 se rendericen
    expect(screen.getByText("Programación")).toBeInTheDocument();
    expect(screen.getByText("Desarrollo Web")).toBeInTheDocument();
    expect(screen.getByText("JavaScript")).toBeInTheDocument();

    // Verifica que las demas no se rendericen y que se muestre un contador +2
    expect(screen.queryByText("React")).not.toBeInTheDocument();
    expect(screen.queryByText("Algoritmos")).not.toBeInTheDocument();
    expect(screen.getByText("+2")).toBeInTheDocument();
  });

  it("muestra 'Sin categoría' si el post no tiene categorias asociadas", () => {
    render(
      <MemoryRouter>
        <PostCard post={{ ...mockPost, categories: [] }} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Sin categoría")).toBeInTheDocument();
  });

  it("aplica valores por defecto cuando faltan datos opcionales", () => {
    const incompletePost = {
      ...mockPost,
      coverImage: null,
      commentCount: null,
      author: { id: "usr-1", name: "Ana Gomez", avatarUrl: null },
    };

    render(
      <MemoryRouter>
        <PostCard post={incompletePost} />
      </MemoryRouter>,
    );

    // Verifica el fallback de commentCount a 0
    expect(screen.getByText("0")).toBeInTheDocument();

    // Verifica que la imagen de portada use el placeholder predeterminado
    const coverImage = screen.getByAltText(
      `Portada de ${incompletePost.title}`,
    );
    expect(coverImage).toHaveAttribute("src", "https://placehold.co/600x400");
  });
});
