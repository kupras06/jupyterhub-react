import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	Button,
	useDisclosure,
} from "@heroui/react";
import { FileNameInput } from "./EditFileName";

export function AddNewFile() {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	return (
		<>
			<Button onPress={onOpen} color="primary">
				Add new file
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					<>
						<ModalHeader className="flex flex-col gap-1">
							Add New File
						</ModalHeader>
						<ModalBody>
							<FileNameInput />
						</ModalBody>
					</>
				</ModalContent>
			</Modal>
		</>
	);
}
