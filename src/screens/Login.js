import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableHighlight,
	Image,
	Button
  } from 'react-native';
import Logo from "../assets/react.png"
import CustomInput from "../components/CustomInput";
import UserSchema from "../schema/User";
import Realm from "realm";

class Login extends Component {
	constructor(props) {
		super(props)
	}

	processLogin(){
		Realm.open({schema: [UserSchema]})
		.then(realm => {
			realm.write(() => {
				const AuthUser = realm.create('User', {
					id: "1",
					firstName: "User",
					lastName: "Name",
				});
				this.props.navigation.navigate("Category");
			});
		});	
	}

	render() {
		return (
			<View style={styles.body}>
				<Image source={Logo} style={{width:100,resizeMode:"contain",height : 100 }} />
				<Text style={{fontSize:25}}>BMC</Text>
				<View style={{flexDirection:"column",alignItems:"center"}}>
					<CustomInput style={{width:250}} placeholder="User Name"></CustomInput>
					<CustomInput secureTextEntry={true} style={{width:250}} placeholder="Password"></CustomInput>
					<View style={{width:100}}>
						<Button color="red" title="Login" onPress={() =>this.processLogin()}></Button>
					</View>
				</View>
				<TouchableHighlight onPress={()=>this.props.navigation.navigate("SignUp")}>
					<Text style={{fontSize:13, padding: 10, textDecorationLine:"underline"}}>New User? Signup.</Text>
				</TouchableHighlight>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	body: {
		backgroundColor: "#fff",
		flex :1,
		alignItems:"center",
		justifyContent:"center"
	},
});
export default Login;
