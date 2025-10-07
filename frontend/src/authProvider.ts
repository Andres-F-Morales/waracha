import { AuthProvider } from 'react-admin';

// Definimos la URL de login
const LOGIN_URL = 'http://localhost:3000/api/v1/auth/login';
const AUTH_TOKEN_KEY = 'authToken'; // Clave para guardar el token en localStorage

export const authProvider: AuthProvider = {
    login: ({ email, password }) => {
        const request = new Request(LOGIN_URL, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });

        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    // Rechaza la promesa si hay un error de login
                    return Promise.reject(new Error('Login fallido. Verifica tus credenciales.'));
                }
                return response.json();
            })
            .then((authResponse: { token: string }) => {
                // Guarda el token. ¡Asegúrate de que 'token' coincide con la respuesta de tu API!
                localStorage.setItem(AUTH_TOKEN_KEY, authResponse.token);
                return Promise.resolve();
            })
            .catch(() => Promise.reject());
    },

    // 2. Lógica de cierre de sesión (Logout)
    logout: () => {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        return Promise.resolve();
    },

    // 3. Verificar si el usuario está autenticado
    checkAuth: () => {
        return localStorage.getItem(AUTH_TOKEN_KEY) ? Promise.resolve() : Promise.reject();
    },

    // 4. Manejo de errores de autenticación/autorización de la API (401, 403)
    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem(AUTH_TOKEN_KEY);
            return Promise.reject(); // Fuerza el redireccionamiento a la página de login
        }
        return Promise.resolve();
    },

    // Métodos opcionales (pero requeridos por la interfaz AuthProvider)
    getIdentity: () => Promise.resolve({ id: 'user', fullName: 'Admin User' }),
    getPermissions: () => Promise.resolve(),
};