export const randomPassword = (length = 12): string => {
	const charSets = [
		"abcdefghijklmnopqrstuvwxyz",
		"ABCDEFGHIJKLMNOPQRSTUVWXYZ",
		"0123456789",
		"!@#$%^&*()_+[]{}|;:,.<>?",
	];

	const getRandomChar = (set: string): string => {
		if (!set || set.length === 0) {
			throw new Error("Character set cannot be empty.");
		}
		return set.charAt(Math.floor(Math.random() * set.length));
	};

	const passwordArray: string[] = charSets.map(getRandomChar);

	const allChars = charSets.join("");
	for (let i = passwordArray.length; i < length; i++) {
		passwordArray.push(getRandomChar(allChars));
	}

	for (let i = passwordArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		//@ts-expect-error
		[passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
	}

	return passwordArray.join("");
};
