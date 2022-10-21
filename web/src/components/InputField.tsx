import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Icon,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";
import { TbAlertCircle } from "react-icons/tb";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
    placeholder: string;
};

export const InputField: React.FC<InputFieldProps> = ({
    label,
    size: _,
    ...props
}) => {
    const [field, { error }] = useField(props);
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel>{label}</FormLabel>
            <Input
                {...field}
                {...props}
                id={field.name}
                placeholder={props.placeholder}
            />
            {error ? (
                <FormErrorMessage>
                    <Icon as={TbAlertCircle} mr={1} /> {error}
                </FormErrorMessage>
            ) : null}
        </FormControl>
    );
};
