import {
    Badge,
    Box,
    Center,
    Container,
    Spinner,
    Stack,
    Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { NavBar } from "../../components/NavBar";
import { useReportQuery } from "../../generated/graphql";

const Report = () => {
    const router = useRouter();
    const { _id } = router.query;
    const [{ data, fetching }] = useReportQuery({
        variables: { opt: _id as string },
    });

    return (
        <Container maxW={"100%"}>
            {/* Nav Bar */}
            <NavBar />
            {/* Main content */}
            <Container maxW={"100%"}>
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
                    // Display data
                    <Stack textAlign={"center"}>
                        {/* Report Ttile */}
                        <Text fontSize={"5xl"} fontWeight={"bold"}>
                            {data.report.title}
                        </Text>

                        {/* Description */}
                        <Box>
                            <Text mb={2} fontSize={"xl"} fontWeight="semibold">
                                Description
                            </Text>
                            <Text
                                borderWidth={"1px"}
                                borderRadius="lg"
                                textAlign={"left"}
                                p={2}
                            >
                                {data.report.description}
                            </Text>
                        </Box>
                        {/* Follow up recomendation */}
                        {data.report.recom == "" ? null : (
                            <Box>
                                <Text
                                    mb={2}
                                    fontSize={"xl"}
                                    fontWeight="semibold"
                                >
                                    Follow-up Recomendation
                                </Text>
                                <Text
                                    borderWidth={"1px"}
                                    borderRadius="lg"
                                    textAlign={"left"}
                                    p={2}
                                >
                                    {data.report.recom}
                                </Text>
                            </Box>
                        )}
                        {/* injureis */}
                        {data.report.recom == "" ? null : (
                            <Box>
                                <Text
                                    mb={2}
                                    fontSize={"xl"}
                                    fontWeight="semibold"
                                >
                                    Injuries
                                </Text>
                                {data.report.injured ? (
                                    <Text
                                        borderWidth={"1px"}
                                        borderRadius="lg"
                                        textAlign={"left"}
                                        p={2}
                                    >
                                        Yes
                                    </Text>
                                ) : (
                                    <Text
                                        borderWidth={"1px"}
                                        borderRadius="lg"
                                        textAlign={"left"}
                                        p={2}
                                    >
                                        No
                                    </Text>
                                )}
                            </Box>
                        )}
                        {/* Tag */}
                        <Box>
                            <Text mb={2} fontSize={"xl"} fontWeight="semibold">
                                Tag
                            </Text>
                            <Stack direction="row" align={"center"}>
                                {/* Date */}
                                <Badge variant="outline">
                                    {new Date(
                                        Number(data.report.createdAt)
                                    ).toLocaleString()}
                                </Badge>
                            </Stack>
                        </Box>
                    </Stack>
                )}
            </Container>
        </Container>
    );
};

export default Report;
