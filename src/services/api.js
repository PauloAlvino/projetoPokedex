import axios from "axios";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export const fetchPokemonDetails = async (idOrName) => {
  try {
    const response = await api.get(`/pokemon/${idOrName}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao achar o pokemon:", error);
    throw error;
  }
};

export default api;
