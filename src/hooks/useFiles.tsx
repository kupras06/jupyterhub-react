import { useUser } from "@/providers/UserProvider";
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
export function useKernels() {
	const { hubUser, apiUrl } = useUser();
	return useQuery({
		queryKey: ["kernels", apiUrl, hubUser?.name],
		queryFn: async () => {
			console.log(hubUser);
			if(!hubUser) return []
			const url = `${apiUrl}/user${hubUser?.name}/api/kernels`;
			const response = await fetch(url);
			const data = await response.json();
			console.log(data);
			return data;
		},
	});
}
