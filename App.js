import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Starting from "./src/components/Starting";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Saved from "./src/components/essentials/Saved";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
const Tab = createBottomTabNavigator();

const store = configureStore();

export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<NavigationContainer>
					<Tab.Navigator
						screenOptions={({ route }) => ({
							tabBarIcon: ({ focused, color, size }) => {
								let iconName;
								if (route.name === "Home") {
									iconName = focused
										? "ios-information-circle"
										: "ios-information-circle-outline";
								} else if (route.name === "Saved") {
									iconName = focused ? "ios-bookmark" : "ios-bookmarks";
								}
								// You can return any component that you like here!
								return <Ionicons name={iconName} size={size} color={color} />;
							},
						})}
						tabBarOptions={{
							activeTintColor: "tomato",
							inactiveTintColor: "gray",
						}}>
						<Tab.Screen name="Home" component={Starting} />
						<Tab.Screen name="Saved" component={Saved} />
					</Tab.Navigator>
				</NavigationContainer>
			</Provider>
		);
	}
}
