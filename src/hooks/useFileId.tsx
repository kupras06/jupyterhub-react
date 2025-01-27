import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export function useFileId() {
	const { fileId } = useParams();
	return fileId;
}

export function useFileData() {
	const fileId = useFileId();
	const fileData = useQuery({
		queryKey: ["fileData", fileId],
		queryFn: async () => {
			const response = await fetch(`/api/files/${fileId}`);
			const data = await response.json();
			return data;
		},
	});
	return fileData;
}
