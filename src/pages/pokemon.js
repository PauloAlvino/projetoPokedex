import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View, Image } from 'react-native';
import { fetchPokemonDetails } from '../services/api';
import {
  Container,
  Header,
  Name,
  Bio,
  Stats,
  Stat,
  StatLabel,
  StatValue,
} from '../styles';

const colors = {
  types: {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC'
  }
};

export default class Pokemon extends Component {
  state = {
    pokemon: null,
    loading: true,
  };

  async componentDidMount() {
    const { route } = this.props;
    const { pokemon } = route.params;

    try {
      const details = await fetchPokemonDetails(pokemon.name);
      
      this.setState({
        pokemon: {
          ...pokemon,
          altura: details.height / 10, 
          peso: details.weight / 10, 
          tipos: details.types.map(t => ({
            nome: this.traduzirTipo(t.type.name),
            cor: colors.types[t.type.name]
          })),
          stats: details.stats.map(s => ({
            nome: this.traduzirStat(s.stat.name),
            valor: s.base_stat
          })),
          sprites: {
            frente: details.sprites.front_default,
            costas: details.sprites.back_default,
            shiny: details.sprites.front_shiny
          }
        },
        loading: false
      });
    } catch (error) {
      console.error('Erro ao carregar detalhes do pokemon:', error);
      this.setState({ loading: false });
    }
  }

  traduzirStat = (statName) => {
    const traducoes = {
      'hp': 'HP',
      'attack': 'Ataque',
      'defense': 'Defesa',
      'special-attack': 'Ataque Esp.',
      'special-defense': 'Defesa Esp.',
      'speed': 'Velocidade'
    };
    return traducoes[statName] || statName;
  }

  traduzirTipo = (type) => {
    const traducoes = {
      'normal': 'Normal',
      'fire': 'Fogo',
      'water': 'Água',
      'electric': 'Elétrico',
      'grass': 'Planta',
      'ice': 'Gelo',
      'fighting': 'Lutador',
      'poison': 'Venenoso',
      'ground': 'Terra',
      'flying': 'Voador',
      'psychic': 'Psíquico',
      'bug': 'Inseto',
      'rock': 'Pedra',
      'ghost': 'Fantasma',
      'dragon': 'Dragão',
      'dark': 'Sombrio',
      'steel': 'Metálico',
      'fairy': 'Fada'
    };
    return traducoes[type] || type;
  }

  render() {
    const { pokemon, loading } = this.state;

    if (loading) {
      return (
        <Container>
          <ActivityIndicator size="large" color="#EE1515" />
        </Container>
      );
    }

    if (!pokemon) {
      return (
        <Container>
          <Bio>Pokémon não encontrado</Bio>
        </Container>
      );
    }

    const mainType = pokemon.tipos[0];

    return (
      <Container>
        <Header style={{ backgroundColor: mainType.cor + '20' }}>
          <Name>{pokemon.name}</Name>
          <View style={styles.tiposContainer}>
            {pokemon.tipos.map(tipo => (
              <View key={tipo.nome} style={[styles.tipoBadge, { backgroundColor: tipo.cor }]}>
                <Bio style={styles.tipoTexto}>{tipo.nome}</Bio>
              </View>
            ))}
          </View>
        </Header>

        <View style={styles.spriteContainer}>
          <Image
            style={styles.sprite}
            source={{ uri: pokemon.sprites.frente }}
          />
          <Image
            style={styles.sprite}
            source={{ uri: pokemon.sprites.costas }}
          />
          <Image
            style={styles.sprite}
            source={{ uri: pokemon.sprites.shiny }}
          />
        </View>

        <Stats style={{ backgroundColor: mainType.cor + '20' }}>
          <Stat>
            <StatLabel>Altura:</StatLabel>
            <StatValue>{pokemon.altura}m</StatValue>
          </Stat>
          <Stat>
            <StatLabel>Peso:</StatLabel>
            <StatValue>{pokemon.peso}kg</StatValue>
          </Stat>
          {pokemon.stats.map(stat => (
            <Stat key={stat.nome}>
              <StatLabel>{stat.nome}:</StatLabel>
              <StatValue>{stat.valor}</StatValue>
            </Stat>
          ))}
        </Stats>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  spriteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    margin: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  sprite: {
    width: 100,
    height: 100,
  },
  tiposContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  tipoBadge: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  tipoTexto: {
    color: 'white',
    fontWeight: 'bold',
  }
});