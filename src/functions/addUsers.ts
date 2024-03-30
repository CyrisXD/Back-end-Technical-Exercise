import { db } from "./database";
import { UserInterface } from "../interfaces/userInterface";

const addUser = async (newUser: UserInterface) => {
	return new Promise(async (resolve, reject) => {
		try {
			const snapshot = await db.collection("USERS").add(newUser);
			resolve(snapshot.id);
		} catch (error) {
			reject(error);
		}
	});
};

export { addUser };
