import React from 'react';
import {FlatList,Text,View,TouchableHighlight,Image} from 'react-native';
import styles from '../styles/items';
import { getAllRecipes, getCategoryName } from '../data/MockDataAPI';

export default class RecipesListScreen extends React.Component {
	constructor(props) {
		super(props);
	}

	onPressRecipe = item => {
		console.log(item)
		//this.props.navigation.navigate('Recipe', { item });
	};

	renderRecipes = ({ item }) => (
		<TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressRecipe(item)}>
			<View style={styles.container}>
				<Image style={styles.photo} source={{ uri: item.photo_url }} />
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
			</View>
		</TouchableHighlight>
	);

	render() {
		return (
			<View>
				<FlatList
					vertical
					showsVerticalScrollIndicator={false}
					numColumns={3}
					data={getAllRecipes()}
					renderItem={this.renderRecipes}
				/>
			</View>
		);
	}
}
