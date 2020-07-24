import {
    StyleSheet,
    View,
	Text,
	TouchableHighlight
} from 'react-native';
import React from 'react';
import Icon from "react-native-vector-icons/MaterialIcons";

const styles = StyleSheet.create({
	item: {
		padding: 10,
		fontSize: 18,
		height: 44,
	  },
});

export default ListItem = ({item, changeView}) => {
	return (<TouchableHighlight underlayColor={'#eee'} onPress={()=>changeView(item)}>
			<View style={{borderBottomWidth: 1, borderBottomColor: "#cbd2d9", flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
				<Text style={styles.item}>{item.key}</Text>
				<Icon name="chevron-right" size={30} color="#DA2128" />
			</View>
		</TouchableHighlight>
	);
}