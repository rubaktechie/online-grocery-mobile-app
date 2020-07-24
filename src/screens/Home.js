import React, { Component } from 'react';
import {StyleSheet,View,Text,Image,Modal,FlatList,TouchableHighlight} from 'react-native';
import Realm from "realm";
import UserSchema from "../schema/User";
import Logo from "../assets/veg.jpg";
import Icon from "react-native-vector-icons/MaterialIcons"
import itemStyles from '../styles/items';
import { getAllRecipes, getCategoryName } from '../data/MockDataAPI';
class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
			modalVisible : false,
			realm : null
		}
	}

	componentDidMount(){
		Realm.open({schema: [UserSchema]})
		.then(realm => {
			this.setState({ realm });
		});
		this.checkLogin();
		this.subscribe = this.props.navigation.addListener('focus', () => {
			this.checkLogin();
		});
		this.subscribeOne = this.props.navigation.addListener('blur', () => {
			this.hideModal()
		});
	}

	renderRecipes = ({ item }) => (
		<View style={itemStyles.container}>
			<Image style={itemStyles.photo} source={{ uri: item.photo_url }} />
			<Text style={itemStyles.title}>{item.title}</Text>
			<Text style={itemStyles.category}>{getCategoryName(item.categoryId)}</Text>
		</View>
	);

	componentDidUpdate(){
		if (this.props.navigation.isFocused() && this.state.modalVisible != true) {
			this.checkLogin();
		}
	}

	checkLogin(){
		Realm.open({schema: [UserSchema]})
		.then(realm => {
			const isUserAvailable = realm.objects('User').length;
			if(isUserAvailable == 0){
				this.setState({
					modalVisible : true
				})
			}
		});
	}
	componentWillUnmount(){
		const {realm} = this.state;
		if (realm !== null && !realm.isClosed) {
		  realm.close();
		}
		this.subscribe = null;
		this.subscribeOne = null;
	}
	changeView(){
		this.props.navigation.navigate("Category")
	}
	hideModal(){
		this.setState({
			modalVisible :false
		})
	}

	render() {
		return (
			<View style={styles.body}>
				<Modal
					animationType="slide"
					transparent={true}
					visible={this.state.modalVisible}
					onRequestClose={() => this.hideModal()}
				>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<View style={{alignItems:"center", width : 150}}>
								<Text style={styles.modalText}>Already a Customer ?</Text>
								<TouchableHighlight
									style={{ ...styles.openButton, backgroundColor: "red" }}
									onPress={() => this.props.navigation.navigate("Login")}
								>
									<Text style={styles.textStyle}>Sign In</Text>
								</TouchableHighlight>
							</View>
							<View style={{alignItems:"center", width : 150}}>
								<Text style={styles.modalText}>Join BMC</Text>
								<TouchableHighlight
									style={{ ...styles.openButton, backgroundColor: "red" }}
									onPress={() => this.props.navigation.navigate("SignUp")}
								>
									<Text style={styles.textStyle}>Register</Text>
								</TouchableHighlight>
							</View>
						</View>
					</View>
				</Modal>
				<View style={{ height: 250 }}>
					<Image source={Logo} style={{flex:1}} />
				</View>
				<TouchableHighlight underlayColor={'#eee'} onPress={()=>this.changeView()}>
					<View style={{ padding:10,margin :10,borderWidth: 1, borderColor: "#000", borderRadius: 10, flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
						<Text style={{fontSize : 22}}>Home</Text>
						<Icon name="chevron-right" size={30} color="#DA2128" />
					</View>
				</TouchableHighlight>
				<View>
					<FlatList
						vertical
						showsVerticalScrollIndicator={false}
						numColumns={3}
						data={getAllRecipes()}
						renderItem={this.renderRecipes}
					/>
				</View>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	body: {
		backgroundColor: "#fff",
		flex :1,
	},
	item: {
		padding: 10,
		fontSize: 18,
		height: 44,
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22
	},
	modalView: {
		flexDirection:"row",
		margin: 20,
		backgroundColor: "white",
		borderRadius: 5,
		padding: 15,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5
	},
	openButton: {
		backgroundColor: "#F194FF",
		borderRadius: 6,
		padding: 5,
		elevation: 2,
		width : 100
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center"
	}
});
export default Home;
