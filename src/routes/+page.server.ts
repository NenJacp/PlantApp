import { redirect } from '@sveltejs/kit';

export const load = ({ cookies }) => {
  const token = cookies.get('jwt');

  if (token) {
    throw redirect(307, '/home');
  }

  throw redirect(307, '/login');
};
// test
