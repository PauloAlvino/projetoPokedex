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
  PokemonCard,
  ImageStyle,
  Name,
  Button,
  ButtonText,
  Label,
  colors,
} from "../styles";

export default class Main extends Component {
  state = {
    searchPokemon: "",
    myPokemons: [],
    loading: false,
  };

  async componentDidMount() {
    try {
      const savedPokemons = await AsyncStorage.getItem("myPokemons");
      if (savedPokemons) {
        this.setState({ myPokemons: JSON.parse(savedPokemons) });
      }
    } catch (error) {
      console.error("Falha ao carregar Pokémons salvos", error);
    } finally {
      this.setState({ loadingInitial: false });
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
    const { myPokemons, searchPokemon } = this.state;
    if (!searchPokemon) return;
    this.setState({ loading: true });
    Keyboard.dismiss();

    try {
      const pokemon = await fetchPokemonDetails(searchPokemon.toLowerCase());
      if (myPokemons.find((p) => p.id === pokemon.id)) {
        alert("Este Pokémon já está na sua Pokédex!");
        return;
      }
      const newPokemon = {
        id: pokemon.id,
        name: pokemon.name,
        sprites: pokemon.sprites,
        image: pokemon.sprites.other["official-artwork"].front_default,
        types: pokemon.types.map((typeInfo) => ({
          nome: this.traduzirTipo(typeInfo.type.name),
          cor: colors.types[typeInfo.type.name],
        })),
        altura: pokemon.height / 10,
        peso: pokemon.weight / 10,
        stats: pokemon.stats.map((s) => ({
          nome: s.stat.name,
          valor: s.base_stat,
        })),
      };

      this.setState({
        myPokemons: [...myPokemons, newPokemon],
        searchPokemon: "",
      });
    } catch (error) {
      alert("Pokémon não encontrado!");
    } finally {
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
                <ImageStyle
                  source={{ uri: item.image }}
                  style={{ borderWidth: 2, borderColor: "black" }}
                />
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
                      <Label style={{ color: "white", fontWeight: "bold" }}>
                        {tipo.nome}
                      </Label>
                    </View>
                  ))}
                </View>
                <Button
                  onPress={() => {
                    this.props.navigation.navigate("pokemon", {
                      pokemon: item,
                    });
                  }}
                  style={{ backgroundColor: mainType.cor }}
                >
                  <ButtonText>Ver detalhes</ButtonText>
                </Button>
                <Button
                  onPress={() => {
                    this.setState({
                      myPokemons: myPokemons.filter((p) => p.id !== item.id),
                    });
                  }}
                  style={{ backgroundColor: "#EE1515", marginTop: 5 }}
                >
                  <ButtonText>Remover</ButtonText>
                </Button>
              </PokemonCard>
            );
          }}
        />
      </Container>
    );
  }
}
