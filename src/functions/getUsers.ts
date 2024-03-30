import { db } from "./database";
import { QueryDocumentSnapshot } from "firebase-admin/firestore";
import { UserInterface } from "../interfaces/userInterface";

// ===================================
// get document using SURNAME
// ===================================
const getUsers = async (SURNAME: string) => {
	return new Promise(async (resolve, reject) => {
		try {
			let snapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>;

			if (SURNAME === "") {
				snapshot = await db.collection("USERS").get();
			} else {
				snapshot = await db
					.collection("USERS")
					.where("SURNAME_LOWER", "==", SURNAME.toLowerCase())
					.get();
			}

			if (snapshot.size === 0) {
				resolve(false);
			} else {
				const data: UserInterface[] = snapshot.docs.map(
					(doc: QueryDocumentSnapshot) => doc.data() as UserInterface
				);
				resolve(data);
			}
		} catch (error) {
			reject(error);
		}
	});
};

export { getUsers };
