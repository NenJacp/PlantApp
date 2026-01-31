<!-- Logica -->
<script lang="ts">
    import { page } from "$app/stores";
    import { enhance } from "$app/forms";

    let mode: "login" | "register" = "login";
    let name: string = "";

    $: formResult = $page.form;

    $: if (formResult?.type === "success" && formResult?.data?.success) {
        mode = "login";
    }

    function showRegister(): void {
        mode = "register";
    }

    function showLogin(): void {
        mode = "login";
    }
</script>

<!-- Estructura y diseño -->
<main class="flex min-h-screen items-center justify-center bg-gray-200">
    <div class="w-full max-w-sm rounded-lg bg-white p-6 shadow-md">
        <div class="flex justify-center">
            <img src="/Brand/PlantApp.png" alt="Logo" class="h-24 w-24" />
        </div>

        <!-- Iniciar sesión -->
        {#if mode === "login"}
            <h1 class="mb-6 text-center text-2xl font-bold">Iniciar sesión</h1>
            <form method="POST" action="?/login" use:enhance class="space-y-4">
                <div>
                    <label
                        for="email"
                        class="mb-1 block text-sm font-medium text-gray-700"
                    >
                        Correo
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        class="w-full rounded-md border-2 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label
                        for="password"
                        class="mb-1 block text-sm font-medium text-gray-700"
                    >
                        Contraseña
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        class="w-full rounded-md border-2 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                </div>

                {#if formResult?.type === "failure"}
                    <p class="text-center text-sm text-red-600">
                        {formResult.data?.error ?? "Error al iniciar sesión"}
                    </p>
                {/if}

                <button
                    type="submit"
                    class="w-full rounded-md bg-green-600 py-2 text-white transition hover:bg-green-700"
                >
                    Entrar
                </button>

                <p class="text-center text-xs text-gray-500">
                    ¿No tienes cuenta?
                    <button
                        type="button"
                        onclick={showRegister}
                        class="text-green-600 underline hover:text-green-700"
                    >
                        Registrarse
                    </button>
                </p>
            </form>
        {:else}
            <!-- Registrarse -->
            <h1 class="mb-6 text-center text-2xl font-bold">Registrarse</h1>
            <form
                method="POST"
                action="?/register"
                use:enhance
                class="space-y-4"
            >
                <div>
                    <label
                        for="reg-name"
                        class="mb-1 block text-sm font-medium text-gray-700"
                    >
                        Nombre
                    </label>
                    <input
                        id="reg-name"
                        name="name"
                        type="text"
                        bind:value={name}
                        class="w-full rounded-md border-2 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                </div>
                <div>
                    <label
                        for="reg-email"
                        class="mb-1 block text-sm font-medium text-gray-700"
                    >
                        Correo
                    </label>
                    <input
                        id="reg-email"
                        name="email"
                        type="email"
                        class="w-full rounded-md border-2 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                </div>
                <div>
                    <label
                        for="reg-password"
                        class="mb-1 block text-sm font-medium text-gray-700"
                    >
                        Contraseña
                    </label>
                    <input
                        id="reg-password"
                        name="password"
                        type="password"
                        class="w-full rounded-md border-2 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                </div>

                {#if formResult?.type === "failure"}
                    <p class="text-center text-sm text-red-600">
                        {formResult.data?.error ?? "Error al registrar"}
                    </p>
                {/if}
                {#if formResult?.type === "success" && formResult?.data?.success}
                    <p class="text-center text-sm text-green-600">
                        {formResult.data?.message ??
                            "Cuenta creada. Ya puedes iniciar sesión."}
                    </p>
                {/if}

                <button
                    type="submit"
                    class="w-full rounded-md bg-green-600 py-2 text-white transition hover:bg-green-700"
                >
                    Registrar
                </button>

                <p class="text-center text-xs text-gray-500">
                    ¿Ya tienes cuenta?
                    <button
                        type="button"
                        onclick={showLogin}
                        class="text-green-600 underline hover:text-green-700"
                    >
                        Iniciar sesión
                    </button>
                </p>
            </form>
        {/if}
    </div>
</main>

<footer class="fixed bottom-0 left-0 w-full bg-gray-200 p-4">
    <button class="rounded bg-red-500 p-1.5">
        <a href="/debug" class="text-white hover:text-gray-800">
            Ir a Debugger</a
        >
    </button>
    <button class="rounded bg-red-500 p-1.5">
        <a href="/debug-api" class="text-white hover:text-gray-800"
            >Ir a Debugger-API</a
        >
    </button>
</footer>
