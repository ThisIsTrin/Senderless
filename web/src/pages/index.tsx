import { Box, Text, Container, Button, Icon, Flex } from "@chakra-ui/react";
import { NavBar } from "../components/NavBar";
import { TbMessageReport, TbInfoCircle } from "react-icons/tb";
import NextLink from "next/link";

const Index = () => {
    return (
        <>
            <Container maxW={"100%"}>
                {/* Nav bar */}
                <NavBar />
                {/* Main Content */}
                <Container maxW={"100%"} centerContent>
                    {/* Staying Safe */}
                    <Box padding={"4"} maxW={"100%"} textAlign={"center"}>
                        <Box m="5">
                            <Text fontSize="6xl" fontWeight="extrabold" as="h2">
                                Staying{" "}
                                <Text as="span" color="red.500">
                                    Safe
                                </Text>
                            </Text>
                        </Box>
                        <Box m="5">
                            <Text fontSize="3xl">
                                <Text as="span" color="red.500">
                                    Saftey{" "}
                                </Text>
                                is the main priority!
                            </Text>
                        </Box>
                        <Box m="5">
                            <Text fontSize="xl">
                                To ensure safety on campus. Feel like you are in
                                danger? Abuse by a teacher? Stop it while you
                                can. Report now!
                            </Text>
                        </Box>
                        <Box m="5">
                            <NextLink href="/create-report" passHref>
                                <Button
                                    bgGradient="linear(to-r, red.500, yellow.500)"
                                    _hover={{
                                        bgGradient:
                                            "linear(to-r, red.600, yellow.600)",
                                    }}
                                    size="lg"
                                    color={"white"}
                                    aria-label="Report now!"
                                >
                                    <Icon
                                        as={TbMessageReport}
                                        mr={2}
                                        boxSize={7}
                                    />
                                    Report now
                                </Button>
                            </NextLink>
                        </Box>
                    </Box>
                    {/* FAQ */}
                    <Box padding="4" maxW="100%" textAlign="center">
                        <Box>
                            <Text
                                fontSize="6xl"
                                fontWeight="extrabold"
                                as="h2"
                                bgClip="text"
                                bgGradient="linear(to-r, red.500, yellow.500)"
                            >
                                FAQ
                            </Text>
                        </Box>
                        <Box>
                            {/* Question and Answer */}
                            <Flex m={5}>
                                <Icon
                                    as={TbInfoCircle}
                                    boxSize={14}
                                    mr={5}
                                    mt={1.5}
                                />
                                <Box textAlign={"left"}>
                                    <Box>
                                        <Text fontSize="2xl" fontWeight="bold">
                                            How do I report abuse?
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Text fontSize="xl">
                                            Press the report button up above, or
                                            press here.
                                        </Text>
                                    </Box>
                                </Box>
                            </Flex>
                            {/* Question and Answer */}
                            <Flex m={5}>
                                <Icon
                                    as={TbInfoCircle}
                                    boxSize={14}
                                    mr={5}
                                    mt={1.5}
                                />
                                <Box textAlign={"left"}>
                                    <Box>
                                        <Text fontSize="2xl" fontWeight="bold">
                                            Will other people know me?
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Text fontSize="xl">
                                            No, it's entirely annonymus.
                                        </Text>
                                    </Box>
                                </Box>
                            </Flex>
                        </Box>
                    </Box>
                </Container>
            </Container>
        </>
    );
};

export default Index;
