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
import { useQueryClient } from "@tanstack/react-query";
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
	const queryClient = useQueryClient();
	const { setUser,apiUrl,authToken } = useUser();
	const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
	const onSubmit: SubmitHandler<FormInput> = async (data) => {
		console.log(data);
		await setUser(data);
		onClose();
		queryClient.invalidateQueries();
		// window.location.reload();
	};

	return (
		<>
			<Button onPress={onOpen} color="primary">
				Set Data
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					<>
						<ModalHeader className="flex flex-col gap-1">
							Set Source Data
						</ModalHeader>
						<ModalBody>
							<Form
								onSubmit={handleSubmit(onSubmit)}
								validationBehavior="native"
								className="pb-4"
							>
								<Input
									placeholder="http://localhost:8000/user/admin/api"
									label="API Url"
									labelPlacement="outside"
									description="The URL of your JupyterHub API (http://localhost:8000/user/admin/api)"
									isInvalid={Boolean(errors.apiUrl)}
									errorMessage={errors.apiUrl?.message}
									defaultValue={apiUrl}
									{...register("apiUrl", { required: true })}
								/>
								<Input
									placeholder="Auth Token"
									label="Auth Token"
									labelPlacement="outside"
									description="The auth token of your JupyterHub API"
									isInvalid={Boolean(errors.authToken)}
									errorMessage={errors.authToken?.message}
									defaultValue={authToken}
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
