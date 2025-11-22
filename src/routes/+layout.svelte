<script lang="ts">
    import BackToTop from "$lib/components/BackToTop.svelte";
    import ConfigProvider from "$lib/contexts/ConfigProvider.svelte";
    import "$lib/styles/app.css";

    let { children } = $props();
</script>

<svelte:head>
    <title>Scalo - Startup Template</title>
    <meta
        name="description"
        content="Scalo is a modern and flexible startup template designed to help you launch and scale your projects effortlessly." />
</svelte:head>
<ConfigProvider>
    {@render children()}
    <div class="fixed end-8 bottom-8 z-50">
        <BackToTop />
    </div>
</ConfigProvider>
