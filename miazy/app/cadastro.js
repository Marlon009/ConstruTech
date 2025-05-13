import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [isRealtor, setIsRealtor] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    creci: ''
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return false;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return false;
    }

    if (isRealtor && !formData.creci) {
      Alert.alert('Erro', 'CRECI é obrigatório para corretores');
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (isLogin) {
      Alert.alert('Login realizado', 'Bem-vindo de volta!');
    } else {
      const accountType = isRealtor ? 'Corretor' : 'Cliente';
      Alert.alert('Sucesso', `Conta de ${accountType} criada com sucesso!`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {isLogin ? 'Acessar Conta' : 'Criar Conta'}
          </Text>
          <Text style={styles.subtitle}>
            {isLogin ? 'Faça login para continuar' : 'Preencha os campos para se cadastrar'}
          </Text>
        </View>

        <View style={styles.form}>
          {!isLogin && (
            <TextInput
              style={styles.input}
              placeholder="Nome completo"
              placeholderTextColor="#999"
              value={formData.name}
              onChangeText={(text) => handleChange('name', text)}
            />
          )}
          
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#999"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => handleChange('email', text)}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#999"
            secureTextEntry
            value={formData.password}
            onChangeText={(text) => handleChange('password', text)}
          />
          
          {!isLogin && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Confirmar Senha"
                placeholderTextColor="#999"
                secureTextEntry
                value={formData.confirmPassword}
                onChangeText={(text) => handleChange('confirmPassword', text)}
              />

              {isRealtor && (
                <TextInput
                  style={styles.input}
                  placeholder="CRECI"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  value={formData.creci}
                  onChangeText={(text) => handleChange('creci', text)}
                />
              )}
            </>
          )}
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>
            {isLogin ? 'Entrar' : 'Cadastrar'}
          </Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {isLogin ? 'Não tem uma conta? ' : 'Já tem uma conta? '}
          </Text>
          <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.footerLink}>
              {isLogin ? 'Criar conta' : 'Faça login'}
            </Text>
          </TouchableOpacity>
        </View>

        {!isLogin && (
          <TouchableOpacity 
            style={styles.realtorButton}
            onPress={() => {
              setIsRealtor(!isRealtor);
              if (isRealtor) {
                handleChange('creci', ''); // Limpa o CRECI ao desmarcar
              }
            }}
          >
            <Text style={styles.realtorButtonText}>
              {isRealtor 
                ? 'Voltar para cadastro de cliente' 
                : 'Registrar como Corretor? Clique aqui'}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F4FD',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2A4D73',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B9EBF',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  form: {
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#D9E6F2',
  },
  button: {
    backgroundColor: '#2A4D73',
    borderRadius: 10,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#6B9EBF',
    fontSize: 16,
  },
  footerLink: {
    color: '#2A4D73',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  realtorButton: {
    marginTop: 25,
    alignItems: 'center',
  },
  realtorButtonText: {
    color: '#6B9EBF',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});

export default RegisterScreen;