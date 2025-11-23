import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { env } from '$env/dynamic/public';

const API_URL = env.PUBLIC_API_URL || 'http://localhost:8000';

// Use browser client for web applications (uses cookies and CSRF)
const CLIENT = 'browser';

// Get CSRF token from cookie
function getCsrfToken(): string | null {
    if (!browser) return null;
    const name = 'csrftoken';
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
}

interface User {
    id?: number;
    display?: string;
    username?: string;
    email?: string;
    has_usable_password?: boolean;
}

interface AuthResponse {
    status: number;
    data?: {
        user?: User;
        flows?: any[];
    };
    meta?: {
        is_authenticated?: boolean;
        session_token?: string;
        access_token?: string;
    };
    errors?: Array<{
        code: string;
        param?: string;
        message: string;
    }>;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
};

function createAuthStore() {
    const { subscribe, set, update } = writable<AuthState>(initialState);

    return {
        subscribe,

        async init() {
            if (!browser) return;

            try {
                const response = await fetch(`${API_URL}/_allauth/${CLIENT}/v1/auth/session`, {
                    credentials: 'include',
                });

                const result: AuthResponse = await response.json();

                if (response.ok && result.meta?.is_authenticated && result.data?.user) {
                    set({ user: result.data.user, isAuthenticated: true, isLoading: false });
                } else {
                    set({ user: null, isAuthenticated: false, isLoading: false });
                }
            } catch (error) {
                console.error('Auth init error:', error);
                set({ user: null, isAuthenticated: false, isLoading: false });
            }
        },

        async login(email: string, password: string) {
            try {
                console.log('🔐 Attempting login to:', `${API_URL}/_allauth/${CLIENT}/v1/auth/login`);
                console.log('📤 Payload:', JSON.stringify({ email: email, password: password }));

                const csrfToken = getCsrfToken();
                const headers: Record<string, string> = {
                    'Content-Type': 'application/json',
                };
                if (csrfToken) {
                    headers['X-CSRFToken'] = csrfToken;
                }

                const response = await fetch(`${API_URL}/_allauth/${CLIENT}/v1/auth/login`, {
                    method: 'POST',
                    headers,
                    credentials: 'include',
                    body: JSON.stringify({ email: email, password: password }),
                });

                const result: AuthResponse = await response.json();
                console.log('📡 Response:', result);

                // Handle 409 Conflict - user already authenticated
                if (response.status === 409) {
                    console.log('ℹ️ User already authenticated');
                    // Fetch current session to get user data
                    const sessionResponse = await fetch(`${API_URL}/_allauth/${CLIENT}/v1/auth/session`, {
                        credentials: 'include',
                    });
                    const sessionResult: AuthResponse = await sessionResponse.json();
                    if (sessionResult.data?.user) {
                        console.log('✅ Retrieved user from session after conflict');
                        console.log('📦 User data:', sessionResult.data.user);
                        set({ user: sessionResult.data.user, isAuthenticated: true, isLoading: false });
                    }
                    return { success: true };
                }

                if (!response.ok) {
                    console.error('❌ Login failed:', result);
                    const errorMessage = result.errors?.[0]?.message || 'Login failed';
                    throw new Error(errorMessage);
                }

                // Check if fully authenticated
                if (result.meta?.is_authenticated && result.data?.user) {
                    console.log('✅ Login successful');
                    set({ user: result.data.user, isAuthenticated: true, isLoading: false });
                    return { success: true };
                }

                // Handle flows (e.g., 2FA required, email verification needed)
                if (result.data?.flows && result.data.flows.length > 0) {
                    return {
                        success: false,
                        error: 'Additional authentication steps required',
                        flows: result.data.flows
                    };
                }

                throw new Error('Unexpected response from server');
            } catch (error) {
                console.error('💥 Login error:', error);

                if (error instanceof TypeError && error.message.includes('fetch')) {
                    return {
                        success: false,
                        error: `Cannot connect to ${API_URL}. Is your Django server running?`
                    };
                }

                return {
                    success: false,
                    error: error instanceof Error ? error.message : 'Login failed'
                };
            }
        },

        async logout() {
            try {
                const csrfToken = getCsrfToken();
                const headers: Record<string, string> = {};
                if (csrfToken) {
                    headers['X-CSRFToken'] = csrfToken;
                }

                await fetch(`${API_URL}/_allauth/${CLIENT}/v1/auth/session`, {
                    method: 'DELETE',
                    headers,
                    credentials: 'include',
                });
            } catch (error) {
                console.error('Logout error:', error);
            } finally {
                set({ user: null, isAuthenticated: false, isLoading: false });
            }
        },

        async register(email: string, password: string) {
            try {
                const csrfToken = getCsrfToken();
                const headers: Record<string, string> = {
                    'Content-Type': 'application/json',
                };
                if (csrfToken) {
                    headers['X-CSRFToken'] = csrfToken;
                }

                const response = await fetch(`${API_URL}/_allauth/${CLIENT}/v1/auth/signup`, {
                    method: 'POST',
                    headers,
                    credentials: 'include',
                    body: JSON.stringify({ email, password }),
                });

                const result: AuthResponse = await response.json();

                if (!response.ok) {
                    const errorMessage = result.errors?.[0]?.message || 'Registration failed';
                    throw new Error(errorMessage);
                }

                // Check if fully authenticated after signup
                if (result.meta?.is_authenticated && result.data?.user) {
                    set({ user: result.data.user, isAuthenticated: true, isLoading: false });
                    return { success: true };
                }

                // Handle flows (e.g., email verification required)
                if (result.data?.flows && result.data.flows.length > 0) {
                    return {
                        success: false,
                        error: 'Email verification or additional steps required',
                        flows: result.data.flows
                    };
                }

                return { success: true };
            } catch (error) {
                console.error('Registration error:', error);
                return {
                    success: false,
                    error: error instanceof Error ? error.message : 'Registration failed'
                };
            }
        },
    };
}

export const auth = createAuthStore();
