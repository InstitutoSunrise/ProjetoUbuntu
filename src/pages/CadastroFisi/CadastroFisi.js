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
import MaskInput from "react-native-mask-input";
import { getAuth, fetchSignInMethodsForEmail } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

import { Ionicons } from "@expo/vector-icons";

import telefone_validation from "../../config/inputsValidations/telNumberValidation";

import db from "../../config/configFirebase";
import Backbutton from "../../components/Backbutton";

export default function Pagess({ navigation }) {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [datanascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha1, setSenha1] = useState("");
  const [senha2, setSenha2] = useState("");
  const [descricao, seDescricao] = useState("");

  const [erroAlert, setErroAlert] = useState(false);
  const [msgAlert, setMsgAlert] = useState("");

  const [revealSenha, setRevealSenha] = useState(true);
  const [revealSenha2, setRevealSenha2] = useState(true);

  const [errorTel, setErrorTel] = useState();

  const Cadastrar = () => {
    if (
      email === "" ||
      senha1 === "" ||
      senha2 === "" ||
      nome === "" ||
      sobrenome === "" ||
      datanascimento === "" ||
      telefone === ""
    ) {
      // alert("Preencha os campos");
      setErroAlert(true);
      setMsgAlert("Preencha todos os campos.");
    } else if (senha1.length < 6) {
      // alert("Senha muito Curta (mínimo 6 dígitos)");
      setErroAlert(true);
      setMsgAlert("Senha muito Curta (mínimo 6 dígitos)");
    } else if (senha1 !== senha2) {
      // alert("Confirme sua senha");
      setErroAlert(true);
      setMsgAlert("Confirme sua senha");
    } else if (errorTel === true) {
      // alert("Número de telefone inválido");
      setErroAlert(true);
      setMsgAlert("Número de telefone inválido");
    } else {
      const auth = getAuth();

      fetchSignInMethodsForEmail(auth, email)
        .then((result) => {
          console.log(result);
          if (result.length >= 1) {
            // alert("Email já cadastrado");
            setErroAlert(true);
            setMsgAlert("Email já cadastrado");
          } else {
            navigation.navigate("CadastroFisi2", {
              userEmail: email,
              userSenha: senha2,
              userNome: nome,
              userSobrenome: sobrenome,
              userDatanascimento: datanascimento,
              userTelefone: telefone,
              userDescricao: descricao,
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
              // alert("Digite um email válido");
              setErroAlert(true);
              setMsgAlert("Digite um email válido");
              break;
          }
        });
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ alignItems: "center", width: "100%" }}
      >
        <Backbutton onClick={() => navigation.goBack()} />
        <StatusBar barStyle="dark-content" backgroundColor="#0e52b2" />

        <Text style={styles.titulo}>CADASTRE-SE</Text>

        <TextInput
          placeholder="DIGITE SEU NOME"
          style={styles.TextInput}
          value={nome}
          onChangeText={(text) => setNome(text)}
        />

        <TextInput
          placeholder="SOBRENOME"
          style={styles.TextInput}
          value={sobrenome}
          onChangeText={(text) => setSobrenome(text)}
        />

        <View style={styles.containerInput}>
          <MaskInput
            placeholder="DATA DE NASCIMENTO"
            keyboarType={"numeric"}
            style={styles.Input}
            value={datanascimento}
            onChangeText={(masked, unmasked) => {
              setDataNascimento(masked);
            }}
            mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
          />

          <MaskInput
            placeholder="TELEFONE"
            keyboarType={"number-pad"}
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

        <TextInput
          placeholder="E-MAIL"
          style={styles.TextInput}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

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

        <TouchableOpacity style={styles.botao} onPress={Cadastrar}>
          <Text style={styles.textoBotao}>CONTINUAR</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
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
