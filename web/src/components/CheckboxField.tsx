import {
    FormControl,
    FormErrorMessage,
    Icon,
    Checkbox,
    Text,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";
import { TbAlertCircle } from "react-icons/tb";

interface CheckboxFieldProps {
    name: string;
    label: string;
    placeholder: string;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
    label,
    ...props
}) => {
    const [field, { error }] = useField(props);
    return (
        <FormControl isInvalid={!!error}>
            <Checkbox
                {...field}
                {...props}
                id={field.name}
                size="lg"
                colorScheme="orange"
            >
                <Text fontWeight={"semibold"}>{label}</Text>
            </Checkbox>
            {error ? (
                <FormErrorMessage>
                    <Icon as={TbAlertCircle} mr={1} /> {error}
                </FormErrorMessage>
            ) : null}
        </FormControl>
    );
};
