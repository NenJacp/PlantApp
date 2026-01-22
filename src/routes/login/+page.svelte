<!-- Logica -->
<script lang="ts">
  import { goto } from '$app/navigation';
  let email: string = '';
  let password: string = '';
  let error: string = '';

  function login(): void {
    if (!email || !password) {
      error = 'Todos los campos son obligatorios';
      return;
    }

    if (email === 'test@test.com' && password === '1234') {
      alert('Login exitoso');
      error = '';
      goto('/principal');
    } else {
      error = 'Credenciales incorrectas';
    }
  }
</script>

<!-- Estructura y diseño -->
<div class="flex min-h-screen items-center justify-center bg-gray-200">
  <div class="w-full max-w-sm rounded-lg bg-white p-6 shadow-md">
    <div class="flex justify-center">
      <img src="/Brand/PlantApp.png" alt="Logo" class="h-24 w-24" />
    </div>
    <h1 class="mb-6 text-center text-2xl font-bold">Iniciar sesión</h1>

    <form on:submit|preventDefault={login} class="space-y-4">
      <div>
        <label for="email" class="mb-1 block text-sm font-medium text-gray-700"> Correo </label>
        <input
          id="email"
          type="email"
          bind:value={email}
          class="w-full rounded-md border-2 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
        />
      </div>

      <div>
        <label for="password" class="mb-1 block text-sm font-medium text-gray-700">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          bind:value={password}
          class="w-full rounded-md border-2 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
        />
      </div>

      {#if error}
        <p class="text-center text-sm text-red-600">
          {error}
        </p>
      {/if}

      <button
        type="submit"
        class="w-full rounded-md bg-green-600 py-2 text-white transition hover:bg-green-700"
      >
        Entrar
      </button>
    </form>
  </div>
</div>
