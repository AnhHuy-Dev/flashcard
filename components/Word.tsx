import { Word } from "@/interface";

function Word({ item }: { item: Word }) {
	return (
		<div className="bg-white p-6 mx-14 rounded-2xl h-[70vh]">
			<div>
				<h3 className="text-2xl font-bold">
					{item.name} (<span className="text-xl">{item.type}</span>)
				</h3>
			</div>
			<p className="py-8 italic">
				<span className="font-semibold">Script: </span>
				{item.script}
			</p>
			<div className="flex items-start gap-x-2">
				<img src="./images/notebook.png" alt="" className="w-6 h-6" />
				<span className="font-light text-justify">{item.note}</span>
			</div>
		</div>
	);
}

export default Word;
