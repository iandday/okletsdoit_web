<script lang="ts">
    type IPageTitle = {
        label?: string;
        title: string;
        description: string;
        centered?: boolean;
    };

    const { label, title, description, centered = true }: IPageTitle = $props();
</script>

<div class={centered ? "text-center" : ""}>
    {#if label}
        <div class="badge bg-base-100 badge-outline border-base-300 badge-sm font-mono">{label}</div>
    {/if}
    <p class="mt-1 text-2xl font-semibold sm:text-3xl">{title}</p>
    <div class="mt-2 flex items-center justify-center">
        <p class="text-base-content/80 max-w-lg max-sm:text-sm">{description}</p>
    </div>
</div>
