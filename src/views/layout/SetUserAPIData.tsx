import { useUser } from "@/providers/UserProvider";
import {
	Button,
	Form,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	useDisclosure,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const UserSchema = z.object({
	apiUrl: z.string().url({ message: "Invalid URL" }),
	authToken: z.string(),
});

type FormInput = z.infer<typeof UserSchema>;
export function SetUserData() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormInput>({
		resolver: zodResolver(UserSchema),
	});
	const { setUser } = useUser();
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const onSubmit: SubmitHandler<FormInput> = (data) => {
		console.log(data);
		setUser(data);
		onClose();
		window.location.reload();
	};

	return (
		<>
			<Button onPress={onOpen} color="primary">
				Set Data
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					<>
						<ModalHeader className="flex flex-col gap-1">Set Data</ModalHeader>
						<ModalBody>
							<Form
								onSubmit={handleSubmit(onSubmit)}
								validationBehavior="native"
								className="pb-4"
							>
								<Input
									placeholder="API Url"
									isInvalid={Boolean(errors.apiUrl)}
									errorMessage={errors.apiUrl?.message}
									{...register("apiUrl", { required: true })}
								/>
								<Input
									placeholder="Auth Token"
									isInvalid={Boolean(errors.authToken)}
									errorMessage={errors.authToken?.message}
									{...register("authToken", { required: true })}
								/>
								<Button type="submit" color="primary">
									Save
								</Button>
							</Form>
						</ModalBody>
					</>
				</ModalContent>
			</Modal>
		</>
	);
}
