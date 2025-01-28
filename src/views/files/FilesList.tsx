import { getUserFiles } from "@/services/files.service";
import {
	Alert,
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	Skeleton,
	Tooltip,
	tv,
	useDisclosure,
} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { PencilIcon, Trash2 } from "lucide-react";
import { NavLink } from "react-router";
import { FileNameInput } from "./EditFileName";
import { useKernels } from "@/hooks/useFiles";

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
				color="secondary"
				size="sm"
			>
				<PencilIcon size={16} />
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					<ModalHeader className="flex flex-col gap-1">Update File</ModalHeader>
					<ModalBody>
						<FileNameInput fileName="New File Name" />
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
const SAMPLE_FILE = {
	id:'SAMPLE_FILE',
	title:'Sample_File.py'
}
const filesListStyle = tv({
	slots: {
		root: 'flex flex-col divide-y-2 space-y-2 my-2',
		loader:"h-12 rounded-lg"
	},
})
export function FilesList() {
	const { data, isLoading ,isError} = useKernels();
	const { root,loader} = filesListStyle()
	if (isError) {
		return <div className={root()}>
			<Alert color="danger">Error loading files</Alert>
			<Tooltip content={SAMPLE_FILE.title}>
					<NavLink
						to={`files/${SAMPLE_FILE.id}`}
						key={SAMPLE_FILE.id}
						className="flex p-1 text-center flex-row gap-1 items-center hover:cursor-pointer hover:bg-slate-100 h-full"
					>
						<div className="flex text-lg text-slate-600 gap-2 w-4/5">
							<div className="text-lg truncate">{SAMPLE_FILE.title}</div>
						</div>
						<div className="flex items-center w-1/5">
							<EditFile />
							<Button isIconOnly color="danger" variant="light" size="sm">
								<Trash2 size={16} />
							</Button>
						</div>
					</NavLink>
				</Tooltip>
		</div>
	}
	if (isLoading) {
		return <div className={root()}>
			 <Skeleton className={loader()} />
			 <Skeleton className={loader()} />
			 <Skeleton className={loader()} />
		</div>
	}
	return (
		<div className={root({className:'flex-grow overflow-y-scroll '})}>
			{data?.map((file,idx) => (
				<Tooltip key={file.id} content={file.title}>
					<NavLink
						to={`files/${file.id}`}
						key={file.id}
						className="flex p-1 text-center flex-row gap-1 items-center hover:cursor-pointer hover:bg-slate-100 h-full"
					>
						<div className="flex text-lg text-slate-600 gap-2 w-4/5">
							{idx}
							<div className="text-lg truncate">{file.title}</div>
						</div>
						<div className="flex items-center w-1/5">
							<EditFile />
							<Button isIconOnly color="danger" variant="light" size="sm">
								<Trash2 size={16} />
							</Button>
						</div>
					</NavLink>
				</Tooltip>
			))}
		</div>
	);
}
