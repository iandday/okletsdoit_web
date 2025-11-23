<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { auth } from "$lib/stores/auth";

    let email = $state("");
    let password = $state("");
    let error = $state("");
    let loading = $state(false);

    async function handleLogin(e: Event) {
        e.preventDefault();
        loading = true;
        error = "";

        const result = await auth.login(email, password);

        if (result.success) {
            // Redirect to original page or home
            const redirectTo = $page.url.searchParams.get("redirect") || "/";
            goto(redirectTo);
        } else {
            error = result.error || "Login failed. Please try again.";
        }

        loading = false;
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

                <div class="text-center">
                    <p class="text-sm">
                        Don't have an account?
                        <a href="/auth/register" class="link link-primary">Register here</a>
                    </p>
                </div>
            </form>
        </div>
    </div>
</div>
