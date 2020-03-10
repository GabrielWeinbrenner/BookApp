import { StyleSheet } from "react-native";

export default IconStyles = StyleSheet.create({
	singleButton: {
		backgroundColor: "transparent",
		borderRadius: 50,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "black",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowRadius: 6,
		shadowOpacity: 0.3,
		elevation: 2,
		padding: 30,
	},
	buttonsContainer: {
		marginTop: 50,
		flexDirection: "row",
		justifyContent: "space-evenly",
	},
});
