import React, { Component } from 'react';
import {StyleSheet,View,Text,FlatList,Modal, TouchableHighlight} from 'react-native';
import CategoryItem from '../components/CategoryItem';
import Realm from "realm";
import UserSchema from "../schema/User";

class Category extends Component {
	constructor(props) {
		super(props)
		this.state = {
			categoryList : [
				{key: 'Devin'},
				{key: 'Dan'},
				{key: 'Dominic'},
				{key: 'Jackson'},
				{key: 'James'},
				{key: 'Joel'},
				{key: 'John'},
				{key: 'Jillian'},
				{key: 'Jimmy'},
				{key: 'Julie'},
				{key: 'Dan1'},
				{key: 'Dominic1'},
				{key: 'Jackson1'},
				{key: 'James1'},
				{key: 'Joel1'},
				{key: 'John1'},
				{key: 'Jillian1'},
				{key: 'Jimmy1'},
				{key: 'Julie1'},
				{key: 'Dan2'},
				{key: 'Dominic2'},
				{key: 'Jackson2'},
				{key: 'James2'},
				{key: 'Joel2'},
				{key: 'John2'},
				{key: 'Jillian2'},
				{key: 'Jimmy2'},
				{key: 'Julie2'}
			],
		}
	}

	changeView(category){
		this.props.navigation.navigate("SubCategory", {category :category})
	}

	render() {
		return (
			<View style={styles.body}>
				<View style={{ padding:10,borderBottomWidth: 1, borderBottomColor: "#000",flexDirection:"row"}}>
					<Text style={{fontSize : 22}}>All Category</Text>
				</View>
				<FlatList
					data={this.state.categoryList}
					renderItem={({item}) => <CategoryItem item={item} changeView={(category)=>this.changeView(category)} />}
				/>
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
	}
});
export default Category;
