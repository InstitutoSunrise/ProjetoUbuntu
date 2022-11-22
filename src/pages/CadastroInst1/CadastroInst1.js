import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { getAuth, fetchSignInMethodsForEmail } from "firebase/auth";
import MaskInput from "react-native-mask-input";

import { Ionicons } from "@expo/vector-icons";

import Backbutton from "../../components/Backbutton";
import validarCNPJ from "../../config/inputsValidations/cnpjValidation";
import telefone_validation from "../../config/inputsValidations/telNumberValidation";

export default function App({ navigation }) {
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha1, setSenha1] = useState("");
  const [senha2, setSenha2] = useState("");
  const [descricao, seDescricao] = useState("");

  const [erroAlert, setErroAlert] = useState(false);
  const [msgAlert, setMsgAlert] = useState("");
  const [errorTel, setErrorTel] = useState();
  const [errorCnpj, setErrorCnpj] = useState();

  const [revealSenha, setRevealSenha] = useState(true);
  const [revealSenha2, setRevealSenha2] = useState(true);

  const PassarValores = () => {
    if (
      email === "" ||
      senha1 === "" ||
      senha2 === "" ||
      nome === "" ||
      cnpj === "" ||
      telefone === "" ||
      descricao === ""
    ) {
      setErroAlert(true);
      setMsgAlert("Preencha todos os campos.");
    } else if (senha1.length < 6) {
      setErroAlert(true);
      setMsgAlert("Senha muito Curta (mínimo 6 dígitos.)");
    } else if (senha1 !== senha2) {
      setErroAlert(true);
      setMsgAlert("Confirme sua senha.");
    } else if (errorTel === true) {
      setErroAlert(true);
      setMsgAlert("Número de telefone inválido.");
    } else if (errorCnpj === true) {
      setErroAlert(true);
      setMsgAlert("CNPJ inválido.");
    } else {
      const auth = getAuth();
      fetchSignInMethodsForEmail(auth, email)
        .then((result) => {
          if (result.length >= 1) {
            setErroAlert(true);
            setMsgAlert("Email já cadastrado.");
          } else {
            navigation.navigate("CadastroInst2", {
              nome: nome,
              cnpj: cnpj,
              telefone: telefone,
              email: email,
              senha: senha2,
              descricao: descricao,
            });
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          switch (errorCode) {
            case "auth/invalid-email":
              setErroAlert(true);
              setMsgAlert("Digite uma email válido");
              break;
          }
        });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#0e52b2" />
      <ScrollView
        contentContainerStyle={{ alignItems: "center", width: "100%" }}
      >
        <Backbutton onClick={() => navigation.goBack()} />

        <Text style={styles.titulo}>CADASTRE-SE</Text>

        <TextInput
          placeholder="NOME DA INSTITUIÇÃO"
          style={styles.TextInput}
          value={nome}
          onChangeText={(text) => setNome(text)}
        />

        <TextInput
          placeholder="E-MAIL"
          style={styles.TextInput}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <View style={styles.containerInput}>
          <MaskInput
            placeholder="CNPJ"
            keyboardType={"number-pad"}
            style={errorCnpj ? styles.InputError : styles.Input}
            value={cnpj}
            onChangeText={(masked, unmasked) => {
              setCnpj(masked);
            }}
            onBlur={() =>
              validarCNPJ(cnpj) ? setErrorCnpj(false) : setErrorCnpj(true)
            }
            mask={[
              /\d/,
              /\d/,
              ".",
              /\d/,
              /\d/,
              /\d/,
              ".",
              /\d/,
              /\d/,
              /\d/,
              "/",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              "-",
              /\d/,
              /\d/,
            ]}
          />

          <MaskInput
            placeholder="TELEFONE"
            keyboardType={"number-pad"}
            style={errorTel ? styles.InputError : styles.Input}
            value={telefone}
            onChangeText={(masked, unmasked) => {
              setTelefone(masked);
            }}
            onBlur={() =>
              telefone_validation(telefone)
                ? setErrorTel(false)
                : setErrorTel(true)
            }
            mask={[
              "(",
              /\d/,
              /\d/,
              ")",
              " ",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              "-",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
            ]}
          />
        </View>

        <View style={styles.inputSenhaView}>
          <View style={{ width: "95%" }}>
            <TextInput
              style={styles.inputSenha}
              placeholder="DIGITE SUA SENHA"
              secureTextEntry={revealSenha}
              type="text"
              onChangeText={(text) => setSenha1(text)}
              value={senha1}
            />
          </View>
          <TouchableOpacity
            style={styles.iconView}
            onPress={() => setRevealSenha(!revealSenha)}
          >
            {revealSenha ? (
              <Ionicons
                style={{ marginRight: 5 }}
                name="eye"
                size={25}
                color="grey"
              />
            ) : (
              <Ionicons
                style={{ marginRight: 5 }}
                name="eye-off"
                size={25}
                color="grey"
              />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.inputSenhaView}>
          <View style={{ width: "95%" }}>
            <TextInput
              style={styles.inputSenha}
              placeholder="CONFIRME SUA SENHA"
              secureTextEntry={revealSenha2}
              type="text"
              onChangeText={(text) => setSenha2(text)}
              value={senha2}
            />
          </View>
          <TouchableOpacity
            style={styles.iconView}
            onPress={() => setRevealSenha2(!revealSenha2)}
          >
            {revealSenha2 ? (
              <Ionicons
                style={{ marginRight: 5 }}
                name="eye"
                size={25}
                color="grey"
              />
            ) : (
              <Ionicons
                style={{ marginRight: 5 }}
                name="eye-off"
                size={25}
                color="grey"
              />
            )}
          </TouchableOpacity>
        </View>

        <TextInput
          placeholder="DESCRIÇÃO"
          style={styles.TextInputdescrição}
          value={descricao}
          onChangeText={(text) => seDescricao(text)}
        />

        {erroAlert == true ? (
          <Text style={styles.textAlert}>{msgAlert}</Text>
        ) : undefined}

        <TouchableOpacity style={styles.botao} onPress={PassarValores}>
          <Text style={styles.textoBotao}>CONTINUAR</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  titulo: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#38B6FF",
    marginTop: 30,
  },
  containerInput: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "80%",
    marginTop: 15,
  },
  Input: {
    backgroundColor: "#e8eaea",
    paddingVertical: 16,
    paddingHorizontal: 25,
    borderRadius: 30,
    fontSize: 14,
    width: "49%",
  },
  inputSenhaView: {
    width: "80%",
    height: 65,
    alignItems: "center",
    backgroundColor: "#e8eaea",
    borderRadius: 30,
    marginTop: 15,
    flexDirection: "row",
  },
  inputSenha: {
    marginLeft: 25,
    width: "70%",
    fontSize: 14,
  },
  iconView: {
    position: "absolute",
    right: 0,
    width: "20%",
  },
  InputError: {
    backgroundColor: "#e8eaea",
    borderColor: "#ff4040",
    borderWidth: 1,
    color: "#ff4040",
    paddingVertical: 16,
    paddingHorizontal: 25,
    borderRadius: 30,
    fontSize: 14,
    width: "49%",
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
  TextInputdescrição: {
    width: "80%",
    height: 100,
    marginTop: 15,
    backgroundColor: `#e8eaea`,
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 25,
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
  },
  textAlert: {
    color: "red",
    marginTop: 5,
  },
});
