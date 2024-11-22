import { router } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import { Button } from "react-native-paper";

const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<View style={styles.container}>
			<Image style={styles.logo} source={require('@/assets/images/logo.png')}/>
			<Text style={styles.title}>Sign in to your account</Text>

			<TextInput
				style={styles.input}
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
			/>

			<TextInput
				style={styles.input}
				placeholder="Password"
				value={password}
				onChangeText={setPassword}
				secureTextEntry={true}
			/>

			<Button onPress={() => console.log('Keteken')} mode="contained" buttonColor="#34A751" textColor="#FFFFFF" style={styles.button}>
				SIGN IN
			</Button>


			<Text style={styles.signinText}>
				Don't have an account? <Text onPress={() => router.push('../(register)/')} style={styles.signinLink}> Sign Up</Text>
			</Text>
		</View>
	);
}

export default LoginPage;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 20,
	},
	logo: {
		width: 80,
		height: 80,
		marginBottom: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20,
	},
	input: {
		borderWidth: 1,
		width: '80%',
		height: 50,
		borderRadius: 8,
		marginBottom: 20,
		backgroundColor: '#F6F6F6',
		borderColor: '#ccc',
		paddingHorizontal: 15,
	},
	button: {
		width: '80%',
		borderRadius: 8,
		marginTop: 20,
	},
	signinText: {
		marginTop: 20,
		fontSize: 14,
	},
	signinLink: {
		color: '#34A751',
		fontWeight: 'bold',
	}
});