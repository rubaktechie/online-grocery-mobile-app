import React, { Component } from 'react';
import {SafeAreaView,StatusBar} from 'react-native';
import Routes from "./Routes";

class App extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<>
				<StatusBar barStyle="light-content" />
				<SafeAreaView style={{flex: 1}}>
					<Routes />
				</SafeAreaView>
			</>
		);
	}
};

export default App;
