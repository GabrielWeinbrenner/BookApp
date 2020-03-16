import { StyleSheet, Dimensions } from "react-native";

export default styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		// height: height - 300,
		borderRadius: 5,
		shadowColor: "black",
		flex: 1,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		marginTop: 0,
		// marginTop: 0,
		shadowRadius: 6,
		shadowOpacity: 0.3,
		elevation: 2,
		padding: 8,
	},
	header: {
		marginTop: 40,
		marginLeft: 10,
		flexDirection: "row",
	},
	headerText: {
		color: "#ff5050",
		marginTop: 15,
		fontSize: 20,
	},

	itemContainer: {
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		margin: 30,
		marginTop: 40,
		height: 100,
	},
	image: {
		height: 100,
		width: 100,
	},
	title: {
		marginTop: 10,
	},
	badge: {
		marginLeft: 5,
		marginTop: 10,
		backgroundColor: "#ff5050",
		justifyContent: "center",

		overflow: "hidden",
		borderRadius: 50,
		height: 35,
		width: 35,
		padding: 6,
	},
	badgeText: {
		textAlign: "center",
		justifyContent: "center",
		color: "#fff",
	},
});
