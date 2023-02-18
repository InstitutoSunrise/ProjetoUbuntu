import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function InputCodigos() {
  return (
    <View style={estilos.container}>
      <TextInput
        style={estilos.inputsEstilo}
        keyboardType="numeric"
        maxLength={1}
      />
      <TextInput
        style={estilos.inputsEstilo}
        keyboardType="numeric"
        maxLength={1}
      />
      <TextInput
        style={estilos.inputsEstilo}
        keyboardType="numeric"
        maxLength={1}
      />
      <TextInput
        style={estilos.inputsEstilo}
        keyboardType="numeric"
        maxLength={1}
      />
      <TextInput
        style={estilos.inputsEstilo}
        keyboardType="numeric"
        maxLength={1}
      />
      <TextInput
        style={estilos.inputsEstilo}
        keyboardType="numeric"
        maxLength={1}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  inputsEstilo: {
    backgroundColor: "#e8eaea",
    width: 38,
    height: 60,
    marginRight: 9.5,
    fontSize: 25,
    textAlign: "center",
  },
})