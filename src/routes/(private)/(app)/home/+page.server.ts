import { env } from '$env/dynamic/public';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, cookies, url }) => {
  const token = cookies.get('jwt');
  if (!token) {
    throw redirect(307, '/login');
  }

  const apiBaseUrl = env.PUBLIC_API_BASE_URL;
  if (!apiBaseUrl) {
    throw error(500, 'API no configurada. Añade PUBLIC_API_BASE_URL en .env');
  }

  // Build the search URL
  const searchParams = url.searchParams;
  const keyword = searchParams.get('keyword');
  const createdFrom = searchParams.get('createdFrom');
  const createdTo = searchParams.get('createdTo');
  const operator = searchParams.get('operator');
  const field = searchParams.get('field');
  const value = searchParams.get('value');

  let fetchUrl: string;
  const query = new URLSearchParams();

  if (keyword) {
    fetchUrl = `${apiBaseUrl}/api/Plant/search`;
    query.set('keyword', keyword);
  } else if (field && value) {
    fetchUrl = `${apiBaseUrl}/api/Plant/search/advanced`;
    if (createdFrom) {
      query.set('createdFrom', `${createdFrom}T00:00:00.000Z`);
    }
    if (createdTo) {
      query.set('createdTo', `${createdTo}T23:59:59.999Z`);
    }
    if (operator) query.set('operator', operator);
    query.set('field', field);
    query.set('value', value);
  } else {
    fetchUrl = `${apiBaseUrl}/api/Plant`;
  }

  const finalUrl = query.toString() ? `${fetchUrl}?${query.toString()}` : fetchUrl;

  const res = await fetch(finalUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) {
    if (res.status === 401) {
      cookies.delete('jwt', { path: '/' });
      throw redirect(307, '/login');
    }
    throw error(res.status, `Error al obtener las plantas: ${await res.text()}`);
  }

  const plants = await res.json();

  return {
    plants,
    search: {
      keyword: keyword ?? '',
      createdFrom: createdFrom ?? '',
      createdTo: createdTo ?? '',
      operator: operator ?? '0',
      field: field ?? '',
      value: value ?? ''
    }
  };
};
