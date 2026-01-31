import { env } from "$env/dynamic/public";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, fetch }) => {
  const apiBaseUrl = env.PUBLIC_API_BASE_URL;
  if (!apiBaseUrl) {
    throw error(500, "API no configurada. Añade PUBLIC_API_BASE_URL en .env");
  }
  const statusParam = params.status;

  // Endpoint especial que lanza una excepción en el backend
  const path =
    statusParam === "exception"
      ? `${apiBaseUrl}/api/test/errors/exception`
      : `${apiBaseUrl}/api/test/errors/${statusParam}`;

  const status = statusParam === "exception" ? undefined : Number(statusParam);
  if (
    status !== undefined &&
    (Number.isNaN(status) || status < 400 || status > 504)
  ) {
    throw error(400, "Parámetro de status inválido");
  }

  const res = await fetch(path);

  // Si la API devuelve error, lanzamos el error para que lo capture +error.svelte
  if (!res.ok) {
    throw error(
      res.status,
      `Error generado desde la API con status ${res.status}`,
    );
  }

  // Si por alguna razón la API responde OK, devolvemos datos "normales"
  return {
    status: status ?? "exception",
    ok: true,
  };
};
