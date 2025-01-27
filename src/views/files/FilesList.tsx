import { getUserFiles } from "@/services/files.service";
import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	Tooltip,
	useDisclosure,
} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { PencilIcon, Trash2 } from "lucide-react";
import { NavLink } from "react-router";
import { FileNameInput } from "./EditFileName";

function EditFile() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	return (
		<>
			<Button
				isIconOnly
				onClick={(e) => {
					e.preventDefault();
					onOpen();

				}}
				type="button"
				variant="light"
			>
				<PencilIcon size={16} />
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					<ModalHeader className="flex flex-col gap-1">
						Update File
					</ModalHeader>
					<ModalBody>
						<FileNameInput fileName="New File Name" />
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
export function FilesList() {
	const { data, isLoading } = useQuery({
		queryKey: ["files"],
		queryFn: async () => getUserFiles(),
		refetchOnWindowFocus: true,
	});
	return (
		<div className="flex flex-col flex-grow divide-y-2 overflow-y-scroll my-2 ">
			{isLoading && <div>Loading...</div>}
			{data?.map((file) => (
				<Tooltip key={file.id} content={file.title}>
					<NavLink
						to={`files/${file.id}`}
						key={file.id}
						className="flex p-1 text-center flex-row gap-2 items-center hover:cursor-pointer hover:bg-slate-100 h-full"
					>
						<div className="flex gap-2 w-3/4" title={file.title}>
							<div className="text-slate-600 text-lg">{file.id}</div>
							<div className="text-slate-600 text-lg truncate">
								{file.title}
							</div>
						</div>
						<div className="flex gap-1 items-center w-1/4">
							<EditFile />

							<Button isIconOnly color="danger" variant="light">
								<Trash2 size={16} />
							</Button>
						</div>
					</NavLink>
				</Tooltip>
			))}
		</div>
	);
}
