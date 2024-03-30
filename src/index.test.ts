import { getUsers } from "./functions/getUsers";

// This test assumes there is already a record containing "cloete"
describe("Integration test for retrieving users", () => {
	it("should retrieve users with the specified surname", async () => {
		const users = await getUsers("cloete");
		expect(users).not.toBeFalsy();
		expect(users).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					SURNAME_LOWER: "cloete",
				}),
			])
		);
	});
});
