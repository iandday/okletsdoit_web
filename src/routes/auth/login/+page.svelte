<script lang="ts">
    import { goto } from "$app/navigation";
    import { auth } from "$lib/stores/auth";
    import { onMount } from "svelte";
    import type { PageData } from "./$types";

    interface Provider {
        id: string;
        name: string;
        client_id?: string;
        flows?: string[];
    }

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();

    let email = $state("");
    let password = $state("");
    let error = $state("");
    let loading = $state(false);
    let providers = $state<Provider[]>([]);
    let loadingProviders = $state(true);

    onMount(async () => {
        providers = await auth.getProviders();
        loadingProviders = false;
    });

    async function handleLogin(e: Event) {
        e.preventDefault();
        loading = true;
        error = "";

        const result = await auth.login(email, password);

        if (result.success) {
            // Redirect to original page or home
            goto(data.redirect);
        } else {
            error = result.error || "Login failed. Please try again.";
        }

        loading = false;
    }

    async function handleSocialLogin(providerId: string) {
        loading = true;
        error = "";
        // Redirect to our callback page with the final destination
        const callbackUrl = `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(data.redirect)}`;
        await auth.loginWithProvider(providerId, callbackUrl);
    }
</script>

<div class="min-h-screen flex items-center justify-center bg-base-200 px-4">
    <div class="card w-full max-w-md bg-base-100 shadow-xl">
        <div class="card-body">
            <h2 class="card-title text-3xl font-bold text-center mb-6">Welcome Back</h2>

            {#if error}
                <div class="alert alert-error mb-4">
                    <span class="iconify lucide--alert-circle size-5"></span>
                    <span>{error}</span>
                </div>
            {/if}

            <form onsubmit={handleLogin}>
                <div class="form-control mb-4">
                    <label class="label" for="email">
                        <span class="label-text">Email</span>
                    </label>
                    <input
                        id="email"
                        type="email"
                        bind:value={email}
                        placeholder="your@email.com"
                        class="input input-bordered w-full"
                        required
                        disabled={loading} />
                </div>

                <div class="form-control mb-6">
                    <label class="label" for="password">
                        <span class="label-text">Password</span>
                    </label>
                    <input
                        id="password"
                        type="password"
                        bind:value={password}
                        placeholder="Enter your password"
                        class="input input-bordered w-full"
                        required
                        disabled={loading} />
                    <label class="label">
                        <a href="/auth/forgot-password" class="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>

                <button type="submit" class="btn btn-primary w-full mb-4" disabled={loading}>
                    {#if loading}
                        <span class="loading loading-spinner"></span>
                        Logging in...
                    {:else}
                        Login
                    {/if}
                </button>
            </form>

            {#if !loadingProviders && providers.length > 0}
                <div class="divider">OR</div>

                <div class="space-y-2">
                    {#each providers as provider}
                        <button
                            onclick={() => handleSocialLogin(provider.id)}
                            class="btn w-full gap-2"
                            disabled={loading}>
                            {#if provider.id === "google"}
                                <span class="iconify logos--google-icon size-5"></span>
                            {:else if provider.id === "github"}
                                <span class="iconify logos--github-icon size-5"></span>
                            {:else if provider.id === "facebook"}
                                <span class="iconify logos--facebook size-5"></span>
                            {:else if provider.id === "authentik"}
                                <span class="iconify lucide--shield-check size-5"></span>
                            {:else}
                                <span class="iconify lucide--log-in size-5"></span>
                            {/if}
                            Continue with {provider.name}
                        </button>
                    {/each}
                </div>
            {:else if loadingProviders}
                <div class="divider">OR</div>
                <div class="flex justify-center py-4">
                    <span class="loading loading-spinner loading-sm"></span>
                </div>
            {/if}

            <div class="mt-4 text-center">
                <p class="text-sm">
                    Don't have an account?
                    <a href="/auth/register" class="link link-primary">Register here</a>
                </p>
            </div>
        </div>
    </div>
</div>
