<script lang="ts">
  import Navbar from '$lib/components/NavBar.svelte';
  import './../layout.css';
  import favicon from '$lib/assets/favicon.svg';
  import '../../app.css';

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<Navbar />
{@render children()}
