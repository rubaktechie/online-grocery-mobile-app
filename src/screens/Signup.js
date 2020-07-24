import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';
import Logo from "../assets/react.png";

class SignUp extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
            <View style={styles.body}>
                <Text>Sign Up</Text>
				<Image source={Logo} style={{width:100,resizeMode:"contain",height : 100 }} />
				<TouchableHighlight onPress={()=>this.props.navigation.navigate("Login")}>
					<Text style={{fontSize:17, padding: 10, textDecorationLine:"underline"}}>Aleady a User? Login.</Text>
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
export default SignUp;
