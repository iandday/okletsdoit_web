<script lang="ts">
    import { goto } from "$app/navigation";
    import SidebarMenuItem from "$lib/components/layouts/SidebarMenuItem.svelte";
    import type { IMenuItem } from "$lib/components/layouts/TopbarMenuItem.svelte";
    import TopbarMenuItem from "$lib/components/layouts/TopbarMenuItem.svelte";
    import { auth } from "$lib/stores/auth";
    import SimpleBar from "simplebar";

    const menu: IMenuItem[] = [
        {
            title: "Home",
            href: "/",
        },
        {
            title: "Our Story",
            href: "/story",
        },
        {
            title: "Venue",
            href: "/venue",
        },
        {
            title: "FAQ",
            href: "/faq",
        },
        {
            title: "RSVP",
            href: "/rsvp",
        },
        {
            title: "Upload Photos",
            href: "/photos",
        },
    ];
    let scrollPosition = $state(0);
    let scrollRef: HTMLDivElement;

    const handleScroll = () => {
        setTimeout(() => {
            scrollPosition = window.scrollY;
        }, 200);
    };

    async function handleLogout() {
        await auth.logout();
    }

    $effect(() => {
        new SimpleBar(scrollRef);

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });

    $effect(() => {
        if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    });
</script>

<div
    class="group bg-base-300 sticky top-0 z-50 transition-all duration-500 data-[at-top=false]:shadow data-[at-top=false]:backdrop-blur-lg"
    data-at-top={scrollPosition < 30}>
    <div class="container flex h-16 items-center justify-between gap-6 pl-4 pr-0 md:pl-6 md:pr-0 lg:pl-8">
        <div class="flex items-center gap-3"></div>
        <div class="hidden items-center gap-1 md:flex">
            {#each menu as item, index (index)}
                <TopbarMenuItem {...item} {scrollPosition} />
            {/each}
        </div>

        <div class="flex items-center gap-2">
            <div class="text-primary-content dropdown dropdown-hover md:dropdown-center dropdown-end">
                <div class="avatar cursor-pointer">
                    <div class="bg-base-200 mask mask-squircle w-6">
                        <span class="iconify lucide--user-circle size-6"></span>
                    </div>
                </div>
                <div tabIndex={0} class="dropdown-content bg-base-300 rounded-box z-1 w-44 p-2 text-sm shadow-sm">
                    <ul class="menu w-full p-0">
                        {#if $auth.isAuthenticated}
                            <li>
                                <a
                                    class="text-primary-content flex items-center gap-2 px-3 py-1.5"
                                    href="/settings/profile">
                                    <span class="iconify lucide--user size-4" />
                                    <span>Profile</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    class="text-primary-content flex items-center gap-2 px-3 py-1.5"
                                    href="/settings/account">
                                    <span class="iconify lucide--settings size-4" />
                                    <span>Account</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    class="text-primary-content flex items-center gap-2 px-3 py-1.5"
                                    href="/settings/notification">
                                    <span class="iconify lucide--bell size-4" />
                                    <span>Notification</span>
                                </a>
                            </li>
                            <li>
                                <button
                                    onclick={() => goto("/auth/logout")}
                                    class="text-primary-content rounded-box flex items-center gap-2 px-3 py-1.5">
                                    <span class="iconify lucide--log-out size-4" />
                                    <span>Logout</span>
                                </button>
                            </li>
                        {:else}
                            <li>
                                <a
                                    class="text-primary-content rounded-box flex items-center gap-2 px-3 py-1.5"
                                    href="/auth/login">
                                    <span class="iconify lucide--log-in size-4" />
                                    <span>Login</span>
                                </a>
                            </li>
                        {/if}
                    </ul>
                </div>
            </div>
            <div class="md:hidden">
                <div class="drawer drawer-end">
                    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
                    <div class="drawer-content">
                        <label
                            for="my-drawer"
                            class="text-primary-content btn btn-sm btn-ghost btn-square drawer-button">
                            <span class="iconify lucide--menu size-5"></span>
                        </label>
                    </div>
                    <div class="drawer-side">
                        <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
                        <div
                            class="bg-base-300 flex w-56 flex-col py-5 mt-16 mr-4 rounded-box shadow-xl max-h-[calc(100vh-50rem)]">
                            <div class="flex justify-center"></div>
                            <div class="min-h-0 grow">
                                <div bind:this={scrollRef} class="mt-5 size-full">
                                    <ul class="menu mt-1 w-full p-0 px-2 pb-12">
                                        {#each menu as item, index (index)}
                                            <SidebarMenuItem {...item} />
                                        {/each}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
