import { Center, Container, Heading } from "@chakra-ui/react";
import { NavBar } from "../components/NavBar";

const notfound: React.FC<{}> = ({}) => {
    return (
        <Container maxW={"100%"}>
            {/* Navbar */}
            <NavBar />
            {/* Main content */}
            <Container>
                <Center my={"50%"}>
                    <Heading
                        bgClip="text"
                        bgGradient="linear(to-r, red.500, yellow.500)"
                    >
                        404 | Page not found.
                    </Heading>
                </Center>
            </Container>
        </Container>
    );
};

export default notfound;
