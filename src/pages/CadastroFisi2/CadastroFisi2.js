import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import MaskInput from "react-native-mask-input";

import Backbutton from "../../components/Backbutton";

export default function CadastroFisi2({ navigation, route }) {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");

  const [erroAlert, setErroAlert] = useState(false);
  const [msgAlert, setMsgAlert] = useState("");

  const [cepValido, setCepValido] = useState(true);

  const fetchCep = (cep) => {
    cep = cep.replace(/[^\d]+/g, "");
    console.log(cep.length);
    if (cep.length !== 8) {
      setCepValido(false);
    } else {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => res.json())
        .then((data) => {
          if (data.erro === "true") {
            setCepValido(false);
          } else {
            setCepValido(true);
            setEndereco(data.logradouro);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const PassarValores = () => {
    if (cep === "" || endereco === "" || numero === "") {
      // alert('Preencha os campos');
      setErroAlert(true);
      setMsgAlert("Preencha todos os campos.");
    } else if (cepValido === false) {
      //   alert("CEP Inválido");
      setErroAlert(true);
      setMsgAlert("CEP inválido.");
    } else {
      navigation.navigate("AdicionarFotoFis", {
        cep: cep,
        endereco: endereco,
        numero: numero,
        complemento: complemento,
        userEmail: route.params.userEmail,
        userSenha: route.params.userSenha,
        userTelefone: route.params.userTelefone,
        userNome: route.params.userNome,
        userSobrenome: route.params.userSobrenome,
        userDatanascimento: route.params.userDatanascimento,
        userDescricao: route.params.userDescricao,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Backbutton onClick={() => navigation.goBack()} />

      <ScrollView>
        <Text style={styles.titulo}>CADASTRE-SE</Text>

        <View style={styles.viewInput}>
          <MaskInput
            placeholder="DIGITE SEU CEP"
            keyboardType={"number-pad"}
            style={cepValido ? styles.TextInput : styles.TextInputError}
            value={cep}
            onChangeText={(masked, unmasked) => {
              setCep(masked);
            }}
            onBlur={() => fetchCep(cep)}
            mask={[/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
          />

          <TextInput
            placeholder="ENDEREÇO"
            style={styles.TextInput}
            value={endereco}
            onChangeText={(text) => setEndereco(text)}
          />

          <TextInput
            placeholder="NUMERO"
            style={styles.TextInput}
            value={numero}
            onChangeText={(text) => setNumero(text)}
            keyboardType={"number-pad"}
          />

          <TextInput
            placeholder="COMPLEMENTO"
            style={styles.TextInput}
            value={complemento}
            onChangeText={(text) => setComplemento(text)}
          />

          {erroAlert == true ? (
            <Text style={styles.textAlert}>{msgAlert}</Text>
          ) : undefined}

          <TouchableOpacity style={styles.botao} onPress={PassarValores}>
            <Text style={styles.textoBotao}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titulo: {
    width: "100%",
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    color: "#38B6FF",
    marginTop: 30,
  },
  viewInput: {
    width: "100%",
    alignItems: "center",
  },
  TextInput: {
    width: "80%",
    marginTop: 15,
    backgroundColor: "#e8eaea",
    paddingVertical: 16,
    paddingHorizontal: 25,
    borderRadius: 30,
    fontSize: 14,
  },
  TextInputError: {
    backgroundColor: "#e8eaea",
    borderColor: "#ff4040",
    borderWidth: 1,
    color: "#ff4040",
    paddingVertical: 16,
    paddingHorizontal: 25,
    borderRadius: 30,
    fontSize: 14,
    width: "80%",
    marginTop: 15,
  },
  botao: {
    marginVertical: 30,
    width: 200,
    backgroundColor: "#0e52b2",
    padding: 12,
    borderRadius: 30,
  },
  textoBotao: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  textAlert: {
    color: "red",
    marginTop: 5,
  },
});
