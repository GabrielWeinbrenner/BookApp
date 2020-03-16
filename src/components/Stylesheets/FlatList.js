import { StyleSheet, Dimensions } from "react-native";
const { height } = Dimensions.get("window");

export default styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		height: height - 300,
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
		flexDirection: "row",
		padding: 20,
		backgroundColor: "#fff",
	},
	image: {
		height: 50,
		width: 50,
		borderRadius: 20,
	},
	title: {
		marginLeft: 10,
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

	backTextWhite: {
		color: "#FFF",
	},
	rowBack: {
		backgroundColor: "#fff",

		alignItems: "center",
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		paddingLeft: 15,
	},
	backRightBtn: {
		alignItems: "center",
		bottom: 0,
		justifyContent: "center",
		position: "absolute",
		top: 0,
		width: 75,
	},
	backRightBtnLeft: {
		backgroundColor: "#00BFFF",
		right: 75,
	},
	backRightBtnRight: {
		backgroundColor: "#ff5050",
		right: 0,
	},
});
