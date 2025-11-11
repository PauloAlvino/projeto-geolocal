// screens/Cadastro.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Cadastro({ onRegisterUser }) {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    name: "",
    street: "",
    number: "",
    city: "",
    state: "",
  });

  const handleChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = async () => {
    if (Object.values(formData).some((value) => value === "")) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const sucesso = await onRegisterUser(formData);

    if (sucesso) {
      setFormData({ name: "", street: "", number: "", city: "", state: "" });
      navigation.navigate("Maps");
    }
  };

  const handleGoToMap = () => {
    navigation.navigate("Maps");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cadastrar Novo Endereço</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        value={formData.name}
        onChangeText={(text) => handleChange("name", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Rua / Avenida"
        value={formData.street}
        onChangeText={(text) => handleChange("street", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Número"
        value={formData.number}
        onChangeText={(text) => handleChange("number", text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        value={formData.city}
        onChangeText={(text) => handleChange("city", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Estado (Ex: SP)"
        value={formData.state}
        onChangeText={(text) => handleChange("state", text)}
      />

      <Button title="Cadastrar e Ver no Mapa" onPress={handleSubmit} />

      <View style={styles.divider} />

      <Button
        title="Ver Mapa (Sem Cadastrar)"
        onPress={handleGoToMap}
        color="#888"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  divider: { height: 10 },
});
