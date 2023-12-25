import { apiUrl } from "@/constants";
import { Word } from "@/interface";

export const getWordByPage = async (
	page: number = 0
): Promise<{
	posts: Word[];
	total: number;
}> => {
	const res = await fetch(`${apiUrl}/word?page=${page}`);

	const result = await res.json().then((data) => {
		return data;
	});
	console.log(result);

	return result;
};
