<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
    let showAdvanced = false;

    let selectedField = data.search.field || "Name";

    // Assuming plant object structure: { id, name, scientificName, description, imageUrl, isActive }
</script>

<main class="container mx-auto p-4 md:p-8">
    <h1 class="mb-6 text-3xl font-bold text-gray-800">Mis Plantas</h1>

    <!-- Filter Section -->
    <div class="mb-8 rounded-lg bg-gray-50 p-6 shadow">
        <form method="GET" class="space-y-4">
            <!-- Basic Search -->
            <div class="flex flex-col gap-4 sm:flex-row">
                <input
                    type="search"
                    name="keyword"
                    placeholder="Buscar por nombre o descripción..."
                    value={data.search.keyword}
                    class="w-full flex-grow rounded-md border-2 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
                <button
                    type="submit"
                    class="rounded-md bg-green-600 px-6 py-2 text-white transition hover:bg-green-700"
                >
                    Buscar
                </button>
            </div>
        </form>

        <!-- Advanced Search Toggle -->
        <div class="mt-4">
            <button
                type="button"
                on:click={() => (showAdvanced = !showAdvanced)}
                class="text-sm text-green-600 hover:underline"
            >
                {showAdvanced ? "Ocultar" : "Mostrar"} Búsqueda Avanzada
            </button>
        </div>

        <!-- Advanced Search Form -->
        {#if showAdvanced}
            <form
                method="GET"
                class="mt-4 space-y-4 border-t border-gray-200 pt-4"
            >
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <input
                        type="date"
                        name="createdFrom"
                        value={data.search.createdFrom.split("T")[0]}
                        class="w-full rounded-md border-2 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                    <input
                        type="date"
                        name="createdTo"
                        value={data.search.createdTo.split("T")[0]}
                        class="w-full rounded-md border-2 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                </div>
                <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                        <label
                            for="field"
                            class="mb-1 block text-sm font-medium text-gray-700"
                            >Campo</label
                        >
                        <select
                            name="field"
                            id="field"
                            bind:value={selectedField}
                            class="w-full rounded-md border-2 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        >
                            <option value="Name">Nombre</option>
                            <option value="Description">Descripción</option>
                            <option value="IsActive">Activo</option>
                        </select>
                    </div>
                    <div>
                        <label
                            for="value"
                            class="mb-1 block text-sm font-medium text-gray-700"
                            >Valor</label
                        >
                        {#if selectedField === "IsActive"}
                            <select
                                name="value"
                                id="value"
                                class="w-full rounded-md border-2 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                            >
                                <option
                                    value="true"
                                    selected={data.search.value === "true"}
                                    >Sí</option
                                >
                                <option
                                    value="false"
                                    selected={data.search.value === "false"}
                                    >No</option
                                >
                            </select>
                        {:else}
                            <input
                                type="text"
                                name="value"
                                id="value"
                                value={data.search.value}
                                class="w-full rounded-md border-2 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                            />
                        {/if}
                    </div>
                    <div>
                        <label
                            for="operator"
                            class="mb-1 block text-sm font-medium text-gray-700"
                            >Lógica de Búsqueda</label
                        >
                        <select
                            name="operator"
                            id="operator"
                            class="w-full rounded-md border-2 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                        >
                            <option
                                value="0"
                                selected={data.search.operator === "0"}
                                >Y (AND)</option
                            >
                            <option
                                value="1"
                                selected={data.search.operator === "1"}
                                >O (OR)</option
                            >
                            <option
                                value="2"
                                selected={data.search.operator === "2"}
                                >NO (NOT)</option
                            >
                        </select>
                    </div>
                </div>
                <div class="flex justify-end gap-4">
                    <a
                        href="/home"
                        class="rounded-md bg-gray-300 px-6 py-2 transition hover:bg-gray-400"
                        >Limpiar</a
                    >
                    <button
                        type="submit"
                        class="rounded-md bg-green-600 px-6 py-2 text-white transition hover:bg-green-700"
                    >
                        Filtrar
                    </button>
                </div>
            </form>
        {/if}
    </div>

    <!-- Plant List -->
    <div
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
        {#each data.plants as plant (plant.id)}
            <div
                class="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-xl"
            >
                <img
                    src={plant.imageUrl ?? "/Brand/PlantApp.png"}
                    alt="Imagen de {plant.name}"
                    class="h-48 w-full object-cover"
                />
                <div class="p-4">
                    <div class="flex items-center justify-between">
                        <h2 class="text-xl font-semibold text-gray-800">
                            {plant.name}
                        </h2>
                        <span
                            class="rounded-full px-2 py-1 text-xs font-semibold {plant.isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'}"
                        >
                            {plant.isActive ? "Activa" : "Inactiva"}
                        </span>
                    </div>
                    <p class="text-sm italic text-gray-600">
                        {plant.scientificName}
                    </p>
                    <p class="mt-2 text-sm text-gray-700">
                        {plant.description?.substring(0, 100) ??
                            "Sin descripción"}...
                    </p>
                </div>
            </div>
        {:else}
            <div class="col-span-full text-center text-gray-500">
                <p>No se encontraron plantas.</p>
                {#if data.search.keyword || data.search.value}
                    <p>
                        Intenta con otros filtros o <a
                            href="/home"
                            class="text-green-600 hover:underline"
                            >limpia la búsqueda</a
                        >.
                    </p>
                {/if}
            </div>
        {/each}
    </div>
</main>
