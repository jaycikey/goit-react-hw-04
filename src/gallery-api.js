import axios from 'axios';

const ACCESS_KEY = 'monCpzP_HiO4VvKS_B6Bd9s_LHMHaLHY-pzOeKAA99w';

export async function fetchImagesWithName(query, page = 1, perPage = 10) {
  const url = `https://api.unsplash.com/search/photos`;
  const params = {
    query,
    page,
    per_page: perPage,
    client_id: ACCESS_KEY,
  };

  const response = await axios.get(url, { params });

  if (response.status !== 200) {
    throw new Error(`Failed to fetch images: Status ${response.status}`);
  }

  const { results, total_pages } = response.data;

  if (response.data.results.length === 0) {
    throw new Error(`No results found for "${query}".`);
  }

  return { results, total_pages };
}
