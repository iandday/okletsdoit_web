<script lang="ts">
    type IPageTitle = {
        label?: string;
        title?: string;
        description?: string;
        centered?: boolean;
        image?: string;
    };

    const { label, title, description, centered = true, image }: IPageTitle = $props();
</script>

<div class={centered ? "text-center" : ""}>
    {#if image}
        <div class="flex justify-center mb-2">
            <img src={image} alt="page-title-image" class="max-w-sm rounded-lg justify-self-center" />
        </div>
    {/if}
    {#if label}
        <div class="badge bg-base-100 badge-outline border-base-300 badge-sm font-mono">{label}</div>
    {/if}
    {#if title}
        <p class="mt-1 text-2xl font-semibold sm:text-3xl">{title}</p>
    {/if}
    <div class="mt-2 flex items-center justify-center">
        {#if description}
            <p class="text-base-content/80 max-w-lg max-sm:text-sm">{description}</p>
        {/if}
    </div>
</div>
