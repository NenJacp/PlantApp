import { env } from '$env/dynamic/public';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  login: async ({ request, fetch, cookies }) => {
    const formData = await request.formData();
    const email = formData.get('email')?.toString() ?? '';
    const password = formData.get('password')?.toString() ?? '';

    if (!email.trim() || !password.trim()) {
      return fail(400, {
        error: 'Correo y contraseña son obligatorios'
      });
    }

    const apiBaseUrl = env.PUBLIC_API_BASE_URL;
    if (!apiBaseUrl) {
      return fail(500, {
        error: 'API no configurada. Añade PUBLIC_API_BASE_URL en .env'
      });
    }

    const res = await fetch(`${apiBaseUrl}/api/Auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.trim(),
        password
      })
    });

    if (!res.ok) {
      return fail(401, { error: 'Credenciales incorrectas' });
    }

    const data = await res.json();
    const token = data.token;

    if (!token) {
      return fail(500, { error: 'El servidor no devolvió un token' });
    }

    cookies.set('jwt', token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });

    throw redirect(303, '/home');
  },

  register: async ({ request, fetch }) => {
    const formData = await request.formData();
    const name = formData.get('name')?.toString() ?? '';
    const email = formData.get('email')?.toString() ?? '';
    const password = formData.get('password')?.toString() ?? '';

    if (!name.trim() || !email.trim() || !password.trim()) {
      return fail(400, {
        error: 'Nombre, correo y contraseña son obligatorios',
        name,
        email
      });
    }

    const apiBaseUrl = env.PUBLIC_API_BASE_URL;
    if (!apiBaseUrl) {
      return fail(500, {
        error: 'API no configurada. Añade PUBLIC_API_BASE_URL en .env',
        name,
        email
      });
    }
    const res = await fetch(`${apiBaseUrl}/api/Auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        password
      })
    });

    if (!res.ok) {
      const text = await res.text();
      let message = `Error al registrar (${res.status})`;
      try {
        const json = JSON.parse(text);
        if (json.message) message = json.message;
      } catch {
        if (text) message = text.slice(0, 200);
      }
      return fail(res.status, { error: message, name, email });
    }

    return {
      success: true,
      message: 'Cuenta creada. Ya puedes iniciar sesión.'
    };
  }
};
