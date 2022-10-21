import {
    Button,
    Container,
    Icon,
    Stack,
    Text,
    useToast,
    UseToastOptions,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { TbMessageReport } from "react-icons/tb";
import { CheckboxField } from "../components/CheckboxField";
import { InputField } from "../components/InputField";
import { NavBar } from "../components/NavBar";
import { TextareaField } from "../components/TextAreaFireld";
import { useCreateReportMutation } from "../generated/graphql";
import { toErrorMapReport } from "../utils/toErrorMaps";

const CreateReport: React.FC<{}> = ({}) => {
    // Use the generated graphql mutation
    const [, createReport] = useCreateReportMutation();
    // Creating a toast
    const toast = useToast();
    const alert = (title: string, status: UseToastOptions["status"]) => {
        toast({
            title: title,
            status: status,
            position: "bottom-right",
            isClosable: true,
        });
    };
    // Page content
    return (
        <Container maxW={"100%"}>
            {/* Nav bar */}
            <NavBar />
            {/* Main Content */}
            <Container maxW={"80%"} textAlign={"center"} mt={5}>
                {/* Report Header */}
                <Text fontSize="6xl" fontWeight="extrabold" as="h2" mb={3}>
                    Report
                </Text>
                {/* Form Control */}
                <Formik
                    initialValues={{
                        title: "",
                        description: "",
                        recom: "",
                        injured: false,
                    }}
                    onSubmit={async (values, action) => {
                        // Request to create a report at api
                        const response = await createReport({
                            options: values,
                        });
                        if (response.data?.createReport.errors) {
                            // If response, error
                            action.setErrors(
                                toErrorMapReport(
                                    response.data.createReport.errors
                                )
                            );
                        } else if (response.data?.createReport.report) {
                            // If response, success
                            alert("We have recive the report!", "success");
                            action.resetForm();
                        }
                    }}
                >
                    {(props) => {
                        return (
                            <Form>
                                <Stack spacing={8} direction="column">
                                    {/* Title Field */}
                                    <InputField
                                        name={"title"}
                                        placeholder={""}
                                        label={"Title*"}
                                    />
                                    {/* Description */}
                                    <TextareaField
                                        name={"description"}
                                        placeholder={""}
                                        label={"Description*"}
                                        minH={"30vh"}
                                    />
                                    {/* Follow up recomendation */}
                                    <TextareaField
                                        name={"recom"}
                                        placeholder={""}
                                        label={"Follow-up recommendations"}
                                        minH={"10vh"}
                                    />
                                    {/* Anyone injured */}
                                    <CheckboxField
                                        name={"injured"}
                                        label={"Was anyone injured?"}
                                        placeholder={""}
                                    />
                                </Stack>
                                {/* Submit Button */}
                                <Button
                                    bgGradient="linear(to-r, red.500, yellow.500)"
                                    _hover={{
                                        bgGradient:
                                            "linear(to-r, red.600, yellow.600)",
                                    }}
                                    type="submit"
                                    isLoading={props.isSubmitting}
                                    color={"white"}
                                    mt={8}
                                >
                                    <Icon
                                        as={TbMessageReport}
                                        mr={2}
                                        boxSize={7}
                                    />
                                    Report now
                                </Button>
                            </Form>
                        );
                    }}
                </Formik>
            </Container>
        </Container>
    );
};

export default CreateReport;
