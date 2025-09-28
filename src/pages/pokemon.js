import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';

import {
  Container,
  Header,
  Name,
  Label,
  Stats,
  Stat,
  StatLabel,
  StatValue,
  ImageStyle,
} from '../styles';

export default class Pokemon extends Component {
  traduzirStat = (statName) => {
    const traducoes = {
      'hp': 'HP', 'attack': 'Ataque', 'defense': 'Defesa',
      'special-attack': 'Ataque Esp.', 'special-defense': 'Defesa Esp.', 'speed': 'Velocidade'
    };
    return traducoes[statName] || statName;
  };

  render() {
    const { pokemon } = this.props.route.params;

    if (!pokemon) {
      return (
        <Container style={styles.center}>
          <Label>Pokémon não encontrado!</Label>
        </Container>
      );
    }
    const mainType = pokemon.types[0];
    const mainTypeColor = mainType.cor;

    return (
      <Container>
        <ScrollView>
          <Header style={{ backgroundColor: mainTypeColor + '20', marginBottom: 10 }}>
            <ImageStyle source={{ uri: pokemon.image }} style={{ width: 150, height: 150 }} />
            <Name>{pokemon.name}</Name>
            <View style={styles.tiposContainer}>
              {pokemon.types && pokemon.types.map((tipo) => (
                <View
                  key={tipo.nome}
                  style={[styles.tipoBadge, { backgroundColor: tipo.cor }]}
                >
                  <Label style={styles.tipoTexto}>{tipo.nome}</Label>
                </View>
              ))}
            </View>
          </Header>

          <View style={styles.spriteContainer}>
            <View style={styles.spriteBox}>
              <Image style={styles.sprite} source={{ uri: pokemon.sprites.front_default }} />
              <Label style={styles.spriteLabel}>Normal</Label>
            </View>
           {pokemon.sprites.back_default ?             <View style={styles.spriteBox}>
              <Image style={styles.sprite} source={{ uri: pokemon.sprites.back_default }} />
              <Label style={styles.spriteLabel}>De Costas</Label>
            </View> : null}
            { pokemon.sprites.front_shiny ? <View style={styles.spriteBox}>
              <Image style={styles.sprite} source={{ uri: pokemon.sprites.front_shiny }} />
              <Label style={styles.spriteLabel}>Shiny</Label>
            </View> : null}
          </View>

          <Stats style={{ backgroundColor: mainTypeColor + '20', margin: 10 }}>
            <Stat>
              <StatLabel>Altura:</StatLabel>
              <StatValue>{pokemon.altura}m</StatValue>
            </Stat>
            <Stat>
              <StatLabel>Peso:</StatLabel>
              <StatValue>{pokemon.peso}kg</StatValue>
            </Stat>
            {pokemon.stats && pokemon.stats.map((stat) => (
              <Stat key={stat.nome}>
                <StatLabel>{this.traduzirStat(stat.nome)}:</StatLabel>
                <StatValue>{stat.valor}</StatValue>
              </Stat>
            ))}
          </Stats>
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spriteContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'flex-start',
    padding: 10,
    backgroundColor: "white",
    borderRadius: 15,
    margin: 10,
    elevation: 3,
  },
  spriteBox: {
    alignItems: 'center',
  },
  sprite: {
    width: 90,
    height: 90,
  },
  spriteLabel: {
    marginTop: 5,
    fontSize: 12,
    color: 'gray',
  },
  tiposContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  tipoBadge: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  tipoTexto: {
    color: "white",
    fontWeight: "bold",
    textTransform: 'capitalize',
  },
});