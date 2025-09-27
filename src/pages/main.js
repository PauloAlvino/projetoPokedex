import React, { Component } from "react";
import { Keyboard, ActivityIndicator, View } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import { fetchPokemonDetails } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User as PokemonCard,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from "../styles";

const colors = {
  types: {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
  },
};

export default class Main extends Component {
  state = {
    searchPokemon: "",
    myPokemons: [],
    loading: false,
  };

  async componentDidMount() {
    const myPokemons = await AsyncStorage.getItem("myPokemons");
    if (myPokemons) {
      let pokemons = JSON.parse(myPokemons);
      pokemons = await Promise.all(
        pokemons.map(async (pokemon) => {
          if (typeof pokemon.types === "string" || !pokemon.types[0].cor) {
            const details = await fetchPokemonDetails(pokemon.name);
            return {
              ...pokemon,
              types: details.types.map((type) => ({
                nome: this.traduzirTipo(type.type.name),
                cor: colors.types[type.type.name],
              })),
            };
          }
          return pokemon;
        })
      );
      this.setState({ myPokemons: pokemons });
    }
  }

  componentDidUpdate(_, prevState) {
    const { myPokemons } = this.state;
    if (prevState.myPokemons !== myPokemons) {
      AsyncStorage.setItem("myPokemons", JSON.stringify(myPokemons));
    }
  }

  traduzirTipo = (type) => {
    const traducoes = {
      normal: "Normal",
      fire: "Fogo",
      water: "Água",
      electric: "Elétrico",
      grass: "Planta",
      ice: "Gelo",
      fighting: "Lutador",
      poison: "Venenoso",
      ground: "Terra",
      flying: "Voador",
      psychic: "Psíquico",
      bug: "Inseto",
      rock: "Pedra",
      ghost: "Fantasma",
      dragon: "Dragão",
      dark: "Sombrio",
      steel: "Metálico",
      fairy: "Fada",
    };
    return traducoes[type] || type;
  };

  handleAddPokemon = async () => {
    try {
      const { myPokemons, searchPokemon } = this.state;
      this.setState({ loading: true });

      const pokemonDetails = await fetchPokemonDetails(
        searchPokemon.toLowerCase()
      );

      if (myPokemons.find((p) => p.id === pokemonDetails.id)) {
        alert("Pokémon já adicionado!");
        this.setState({ loading: false });
        return;
      }

      const pokemon = {
        id: pokemonDetails.id,
        name: pokemonDetails.name,
        types: pokemonDetails.types.map((type) => ({
          nome: this.traduzirTipo(type.type.name),
          cor: colors.types[type.type.name],
        })),
        sprite: pokemonDetails.sprites.front_default,
      };

      this.setState({
        myPokemons: [...myPokemons, pokemon],
        searchPokemon: "",
        loading: false,
      });
      Keyboard.dismiss();
    } catch (error) {
      alert("Pokémon não encontrado!");
      this.setState({ loading: false });
    }
  };

  render() {
    const { myPokemons, searchPokemon, loading } = this.state;
    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite o nome ou número do Pokémon"
            value={searchPokemon}
            onChangeText={(text) => this.setState({ searchPokemon: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddPokemon}
          />
          <SubmitButton loading={loading} onPress={this.handleAddPokemon}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Icon name="catching-pokemon" size={20} color="#fff" />
            )}
          </SubmitButton>
        </Form>
        <List
          showsVerticalScrollIndicator={false}
          data={myPokemons}
          keyExtractor={(pokemon) => String(pokemon.id)}
          renderItem={({ item }) => {
            const mainType = item.types[0];
            return (
              <PokemonCard style={{ backgroundColor: mainType.cor + "20" }}>
                <Avatar source={{ uri: item.sprite }} />
                <Name>{item.name}</Name>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 5,
                    marginBottom: 10,
                  }}
                >
                  {item.types.map((tipo) => (
                    <View
                      key={tipo.nome}
                      style={{
                        backgroundColor: tipo.cor,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 15,
                        marginHorizontal: 5,
                      }}
                    >
                      <Bio style={{ color: "white", fontWeight: "bold" }}>
                        {tipo.nome}
                      </Bio>
                    </View>
                  ))}
                </View>
                <ProfileButton
                  onPress={() => {
                    this.props.navigation.navigate("pokemon", {
                      pokemon: item,
                    });
                  }}
                  style={{ backgroundColor: mainType.cor }}
                >
                  <ProfileButtonText>Ver detalhes</ProfileButtonText>
                </ProfileButton>
                <ProfileButton
                  onPress={() => {
                    this.setState({
                      myPokemons: myPokemons.filter((p) => p.id !== item.id),
                    });
                  }}
                  style={{ backgroundColor: "#EE1515", marginTop: 5 }}
                >
                  <ProfileButtonText>Remover</ProfileButtonText>
                </ProfileButton>
              </PokemonCard>
            );
          }}
        />
      </Container>
    );
  }
}
