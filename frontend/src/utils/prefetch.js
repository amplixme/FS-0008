export function prefetchOnIdle(importFunctions = []) {
  // Respetar si el usuario tiene activado el ahorro de datos en el navegador
  if (
    navigator.connection &&
    (navigator.connection.saveData ||
      /2g/.test(navigator.connection.effectiveType))
  ) {
    return;
  }

  // Usar requestIdleCallback o fallback a setTimeout
  const scheduleIdle =
    window.requestIdleCallback || ((cb) => setTimeout(cb, 1500));

  scheduleIdle(() => {
    // Ejecutar las importaciones dinamicas una a una en segundo plano
    importFunctions.forEach((importFn) => {
      try {
        importFn();
      } catch (err) {
        // Si falla la precarga, no pasa nada; se intentara de nuevo si el usuario navega
        console.warn("Error al precargar ruta:", err);
      }
    });
  });
}
