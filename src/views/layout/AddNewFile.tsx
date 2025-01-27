import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	Button,
	useDisclosure,
	Form,
	Input,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
	fileName: z
		.string({ required_error: "File Name is required" })
		.min(4, { message: "Must be 4 characters or more" })
		.max(25, { message: "The File Name must be 10 characters or less" })
		.regex(
			/^[a-zA-Z0-9_]+$/,
			"The File Name must contain only letters, numbers and underscore (_)",
		)
		.refine((value) => /^[^0-9]/.test(value), {
			message: "String must begin with a character",
		}),
});
type FormInput = z.infer<typeof FormSchema>;
function FileNameInput() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormInput>({
		resolver: zodResolver(FormSchema),
	});
	const onSubmit: SubmitHandler<FormInput> = (data) => console.log(data);
	return (
		<Form
			onSubmit={handleSubmit(onSubmit)}
			validationBehavior="native"
			className="pb-4"
		>
			<label htmlFor="fileName">File Name</label>
			<Input
				isInvalid={Boolean(errors.fileName)}
				errorMessage={errors.fileName?.message}
				placeholder="New File Name"
				{...register("fileName", { required: true })}
			/>

			<Button type="submit" color="primary">
				Create
			</Button>
		</Form>
	);
}
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
