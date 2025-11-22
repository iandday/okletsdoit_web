<script lang="ts">
    import BackToTop from "$lib/components/BackToTop.svelte";
    import ConfigProvider from "$lib/contexts/ConfigProvider.svelte";
    import "$lib/styles/app.css";

    let { children } = $props();
</script>

<svelte:head>
    <title>Steph & Ian</title>
    <meta name="description" content="Let's do this thing" />
</svelte:head>
<ConfigProvider>
    {@render children()}
    <div class="fixed end-8 bottom-8 z-50">
        <BackToTop />
    </div>
</ConfigProvider>
