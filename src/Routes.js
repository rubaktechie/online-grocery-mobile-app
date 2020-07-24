// import React, { Component } from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   Button,
//   View,
//   Text,
//   StatusBar,
// } from 'react-native';
// import * as  Realm from 'realm';

// class App extends Component {
// 	constructor(props) {
// 		super(props)
// 	}

// 	updateCount(flag){
// 		Realm.open({
// 			schema: [CounterSchema]
// 		}).then(realm => {		 
// 			realm.write(() => {
// 				let object = realm.objects('Counter');
// 				object[0].count = flag == 0 ? object[0].count+1 : object[0].count-1;
// 			})
// 			this.setState({ realm });
// 		});
// 	}
// 	componentDidMount() {
// 		Realm.open({
// 			schema: [CounterSchema]
// 		}).then(realm => {
// 			realm.write(() => {
// 				if(realm.objects('Counter').length <= 0){
// 					const myCar = realm.create('Counter', {
// 						count: 0,
// 					});
// 				}
// 			}); 
// 			this.setState({ realm });
// 		});
// 	}
// 	componentWillUnmount(){
// 		const {realm} = this.state;
// 		if (realm !== null && !realm.isClosed) {
// 		  realm.close();
// 		}
// 	}
// 	render() {
// 		return (
// 			<>
				
// 				<SafeAreaView style={{flex: 1}}>
// 					<View style={styles.body}>
// 						<Text>{this.state.realm?Array.from(this.state.realm.objects('Counter'))[0].count:"Loading..."}</Text>
// 						<View style={{flexDirection: "row"}}>
// 							<View style={{padding: 10}}> 
// 								<Button title="Add" onPress={()=>this.updateCount(0)} />
// 							</View>
// 							<View style={{padding: 10}}>
// 								<Button title="Sub" onPress={()=>this.updateCount(1)} />
// 							</View>
// 						</View>
// 					</View>
// 				</SafeAreaView>
// 			</>
// 		);
// 	}
// };

// const styles = StyleSheet.create({
// 	body: {
// 	  backgroundColor: "#fff",
// 	  flex :1,
// 	  alignItems:"center",
// 	  justifyContent:"center"
// 	},
//   });
// export default App;

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';

import Category from "./screens/Category";
import Login from "./screens/Login";
import Home from "./screens/Home";
import SignUp from "./screens/Signup";
import SubCategory from "./screens/SubCategory";
import ItemList from "./screens/ItemList";
import Realm from "realm";
import Icon from "react-native-vector-icons/MaterialIcons";

const Stack = createStackNavigator();

class Routes extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoggedIn : false
		}
	}
	componentDidMount(){
		Realm.open({schema: [UserSchema]})
		.then(realm => {
			this.setState({ realm });
		});
	}
	componentDidUpdate(){
		if (this.state.isLoggedIn != true) {
			this.checkLogin();
		}
	}
	checkLogin(){
		Realm.open({schema: [UserSchema]})
		.then(realm => {
			const isUserAvailable = realm.objects('User').length;
			if(isUserAvailable > 0){
				this.setState({
					isLoggedIn : true
				})
			}
		});
	}
	componentWillUnmount(){
		const {realm} = this.state;
		if (realm !== null && !realm.isClosed) {
		  realm.close();
		}
	}
	render(){
		return (
			<NavigationContainer>
				<Stack.Navigator
					headerMode="float"
					screenOptions={{
						title: 'BMC',
						headerStyle: {
							backgroundColor: '#DA2128',
						},
						headerTintColor: '#fff',
						headerBackImage: ()=> <Icon name="arrow-back" size={30} color="#fff" />,
						navigationOptions: {
							header: (state, options) => {
								return {
									...options,
									... {
										visible: true,
									}
								}
							}
						}
					}}
				>
				
					<Stack.Screen
						name="Home"
						component={Home}
					/>

					{!this.state.isLoggedIn ?
						<>
						<Stack.Screen
							name="Login"
							component={Login} 
							options={{headerShown: false}}
							listeners={({ navigation, route }) => (
								this.checkLogin()
							)}
						/>
						<Stack.Screen
							name="SignUp"
							component={SignUp} 
							options={{headerShown: false}}
						/>
						</>
					:null}
					
					<Stack.Screen
						name="Category"
						component={Category}
					/>
					<Stack.Screen
						name="SubCategory"
						component={SubCategory}
					/>
					<Stack.Screen
						name="ItemList"
						component={ItemList}
					/>
					
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}

export default Routes;