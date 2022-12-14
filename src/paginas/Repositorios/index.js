import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import estilos from './estilos';
import { pegarRepositoriosDoUsuario } from "../../servicos/requisicoes/repositorios"
import { useIsFocused } from '@react-navigation/native';

export default function Repositorios({ route, navigation }) {
    const [repo, setRepo] = useState([]);
    const estaNaTela = useIsFocused();

    useEffect(async () => {
        if (estaNaTela) {
            const resultado = await pegarRepositoriosDoUsuario(route.params.login);
            setRepo(resultado);
        }
    }, [estaNaTela]);

    return (
        <View style={estilos.container}>
            <Text style={estilos.repositoriosTexto}>{repo.length} repositórios criados</Text>
            <TouchableOpacity
                style={estilos.botao}
                onPress={() => navigation.navigate('CriarRepositorio', { id: route.params.id })}
            >
                <Text style={estilos.textoBotao}>Adicionar novo repositório</Text>
            </TouchableOpacity>

            <FlatList
                data={repo}
                style={{ width: "100%" }}
                keyExtractor={rep => rep.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={estilos.repositorio} onPress={() => navigation.navigate("InfoRepositorio", { item })}>
                        <Text style={estilos.repositorioNome}>{item.name}</Text>
                        <Text style={estilos.repositorioData}>Atualizado em {new Date(item.updated_at).toLocaleDateString('br')}</Text>
                    </TouchableOpacity>
                )}
            />

        </View>
    );
}
