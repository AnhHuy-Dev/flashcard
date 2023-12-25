import { apiUrl } from "@/constants";
import { Word } from "@/interface";

export const getWordByPageAndType = async (
	page: number = 0,
	type: string = "ALL"
): Promise<{
	posts: Word[];
	total: number;
}> => {
	const res = await fetch(`${apiUrl}/word?page=${page}&type=${type}`);

	let result = await res.json().then((data) => {
		return data;
	});

	return result;
};
