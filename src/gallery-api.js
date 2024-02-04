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

  try {
    const response = await axios.get(url, { params });
    return response.data.results;
  } catch (error) {
    return error;
  }
}
