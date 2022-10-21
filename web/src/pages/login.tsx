import { Container, Stack, Button, Icon, Text } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { TbLogin } from "react-icons/tb";
import { InputField } from "../components/InputField";
import { NavBar } from "../components/NavBar";
import { toErrorMap } from "../utils/toErrorMaps";
import { useLoginMutation } from "../generated/graphql";

const Login: React.FC<{}> = ({}) => {
    const router = useRouter();
    // Use the generated graphql mutation
    const [, login] = useLoginMutation();
    return (
        <Container maxW={"100%"}>
            {/* Navbar */}
            <NavBar />
            {/* Main content */}
            <Container mt={5} textAlign={"center"}>
                {/* Report Header */}
                <Text fontSize="6xl" fontWeight="extrabold" as="h2" mb={3}>
                    Login
                </Text>
                {/* Form Control */}
                <Formik
                    initialValues={{
                        username: "",
                        password: "",
                    }}
                    onSubmit={async (values, action) => {
                        // Request from the API
                        const response = await login({ options: values });
                        if (response.data?.login.errors) {
                            // If response, error
                            action.setErrors(
                                toErrorMap(response.data.login.errors)
                            );
                        } else if (response.data?.login.user) {
                            // If response, sucessfull
                            router.push("/");
                        }
                    }}
                >
                    {(props) => (
                        <Form>
                            <Stack spacing={8} direction="column">
                                {/* Username Field */}
                                <InputField
                                    name={"username"}
                                    placeholder={""}
                                    label={"Username*"}
                                    aria-label="Username"
                                />
                                {/* Password Field */}
                                <InputField
                                    name={"password"}
                                    placeholder={""}
                                    label={"Password*"}
                                    type={"password"}
                                    aria-label="Password"
                                />
                            </Stack>
                            {/* Login Button */}
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
                                aria-label="Login"
                            >
                                <Icon as={TbLogin} mr={2} boxSize={7} />
                                Login
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Container>
        </Container>
    );
};

export default Login;
