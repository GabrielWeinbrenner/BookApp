import React from "react";
import { TouchableOpacity } from "react-native";
import { func, string } from "prop-types";
import Icon from "react-native-vector-icons/AntDesign";
import styles from "./Stylesheets/IconStyles";
const IconButton = ({ onPress, name, backgroundColor, color, borderRadius }) => (
	<TouchableOpacity style={[styles.singleButton, { backgroundColor, borderRadius }]} onPress={onPress} activeOpacity={0.85}>
		<Icon name={name} size={20} color={color} />
	</TouchableOpacity>
);
IconButton.defaultProps = {
	color: "white",
	backgroundColor: "red",
};
IconButton.propTypes = {
	onPress: func.isRequired,
	name: string.isRequired,
	color: string,
	backgroundColor: string,
};
export default IconButton;
