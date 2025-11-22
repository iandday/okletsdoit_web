<script lang="ts">
    import SidebarMenuItem from "$lib/components/layouts/SidebarMenuItem.svelte";
    import type { IMenuItem } from "$lib/components/layouts/TopbarMenuItem.svelte";
    import TopbarMenuItem from "$lib/components/layouts/TopbarMenuItem.svelte";
    import SimpleBar from "simplebar";

    const menu: IMenuItem[] = [
        {
            title: "Home",
            href: "/",
        },
        {
            title: "Landings",
            items: [
                {
                    title: "Developer",
                    href: "/developer",
                    icon: "lucide--code",
                    anchorProps: {
                        target: "_blank",
                    },
                },
                {
                    title: "Automation",
                    href: "/automation",
                    icon: "lucide--settings",
                    anchorProps: {
                        target: "_blank",
                    },
                },
                {
                    title: "Smart Sales",
                    href: "/sales",
                    icon: "lucide--badge-dollar-sign",
                    anchorProps: {
                        target: "_blank",
                    },
                    badges: ["new"],
                },
                {
                    title: "AI Storage",
                    href: "/storage",
                    icon: "lucide--server-cog",
                    anchorProps: {
                        target: "_blank",
                    },
                    badges: ["new"],
                },
            ],
        },
        {
            title: "Pages",
            items: [
                {
                    title: "Settings",
                    icon: "lucide--user",
                    items: [
                        {
                            title: "Profile",
                            href: "/settings/profile",
                        },
                        {
                            title: "Account",
                            href: "/settings/account",
                        },
                        {
                            title: "Notification",
                            href: "/settings/notification",
                        },
                        {
                            title: "Manage Plan",
                            href: "/settings/plan",
                        },
                    ],
                },
                {
                    title: "Auth",
                    icon: "lucide--shield-check",
                    items: [
                        {
                            title: "Login",
                            href: "/auth/login",
                            anchorProps: {
                                target: "_blank",
                            },
                        },
                        {
                            title: "Register",
                            href: "/auth/register",
                            anchorProps: {
                                target: "_blank",
                            },
                        },
                        {
                            title: "Forgot Password",
                            href: "/auth/forgot-password",
                            anchorProps: {
                                target: "_blank",
                            },
                        },
                        {
                            title: "Reset Password",
                            href: "/auth/reset-password",
                            anchorProps: {
                                target: "_blank",
                            },
                        },
                        {
                            title: "Verify",
                            href: "/auth/verify",
                            anchorProps: {
                                target: "_blank",
                            },
                        },
                        {
                            title: "2FA",
                            href: "/auth/2fa",
                            anchorProps: {
                                target: "_blank",
                            },
                        },
                    ],
                },
                {
                    title: "Company",
                    icon: "lucide--building-2",
                    items: [
                        {
                            title: "Who we are",
                            href: "/company/who-we-are",
                        },
                        {
                            title: "Storyline",
                            href: "/company/storyline",
                        },
                        {
                            title: "Careers",
                            href: "/company/careers",
                        },
                        {
                            isSection: true,
                            title: "Reader",
                        },
                        {
                            title: "Blogs",
                            href: "/company/blogs",
                        },
                        {
                            title: "Single Blog",
                            href: "/company/blogs/single",
                        },
                        {
                            isSection: true,
                            title: "Legal",
                        },
                        {
                            title: "Privacy",
                            href: "/company/privacy",
                        },
                        {
                            title: "Terms",
                            href: "/company/terms",
                        },
                        {
                            isSection: true,
                            title: "Help & Support",
                        },
                        {
                            title: "Contact",
                            href: "/company/contact",
                        },
                        {
                            title: "FAQs",
                            href: "/company/faq",
                        },
                    ],
                },
                {
                    title: "Extra",
                    icon: "lucide--box",
                    items: [
                        {
                            title: "Coming Soon",
                            href: "/extra/coming-soon",
                            anchorProps: {
                                target: "_blank",
                            },
                        },
                        {
                            title: "Maintenance",
                            href: "/extra/maintenance",
                            anchorProps: {
                                target: "_blank",
                            },
                        },
                        {
                            title: "Notify",
                            href: "/extra/notify",
                            anchorProps: {
                                target: "_blank",
                            },
                        },
                        {
                            title: "Error 404",
                            href: "/extra/errors-404",
                            anchorProps: {
                                target: "_blank",
                            },
                        },
                    ],
                },
            ],
        },
        {
            title: "Components",
            items: [
                {
                    title: "Blocks",
                    icon: "lucide--blocks",
                    badges: ["new"],
                    items: [
                        {
                            title: "Cookies",
                            href: "/components/blocks/cookies",
                        },
                        {
                            title: "Banners",
                            href: "/components/blocks/banners",
                        },
                        {
                            title: "Feedbacks",
                            href: "/components/blocks/feedbacks",
                        },
                        {
                            title: "CTA Actions",
                            href: "/components/blocks/cta-actions",
                        },
                        {
                            title: "Engagements",
                            href: "/components/blocks/engagements",
                        },
                    ],
                },
                {
                    title: "Interactive",
                    icon: "lucide--layers",
                    badges: ["new"],
                    items: [
                        {
                            title: "Counter",
                            href: "/components/interactions/counter",
                        },
                        {
                            title: "Motion Effects",
                            href: "/components/interactions/motion-effects",
                        },
                    ],
                },
                {
                    title: "Pricing",
                    icon: "lucide--dollar-sign",
                    items: [
                        {
                            title: "Lifetime",
                            href: "/components/pricing/lifetime",
                        },
                        {
                            title: "Subscription",
                            href: "/components/pricing/subscription",
                        },
                        {
                            title: "Users",
                            href: "/components/pricing/users",
                        },
                        {
                            title: "Comparison",
                            href: "/components/pricing/comparison",
                        },
                        {
                            isSection: true,
                            title: "Options",
                        },
                        {
                            title: "Single",
                            href: "/components/pricing/single",
                        },
                        {
                            title: "Double",
                            href: "/components/pricing/double",
                        },
                        {
                            title: "Custom",
                            href: "/components/pricing/custom",
                        },
                    ],
                },
                {
                    title: "Testimonials",
                    icon: "lucide--message-circle",
                    items: [
                        {
                            title: "Simple",
                            href: "/components/testimonials/simple",
                        },
                        {
                            title: "Swiper",
                            href: "/components/testimonials/swiper",
                        },
                    ],
                },
            ],
        },
    ];
    let scrollPosition = $state(0);
    let scrollRef: HTMLDivElement;

    const handleScroll = () => {
        setTimeout(() => {
            scrollPosition = window.scrollY;
        }, 200);
    };

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
    class="data-[at-top=false]:bg-base-100/95 hover:bg-base-100 sticky top-0 z-50 transition-all duration-500 data-[at-top=false]:shadow data-[at-top=false]:backdrop-blur-lg"
    data-at-top={scrollPosition < 30}>
    <div class="container flex h-16 items-center justify-between gap-6">
        <div class="flex items-center gap-3"></div>
        <div class="hidden items-center gap-1 md:flex">
            {#each menu as item, index (index)}
                <TopbarMenuItem {...item} />
            {/each}
        </div>

        <div class="flex items-center gap-2">
            <div class="dropdown dropdown-hover md:dropdown-center dropdown-end">
                <div class="avatar cursor-pointer">
                    <div class="bg-base-200 mask mask-squircle w-8">
                        <img src="/images/avatars/1.png" alt="Avatar" />
                    </div>
                </div>
                <div tabIndex={0} class="dropdown-content bg-base-100 rounded-box z-1 w-44 p-2 text-sm shadow-sm">
                    <ul class="menu w-full p-0">
                        <li>
                            <a class="flex items-center gap-2 px-3 py-1.5" href="/settings/profile">
                                <span class="iconify lucide--user size-4" />
                                <span>Profile</span>
                            </a>
                        </li>
                        <li>
                            <a class="flex items-center gap-2 px-3 py-1.5" href="/settings/account">
                                <span class="iconify lucide--settings size-4" />
                                <span>Account</span>
                            </a>
                        </li>
                        <li>
                            <a class="flex items-center gap-2 px-3 py-1.5" href="/settings/notification">
                                <span class="iconify lucide--bell size-4" />
                                <span>Notification</span>
                            </a>
                        </li>
                    </ul>
                    <hr class="border-base-200 -mx-2 my-2" />
                    <ul class="menu w-full p-0">
                        <li>
                            <a
                                class="hover:bg-error/10 text-error rounded-box flex items-center gap-2 px-3 py-1.5"
                                href="/auth/login">
                                <span class="iconify lucide--log-out size-4" />
                                <span>Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="md:hidden">
                <div class="drawer drawer-end">
                    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
                    <div class="drawer-content">
                        <label for="my-drawer" class="btn btn-sm btn-ghost btn-square drawer-button">
                            <span class="iconify lucide--menu size-5"></span>
                        </label>
                    </div>
                    <div class="drawer-side">
                        <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
                        <div class="bg-base-100 flex h-screen w-56 flex-col py-5">
                            <div class="flex justify-center"></div>
                            <div class="min-h-0 grow">
                                <div bind:this={scrollRef} class="mt-5 size-full">
                                    <p class="text-base-content/60 mx-5 text-sm font-medium">Navigation</p>
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
