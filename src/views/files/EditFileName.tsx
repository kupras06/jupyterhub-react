import { Button, Form, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
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
export function FileNameInput({ fileName }: { fileName?: string }) {
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
			<Input
				label="File Name"
				labelPlacement="outside"
				isInvalid={Boolean(errors.fileName)}
				errorMessage={errors.fileName?.message}
				placeholder="New File Name"
				defaultValue={fileName}
				{...register("fileName", { required: true })}
			/>

			<Button type="submit" color="primary">
				{fileName ? "Update" : "Create"}
			</Button>
		</Form>
	);
}
