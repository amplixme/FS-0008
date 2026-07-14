export const CATEGORIAS = [
  {
    name: "Tecnología",
    numberOfPosts: 24,
  },
  {
    name: "Diseño",
    numberOfPosts: 18,
  },
  {
    name: "Programación",
    numberOfPosts: 42,
  },
  {
    name: "DevOps",
    numberOfPosts: 12,
  },
  {
    name: "Opinión",
    numberOfPosts: 7,
  },
];

export const USER = {
  name: "Alex Rivera",
  avatarUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB62b7yMm1NQoaVoxOLJVYpdgjgjS7ldvZHJ_awq6AzaUJ1Gr_D7HExHtqBdHan9pACW90EZl5G1_8SKAQ7oUN2m7CkbCQGunYi_3tjAwWcwHL4lQRnFuuupJBY2xeWoaE6_mn4UJ8q1jhq9Mlehw31qmBiZRZlJJF2WaXPNOE7jttKozVj3EjvSXL3OXY95A2gGTbuiHBGfmgcwbMhrfrdz4EMyx-He1th5I7xHM3dmJ-eVYzbbCHsvW06f18V3ux0U3Yi3abBKAN8",
  email: "alex@ejemplo.com",
};

export const POSTS = [
  {
    id: 1,
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD2yhCgGZgV8OCo-ExNttlVt8QArc3_O1B5A1vYDbhJz0Oq4fVnbAOFTbym6tXaZKCmOr1f49okZ5Cq2yavKJmGAwnzEYTBGNQZ_LnkpBWiYYxJE1futY2XqlKCK5-8SKVL_Xo-DJHhUxRyMW2XPx2OY51TSE3g3xeEeRHjEPh4VakvWwFw3KiNPCxQGU_mR25TaJ5Os40is1WHlmwqiytbaYLpx0gPjAKvdNtjckPW0bdNlRrNP29DelhzA-3uWZ2kLZWAgjSZp5GB",
    category: "Ingeniería",
    title: "Arquitectura Limpia en Aplicaciones Modernas",
    excerpt:
      "Exploramos cómo los principios de Clean Architecture pueden salvar tu proyecto del caos técnico mientras escalas rápidamente en entornos ágiles.",
    author: {
      name: "Alex Rivera",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCWFnbWLCR5qcTlygWuVQ0jVdcznNUGu4czDeJQ2o0geBKkN2Y8vcbMgkqLqP65hjYMoOkPhBZkFbidcrf_clvcBTSORfxlPAyVxk8dVQy0ZIwkr0MG2T7tFb4vyuWqmvdRWqEx8Ta0Z_P88d9OXxP6OwKyN_SspyNHE4NOBkX6LVFla6bEDRPU_3XaQQNuhjalNhUx4C_78vXL2omATKwL8ZexvLNNlE4stAAozSezQ1UBs9SATSNboUc_fCSAsHpdyJgUOCX9EPcO",
    },
    date: "Oct 12, 2023",
    comments: 14,
  },
  {
    id: 2,
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAC0H4Jwn1lhV6_rGgvKz_2TYN03oe4sI0uO_bjyMXDdr6FXOfNiwX-twpt5N-tvTbFfp1xgfb8HMCEcm1AibxHHUjsVgzDHE2M3HhJAq8QqHV9v3E9T6xJpOSXDdbGHtQR09Fc2uaR2XQB-VPkopseNV9SP6WdLcIOcHussiEiYX8rrRI8IWSJT5J_Kow2fzKWesOFH8ncAADrw7hB8IeVxEo6lFUMIf2Xg3og7Ue4wdjrrBZX0sQn_vZlijNSxuIWIqQGam1M4FTC",
    category: "Diseño",
    title: "El futuro de la UI: Más allá de las pantallas",
    excerpt:
      "¿Cómo diseñamos para interfaces que no existen físicamente? Una mirada a la computación espacial y su impacto en la experiencia del usuario.",
    author: {
      name: "Sofia Chen",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCxfJ7jX1JeifoJSEDRlUgWY4EG3Oy8QYun6HYH4D2nTuvs82HNMnFI7QjaYEfGbC-TPGTNsriNT9w7CsE6SSyhT9sPeX_yYa1Gk8jXkBAdjKYncivpfdbjIC69pW2HLJgGN3jAJD4I2zq7qZqeUcieNUblltJouIHJhnF-B6ntJi6Dg4jwuTMiDBKFCjcULPynm-XlI0KETN92Y4qL0-ojDewsLIguLPGv7j_Ju_ARqT0gK0ZZOHvASKXPog-r4g3oq1zDJJp5xLeq",
    },
    date: "Oct 10, 2023",
    comments: 8,
  },
  {
    id: 3,
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDhhle9B4FbehWuo8DuLxlz6ZTNMXpPZLf8CNrDSZFlflduWqtIp0uFm5-fKdMtzRWaNA_zXvDVGw24WmMIaWf7gCF5DA_dpZDiM17gMMNZx2g6WItdihntWIdH9FmPsccCyzObGVBex46SzQXmzhejTGvC_oMDLGD7eL0LaGoAdMEfYRqXTfp1X8EwlR1mbaeKgH7lSPjrn7oqjCDPDRsuoF3vvUrTYTKAn3IF16JbFTOfG3D-_LddTk0DIevTVlH6_-BFnOSSKeAk",
    category: "DevOps",
    title: "Kubernetes para Mortales: Guía Definitiva",
    excerpt:
      "Desmitificamos la orquestación de contenedores con analogías del mundo real y ejemplos prácticos para equipos pequeños.",
    author: {
      name: "Marc Serra",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC4CXX481xM5hla6sPJlDxxN2IlpSg9B09gwCEODxCDcOh6b-G4ZuZpKUXz_74BqDhHVkmk52HXZRP7Wz8U70dipJ3siUsef_DrWtpEDRbv9Xk11UgYggbRys8-rmR9yiDtzMVvL_aOWrTMMhO-gpUvNPozUaQIdOyv2uX8ui87QC-wPNBEQMH5SimUgrJzzEsfP2VEsfmqXhu7KzPUr2Bt5QYnaqhqDqpKIPfhFyLarDV8ulvnEpPN5iw4JnoV-UsQ1vHftlEBOues",
    },
    date: "Oct 05, 2023",
    comments: 32,
  },
  {
    id: 4,
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBhXo74ZJzrxdp8s02anQ-RrEKoaqFDUfFrelRCteQLtk9BVIXXM5PfMsU3k0KA20G4-TPcSe4ohio_2YHs-2n3B_gSKA0A1zh0WSS7HL1M_5EMOsKjSxq5HNXdTPWzvUcHTCiwGnIOjU-fiE_-D5gcgr0PAPg1M6ElSFWpvRqDbpGSJYH5cSCgtbP2OgOpp5hqafBsYklW3i6kcbetWMjBgqtdsX8VAeSO0zM4oGUU7RvNUGkQmZRe6wDI0rXeXSdGroA0Hlkuq0M3",
    category: "Opinión",
    title: "¿Estamos ante el fin del desarrollo No-Code?",
    excerpt:
      "Analizamos el auge de la IA generativa de código y cómo está desplazando las herramientas visuales tradicionales de creación.",
    author: {
      name: "Elena Ruiz",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA2UCFOjf8bgqHmOVWaaPkABptF_Yg00hHQFDPJ09hfPPk4-El5UP-Rm72Vrtcm1m_6l9NOSAzmIAtzwpC1NUeuo_8a3vUE8bOaGLOweapDZbi4TGtU28iSHT6orAx6bUXfbVJPK7r-vKRZ0YIVhZfEqIhsVIsc6lBtj0RDerivdEZtgpAc3KC6ZHcZADGRpHTtFLc-aaaL6Vch2CqDZF_O_PlmsqgwAhq5q_XPfr_4mkxMn8eGYTufUM1DgxIVunuq2Bvqx1AwXxx7",
    },
    date: "Oct 01, 2023",
    comments: 56,
  },
];
