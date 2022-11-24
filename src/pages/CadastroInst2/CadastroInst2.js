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

export default function App({ navigation, route }) {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [alimento, setAlimento] = useState(false);
  const [horario, setHorario] = useState("");
  const [voluntario, setVoluntario] = useState(false);
  const [banho, setBanho] = useState(false);

  const [erroAlert, setErroAlert] = useState(false);
  const [msgAlert, setMsgAlert] = useState("");
  const [erroAlert2, setErroAlert2] = useState(false);

  const [cepValido, setCepValido] = useState(true);

  const Alimento = () => {
    if (alimento == true) {
      setAlimento(false);
    } else {
      setAlimento(true);
    }
  };

  const Banho = () => {
    if (banho == true) {
      setBanho(false);
    } else {
      setBanho(true);
    }
  };

  const Voluntario = () => {
    if (voluntario == true) {
      setVoluntario(false);
    } else {
      setVoluntario(true);
    }
  };

  const fetchCep = (cep) => {
    cep = cep.replace(/[^\d]+/g, "");
    console.log(cep.length);
    if (cep.length !== 8) {
      setCepValido(false);
    } else {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => res.json())
        .then((data) => {
          if (data.erro == true) {
            setCepValido(false);
            setEndereco("");
          } else {
            setCepValido(true);
            setEndereco(data.logradouro);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const PassarValores = () => {
    setErroAlert(false);
    setErroAlert2(false);
    if (
      cep === "" ||
      endereco === "" ||
      numero === "" ||
      horario === ""
    ) {
      setErroAlert(true);
      setMsgAlert("Preencha todos os campos.");
    } else if (cepValido === false) {
      setErroAlert(true);
      setMsgAlert("CEP inválido.");
    } else if (banho == false || alimento == false || voluntario == false) {
      setErroAlert2(true);
      setMsgAlert("Selecione pelo menos um serviço");
    } else {
      navigation.navigate("AdicionarFoto", {
        cep: cep,
        endereco: endereco,
        numero: numero,
        complemento: complemento,
        alimento: alimento,
        banho: banho,
        horario: horario,
        voluntario: voluntario,
        email: route.params.email,
        senha: route.params.senha,
        cnpj: route.params.cnpj,
        telefone: route.params.telefone,
        descricao: route.params.descricao,
        nome: route.params.nome,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={{marginTop: 30}}>
        <Backbutton onClick={() => navigation.goBack()} />
      </View>
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

          <MaskInput
            placeholder="HORARIO DE FUNCIONAMENTO: 00:00 - 12:00"
            style={styles.TextInput}
            value={horario}
            onChangeText={(masked, unmasked) => {
              setHorario(masked);
            }}
            mask={[
              /\d/,
              /\d/,
              ":",
              /\d/,
              /\d/,
              " - ",
              /\d/,
              /\d/,
              ":",
              /\d/,
              /\d/,
            ]}
          />

          {erroAlert == true ? (
            <Text style={styles.textAlert}>{msgAlert}</Text>
          ) : undefined}

          <Text style={styles.textService}>
            Selecione os serviços da sua instituição:
          </Text>

          <TouchableOpacity
            style={alimento == false ? styles.btnService : styles.btnServiceOn}
            onPress={Alimento}
          >
            <Text
              style={
                alimento == false
                  ? styles.btnTextService
                  : styles.btnTextServiceOn
              }
            >
              Alimentação
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={banho == false ? styles.btnService : styles.btnServiceOn}
            onPress={Banho}
          >
            <Text
              style={
                banho == false ? styles.btnTextService : styles.btnTextServiceOn
              }
            >
              Banho
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={
              voluntario == false ? styles.btnService : styles.btnServiceOn
            }
            onPress={Voluntario}
          >
            <Text
              style={
                voluntario == false
                  ? styles.btnTextService
                  : styles.btnTextServiceOn
              }
            >
              Voluntáriados
            </Text>
          </TouchableOpacity>

          {erroAlert2 == true ? (
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
    marginTop: 20,
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
  textService: {
    width: "80%",
    fontSize: 14,
    color: "#0e52b2",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 20,
  },
  btnService: {
    width: "80%",
    marginTop: 15,
    backgroundColor: "#e8eaea",
    paddingVertical: 16,
    paddingHorizontal: 25,
    borderRadius: 30,
    fontSize: 14,
    alignItems: "center",
  },
  btnServiceOn: {
    width: "80%",
    marginTop: 15,
    backgroundColor: "#0e52b2",
    paddingVertical: 16,
    paddingHorizontal: 25,
    borderRadius: 30,
    fontSize: 14,
    alignItems: "center",
  },
  btnTextService: {
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  btnTextServiceOn: {
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
    color: "#fff",
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
