import React, { Component } from 'react';
import {StyleSheet,View,Text,FlatList} from 'react-native';
import CategoryItem from '../components/CategoryItem';
	
class SubCategory extends Component {
	constructor(props) {
		super(props)
		this.state = {
			subCategoryList :[
				{key: ' Sub_Devin'},
				{key: ' Sub_Dan'},
				{key: ' Sub_Dominic'},
				{key: ' Sub_Jackson'},
				{key: ' Sub_James'},
				{key: ' Sub_Joel'},
				{key: ' Sub_John'},
				{key: ' Sub_Jillian'},
				{key: ' Sub_Jimmy'},
				{key: ' Sub_Julie'},
				{key: ' Sub_Dan1'},
				{key: ' Sub_Dominic1'},
				{key: ' Sub_Jackson1'},
				{key: ' Sub_James1'},
				{key: ' Sub_Joel1'},
				{key: ' Sub_John1'},
				{key: ' Sub_Jillian1'},
				{key: ' Sub_Jimmy1'},
				{key: ' Sub_Julie1'},
				{key: ' Sub_Dan2'},
				{key: ' Sub_Dominic2'},
				{key: ' Sub_Jackson2'},
				{key: ' Sub_James2'},
				{key: ' Sub_Joel2'},
				{key: ' Sub_John2'},
				{key: ' Sub_Jillian2'},
				{key: ' Sub_Jimmy2'},
				{key: ' Sub_Julie2'}
			]
		}
	}

	changeView(category){
		this.props.navigation.navigate("ItemList")
	}
	render() {
		return (
			<View style={styles.body}>
				<View style={{ padding:10,borderBottomWidth: 1, borderBottomColor: "#000",flexDirection:"row"}}>
					<Text style={{fontSize : 22}}>{this.props.route.params.category.key}</Text>
				</View>
				<FlatList
					data={this.state.subCategoryList}
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
	},
  });
export default SubCategory;
