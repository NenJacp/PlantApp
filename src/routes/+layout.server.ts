import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
  const allCookies = cookies.getAll();
  console.log("All cookies on server (layout):", allCookies);
  const token = cookies.get('jwt');
  console.log("JWT Token on server (layout):", token);

  if (url.pathname === '/') {
    if (token) {
      throw redirect(307, '/home');
    } else {
      throw redirect(307, '/login');
    }
  }
};
