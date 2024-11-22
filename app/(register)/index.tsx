import { router } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import { Button } from "react-native-paper";

const RegisterPage = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	return (
		<View style={styles.container}>
			<Image style={styles.logo} source={require('@/assets/images/logo.png')}/>
			<Text style={styles.title}>Create your account</Text>

			<TextInput
				style={styles.input}
				placeholder="Username"
				value={username}
				onChangeText={setUsername}
			/>

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

			<TextInput
				style={styles.input}
				placeholder="Confirm password"
				value={confirmPassword}
				onChangeText={setConfirmPassword}
				secureTextEntry={true}
			/>

			<Button onPress={() => console.log('Kepencet')} mode="contained" buttonColor="#34A751" textColor="#FFFFFF" style={styles.button}>
				SIGN UP
			</Button>


			<Text style={styles.signinText}>
				Already have an account? <Text onPress={() => router.push('../(login)/')} style={styles.signinLink}> Sign In</Text>
			</Text>
		</View>
	);
}

export default RegisterPage;

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