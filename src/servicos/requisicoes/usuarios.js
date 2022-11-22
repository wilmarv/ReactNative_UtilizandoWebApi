import api from "../api";

export async function buscaUsuario(nomeUsuario) {
    try {
        const resultdo = await api.get(`users?login=${nomeUsuario}`);
        return resultdo.data[0];
    } catch (error) {
        console.log(error);
        return {};
    }
}