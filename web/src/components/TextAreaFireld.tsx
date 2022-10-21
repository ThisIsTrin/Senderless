import {
    FormControl,
    FormLabel,
    Textarea,
    FormErrorMessage,
    Icon,
} from "@chakra-ui/react";
import { useField } from "formik";
import { InputHTMLAttributes } from "react";
import { TbAlertCircle } from "react-icons/tb";

type TextareaFieldProps = InputHTMLAttributes<HTMLTextAreaElement> & {
    name: string;
    label: string;
    placeholder: string;
    minH: string;
};

export const TextareaField: React.FC<TextareaFieldProps> = ({
    label,
    size: _,
    ...props
}) => {
    const [field, { error }] = useField(props);
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel>{label}</FormLabel>
            <Textarea
                {...field}
                id={field.name}
                minH
                placeholder={props.placeholder}
                {...props}
            />
            {error ? (
                <FormErrorMessage>
                    <Icon as={TbAlertCircle} mr={1} /> {error}
                </FormErrorMessage>
            ) : null}
        </FormControl>
    );
};
