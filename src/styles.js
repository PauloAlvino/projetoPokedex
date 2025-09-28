import styled from "styled-components/native";
import { RectButton } from "react-native-gesture-handler";

export const colors = {
  primary: "#EE1515",
  secondary: "#222224",
  accent: "#FFCB05",
  background: "#F5F5F5",
  text: "#222224",
  textLight: "#666666",
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

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${colors.background};
`;

export const Form = styled.View`
  flex-direction: row;
  padding: 15px;
  background-color: white;
  border-radius: 10px;
  elevation: 3;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: colors.textLight,
})`
  flex: 1;
  height: 45px;
  background: ${colors.background};
  border-radius: 8px;
  padding: 0 15px;
  font-size: 16px;
  color: ${colors.text};
`;

export const SubmitButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: ${colors.primary};
  border-radius: 8px;
  margin-left: 10px;
  width: 45px;
  height: 45px;
  opacity: ${(props) => (props.loading ? 0.7 : 1)};
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingTop: 20 },
})``;

export const PokemonCard = styled.View`
  background: white;
  margin: 0 10px 20px;
  border-radius: 15px;
  padding: 15px;
  align-items: center;
`;

export const ImageStyle = styled.Image`
  width: 120px;
  height: 120px;
  background: ${colors.background};
  border-radius: 60px;
`;

export const Name = styled.Text`
  font-size: 20px;
  color: ${colors.text};
  font-weight: bold;
  margin-top: 8px;
  text-transform: capitalize;
  text-align: center;
  letter-spacing: 1px;
`;

export const Label = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 14px;
  line-height: 20px;
  color: ${colors.textLight};
  margin-top: 5px;
  text-align: center;
`;

export const Button = styled(RectButton)`
  margin-top: 10px;
  align-self: stretch;
  border-radius: 20px;
  background: ${(props) => props.style?.backgroundColor || colors.primary};
  justify-content: center;
  align-items: center;
  height: 40px;
  elevation: 3;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;

export const ButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const Header = styled.View`
  padding: 20px;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 15px;
  margin-bottom: 20px;
`;

export const Stats = styled.View`
  background: white;
  border-radius: 15px;
  padding: 20px;
`;

export const Stat = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.background};
`;

export const StatLabel = styled.Text`
  font-size: 16px;
  color: ${colors.text};
  text-transform: capitalize;
  font-weight: bold;
`;

export const StatValue = styled.Text`
  font-size: 16px;
  color: ${colors.primary};
  font-weight: bold;
`;
