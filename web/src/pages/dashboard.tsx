import {
    Badge,
    Box,
    Center,
    Container,
    Flex,
    Heading,
    Spinner,
    Stack,
    useToast,
    Text,
    Button
} from "@chakra-ui/react";
import { NavBar } from "../components/NavBar";
import { useMeQuery, useReportsQuery } from "../generated/graphql";
import Router from "next/router";
import NextLink from "next/link";

const Dashboard: React.FC<{}> = ({}) => {
    const [{ data, fetching }] = useReportsQuery();
    const [user] = useMeQuery();
    const toast = useToast();

    if (user.fetching) {
    } else if (user.data?.me) {
        // If login then
        return (
            <Container maxW={"100%"}>
                {/* Nav Bar */}
                <NavBar />
                {/* Main Content */}
                <Container maxW={"100%"} mt={5}>
                    {fetching ? (
                        // While fetching
                        <Center width="100%" height="95vh">
                            <Spinner
                                thickness="4px"
                                speed="0.65s"
                                emptyColor="gray.200"
                                color="blue.500"
                                size="xl"
                            />
                        </Center>
                    ) : (
                        // Done fetching
                        <>
                            <Container>
                                <Text
                                    fontSize="6xl"
                                    fontWeight="extrabold"
                                    as="h2"
                                    textAlign={"center"}
                                >
                                    Reports
                                </Text>
                            </Container>
                            {/* Tools */}
                            {/* TODO: ADD A WORKING SEARCH TOOLS */}
                            <Container my={3}></Container>
                            {/* Display Data */}
                            <Container
                                css={{
                                    "&::-webkit-scrollbar": {
                                        width: "4px",
                                    },
                                    "&::-webkit-scrollbar-track": {
                                        width: "6px",
                                    },
                                    "&::-webkit-scrollbar-thumb": {
                                        background: "#FFFFFF",
                                        borderRadius: "24px",
                                    },
                                }}
                                overflow="auto"
                                overflowX="hidden"
                                h="70vh"
                                maxW={"70%"}
                                borderWidth={"1px"}
                                p={2}
                            >
                                <Stack spacing={8} maxW={"full"}>
                                    {data!.reports.map((r) =>
                                        !r ? null : (
                                            <NextLink
                                                href="/report/[_id]"
                                                as={`/report/${r._id}`}
                                                passHref
                                            >
                                                <Button
                                                    as={Flex}
                                                    key={r._id}
                                                    p={10}
                                                    shadow="md"
                                                    borderWidth="1px"
                                                >
                                                    <Box flex={1}>
                                                        <Stack direction="row">
                                                            {/* Date */}
                                                            <Badge variant="outline">
                                                                {new Date(
                                                                    Number(
                                                                        r.createdAt
                                                                    )
                                                                ).toLocaleString()}
                                                            </Badge>
                                                            {/* If there is injured it will tag as critical */}
                                                            {r.injured ? (
                                                                <Badge
                                                                    colorScheme="red"
                                                                    variant="solid"
                                                                >
                                                                    Critical
                                                                </Badge>
                                                            ) : null}
                                                        </Stack>
                                                        {/* Title */}
                                                        <Heading
                                                            fontSize={"md"}
                                                            mt={2}
                                                        >
                                                            {r.title}
                                                        </Heading>
                                                    </Box>
                                                </Button>
                                            </NextLink>
                                        )
                                    )}
                                </Stack>
                            </Container>
                        </>
                    )}
                </Container>
            </Container>
        );
    } else {
        // Else
        const id = "notallow-toast";
        if (!toast.isActive(id)) {
            toast({
                title: `Seem like you have no access.`,
                status: "info",
                position: "bottom-right",
                isClosable: true,
                id,
            });
        }
        Router.push("/");
    }
};

export default Dashboard;
