import React, { useState, useEffect } from "react";

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import MaskInput from "react-native-mask-input";

import firebase from "../../config/configFirebase";
import {
  getAuth,
  updateEmail,
  updatePassword,
  EmailAuthCredential,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import db from "../../config/configFirebase";

import telefone_validation from "../../config/inputsValidations/telNumberValidation";

import Editando from "../../components/Carregamento/editando";
import FinalEditando from "../../components/Carregamento/finalEditando";
import ErroEditando from "../../components/Carregamento/editarInfosUser/erroEditando";
import Backbutton from "../../components/Backbutton";

export default function EditarInformacoesFis({ navigation, route }) {
  const [datanascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmeSenha, setConfirmeSenha] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [senhaIncorreta, setSenhaIncorreta] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const [carregamento, setCarregamento] = useState(false);
  const [finalCarregamento, setFinalCarregamento] = useState(false);
  const [finalCarregamentoError, setFinalCarregamentoError] = useState(false);

  const [errorTel, setErrorTel] = useState();
  const [revealSenhaAtual, setRevealSenhaAtual] = useState(true);
  const [revealSenha, setRevealSenha] = useState(true);
  const [revealConfirmeSenha, setRevealConfirmeSenha] = useState(true);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    setTelefone(route.params.numTel);
    setEmail(route.params.email);
    setDataNascimento(route.params.dataNasc);
  }, [route.params.docId]);

  const changePassword = (newPassword) => {
    updatePassword(user, newPassword)
      .then(() => {
        console.log("Password updated!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeEmail = (newEmail) => {
    updateEmail(user, newEmail)
      .then(() => {
        console.log("Email updated!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reauthenticate = (currentPassword) => {
    const cred = EmailAuthProvider.credential(user.email, currentPassword);
    return reauthenticateWithCredential(user, cred);
  };

  async function editarInformacoes(newEmail, newPassword) {
    if (datanascimento === "" || email === "" || telefone === "") {
      alert("Preencha todos os campos");
      setModalVisible(!modalVisible);
    } else if (errorTel === true) {
      alert("Número de telefone inválido");
      setModalVisible(!modalVisible);
    } else if (senhaAtual === "") {
      alert("Digite sua senha");
      setModalVisible(!modalVisible);
      setSenhaIncorreta(true);
    } else {
      setModalVisible(!modalVisible);
      setCarregamento(true);

      reauthenticate(senhaAtual)
        .then((response) => {
          if (newEmail !== user.email) {
            changeEmail(newEmail);
          } else if (senha !== "") {
            if (senha.length < 6) {
              alert("Senha muito curta (mínimo 6 digitos)");
              setModalVisible(!modalVisible);
              setCarregamento(false);
              setFinalCarregamentoError(true);
              return;
            } else if (senha !== confirmeSenha) {
              alert("Senhas não correspondem");
              setModalVisible(!modalVisible);
              setCarregamento(false);
              setFinalCarregamentoError(true);
              return;
            } else {
              changePassword(newPassword);
            }
          }

          const userRef = doc(db, "Usuários", route.params.docId);

          setDoc(
            userRef,
            {
              datanascimento: datanascimento,
              email: email,
              telefone: telefone,
            },
            { merge: true }
          )
            .then((refs) => {
              console.log("Dados atualizados com sucesso!");
            })
            .catch((error) => {
              console.log(error);
            });

          setCarregamento(false);
          setFinalCarregamento(true);
          setSenhaIncorreta(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          switch (errorCode) {
            case "auth/wrong-password":
              setSenhaIncorreta(true);
              break;
          }
          setCarregamento(false);
          setFinalCarregamentoError(true);
        });
    }
  }

  const confirmarMudancas = () => {
    setModalVisible(!modalVisible);
  };

  const confirm = () => {
    setFinalCarregamento(false);
    navigation.navigate("Entrar");
  };

  const confirmError = () => {
    setFinalCarregamentoError(false);
  };

  return (
    <View style={styles.container}>
      <Backbutton onClick={() => navigation.goBack()} />

      <ScrollView>
        <Text style={styles.titulo}>EDITAR INFORMAÇÕES</Text>

        <View style={styles.inputsView}>
          <MaskInput
            placeholder="DATA DE NASCIMENTO"
            keyboarType={"numeric"}
            style={styles.TextInput}
            value={datanascimento}
            onChangeText={(masked, unmasked) => {
              setDataNascimento(masked);
            }}
            mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
          />

          <MaskInput
            placeholder="TELEFONE"
            keyboardType={"number-pad"}
            style={errorTel ? styles.InputError : styles.TextInput}
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

          <TextInput
            placeholder="E-MAIL"
            style={styles.TextInput}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          <View
            style={senhaIncorreta ? styles.inputViewError : styles.inputView}
          >
            <View style={{ width: "95%" }}>
              <TextInput
                style={senhaIncorreta ? styles.wrongPW : styles.input}
                placeholder="DIGITE A SENHA ATUAL"
                secureTextEntry={revealSenhaAtual}
                type="text"
                onChangeText={(text) => setSenhaAtual(text)}
                value={senhaAtual}
              />
            </View>
            <TouchableOpacity
              style={styles.iconView}
              onPress={() => setRevealSenhaAtual(!revealSenhaAtual)}
            >
              {revealSenhaAtual ? (
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
          <View style={styles.inputView}>
            <View style={{ width: "95%" }}>
              <TextInput
                style={styles.inputChangePW}
                placeholder="DIGITE A SUA NOVA SENHA (CASO QUEIRA MUDAR)"
                secureTextEntry={revealSenha}
                type="text"
                onChangeText={(text) => setSenha(text)}
                value={senha}
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
          <View style={styles.inputView}>
            <View style={{ width: "95%" }}>
              <TextInput
                style={styles.inputChangePW}
                placeholder="CONFIRME SUA NOVA SENHA (CASO QUEIRA MUDAR)"
                secureTextEntry={revealConfirmeSenha}
                type="text"
                onChangeText={(text) => setConfirmeSenha(text)}
                value={confirmeSenha}
              />
            </View>
            <TouchableOpacity
              style={styles.iconView}
              onPress={() => setRevealConfirmeSenha(!revealConfirmeSenha)}
            >
              {revealConfirmeSenha ? (
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
          <TouchableOpacity style={styles.botao} onPress={confirmarMudancas}>
            <Text style={styles.textoBotao}>SALVAR</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalView}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>
                Você tem certeza que deseja fazer essas atualizações?
              </Text>
              <Text
                style={{ fontSize: 15, fontWeight: "600", color: "#0e52b2" }}
              >
                (Não é possível reverter)
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  style={styles.modalBtn}
                  onPress={() => editarInformacoes(email, senha)}
                >
                  <Text style={styles.modalBtnText}>CONFIRMAR</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalBtn}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.modalBtnText}>CANCELAR</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {carregamento ? <Editando /> : undefined}
        {finalCarregamento ? <FinalEditando onClick={confirm} /> : undefined}
        {finalCarregamentoError ? (
          <ErroEditando onClick={confirmError} />
        ) : undefined}
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
    fontSize: 40,
    fontWeight: "bold",
    color: "#38B6FF",
    marginTop: 30,
    textAlign: "center",
    alignSelf: "center",
  },
  inputsView: {
    width: "100%",
    alignItems: "center",
    marginVertical: 30,
  },
  containerInput: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "80%",
    marginTop: 10,
  },
  TextInput: {
    width: "80%",
    marginTop: 10,
    backgroundColor: "#e8eaea",
    paddingVertical: 16,
    paddingHorizontal: 25,
    borderRadius: 30,
    fontSize: 14,
  },
  botao: {
    marginVertical: 15,
    width: "45%",
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
  InputError: {
    backgroundColor: "#e8eaea",
    borderColor: "#ff4040",
    borderWidth: 1,
    color: "#ff4040",
    paddingVertical: 16,
    paddingHorizontal: 25,
    borderRadius: 30,
    marginTop: 10,
    fontSize: 14,
    width: "80%",
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "90%",
    borderRadius: 40,
    backgroundColor: "#fff",
    padding: 25,
  },
  modalText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0e52b2",
    textTransform: "uppercase",
  },
  modalBtn: {
    marginTop: 35,
    width: "45%",
    backgroundColor: "#38B6FF",
    padding: 20,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },
  inputView: {
    width: "80%",
    height: 65,
    alignItems: "center",
    backgroundColor: "#e8eaea",
    borderRadius: 30,
    marginTop: 15,
    flexDirection: "row",
  },
  inputViewError: {
    width: "80%",
    height: 65,
    alignItems: "center",
    backgroundColor: "#e8eaea",
    borderRadius: 30,
    marginTop: 15,
    flexDirection: "row",
    borderColor: "#ff4040",
    borderWidth: 1,
    color: "#ff4040",
  },
  input: {
    marginLeft: 25,
    width: "70%",
    fontSize: 14,
  },
  inputChangePW: {
    marginLeft: 25,
    width: "70%",
    fontSize: 9.5,
  },
  wrongPW: {
    marginLeft: 25,
    width: "70%",
    fontSize: 14,
    color: "#ff4040",
  },
  iconView: {
    position: "absolute",
    right: 0,
    width: "20%",
  },
});
