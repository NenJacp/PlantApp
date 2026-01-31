<script lang="ts">
    const codes = [400, 401, 403, 404, 500, 502, 503, 504] as const;
</script>

<main class="flex min-h-screen items-center justify-center bg-gray-100 p-4">
    <div class="w-full max-w-2xl text-center">
        <h1 class="text-4xl font-bold text-gray-800">Páginas de Error</h1>
        <p class="text-lg text-gray-600">
            Haz clic para provocar errores reales desde la API. Cada enlace
            navega a una ruta que llama al backend (<code>api/test/errors/{status}</code>) y, si devuelve
            error, lanza <code>throw error(status)</code> para que lo capture
            <code>+error.svelte</code>.
        </p>

        <div class="mt-8 space-y-4">
            {#each codes as code}
                <a
                    href="/debug-api/{code}"
                    class="block w-full cursor-pointer rounded-lg bg-green-700 px-8 py-3 font-medium text-white shadow-lg transition-colors duration-200 hover:bg-gray-950 hover:shadow-xl"
                >
                    Error {code}
                </a>
            {/each}

            <a
                href="/debug-api/exception"
                class="block w-full cursor-pointer rounded-lg bg-amber-600 px-8 py-3 font-medium text-white shadow-lg transition-colors duration-200 hover:bg-amber-700 hover:shadow-xl"
            >
                Excepción (exception)
            </a>

            <a
                href="/"
                class="block w-full rounded-lg bg-gray-500 px-8 py-3 font-medium text-white shadow-lg transition-colors duration-200 hover:bg-gray-950 hover:shadow-xl"
            >
                Regresar
            </a>
        </div>
    </div>
</main>
