"use client";
import { apiUrl } from "@/constants";
import useCreateModal from "@/hooks/useCreateModal";
import axios from "axios";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";

function CreateModal() {
	const { isOpen, onClose } = useCreateModal();
	const [isClient, setIsClient] = useState(false);
	const [content, setContent] = useState({
		name: "",
		script: "",
		note: "",
		type: "NOUN",
	});

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) return null;

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await axios.post(
				`${apiUrl}/word`,
				{
					name: content.name,
					script: content.script,
					note: content.note,
					type: content.type,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			toast.success("Add success !");
			setContent({
				name: "",
				script: "",
				note: "",
				type: "NOUN",
			});
			onClose();
		} catch (error) {}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		setContent((prev) => {
			return {
				...prev,
				[e.target.name]: e.target.value,
			};
		});
	};
	console.log(content);

	return (
		<>
			{<div className={twMerge(`bg-black fixed h-[100vh] w-[100vw] top-0 left-0 opacity-50 scale-0`, isOpen && `scale-100 z-10`)} onClick={onClose}></div>}
			<div
				className={twMerge(
					`bg-white fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] px-8 py-8 scale-0 transition-all origin-center rounded-lg z-[12]`,
					isOpen && `scale-100`
				)}>
				<IoClose className="absolute right-4 top-4 w-6 h-6 cursor-pointer" onClick={onClose} />
				<h2 className="text-center font-bold pt-4 pb-6 text-2xl">Add new word</h2>
				<form onSubmit={handleSubmit} action="/" className="flex flex-col gap-y-4">
					<>
						<div className="flex items-center gap-x-3">
							<label htmlFor="type" className="font-semibold italic">
								Type:
							</label>
							<select id="type" name="type" className="border-2 border-black rounded-md pl-2 pr-10 py-2 w-[60%]" onChange={(e) => handleChange(e)} value={content.type}>
								<option value="NOUN" defaultChecked>
									Noun
								</option>
								<option value="VERB">Verb</option>
								<option value="ADJ">Adjective</option>
								<option value="ADV">Adverb</option>
							</select>
						</div>
						<input
							className="border-2 border-black rounded-md pl-2 pr-10 py-2"
							type="text"
							value={content.name}
							name="name"
							placeholder="Name"
							id=""
							required
							onChange={(e) => handleChange(e)}
						/>
						<input
							className="border-2 border-black rounded-md pl-2 pr-10 py-2"
							type="text"
							value={content.script}
							name="script"
							placeholder="Script"
							required
							onChange={(e) => handleChange(e)}
						/>

						<textarea
							className="border-2 border-black rounded-md pl-2 pr-10 py-2"
							rows={5}
							value={content.note}
							name="note"
							placeholder="Note"
							id=""
							required
							onChange={(e) => handleChange(e)}
						/>
					</>

					<input className="bg-[#039DA7] w-max py-2 px-6 mt-2 rounded-lg m-auto text-white font-bold hover:opacity-80" type="submit" value="Create" name="" id="" />
				</form>
			</div>
		</>
	);
}

export default CreateModal;
