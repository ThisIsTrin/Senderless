import {
    Box,
    Flex,
    IconButton,
    Menu,
    MenuButton,
    MenuGroup,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import React from "react";
import { DarkModeSwitch } from "./DarkModeSwitch";
import { TbMessageReport, TbAlien } from "react-icons/tb";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import Router from "next/router";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    const [{ data, fetching }] = useMeQuery();
    const [_, logout] = useLogoutMutation();

    // Profile menu, only for person who login
    const profile = (
        <Menu>
            <MenuButton
                as={IconButton}
                icon={<TbAlien />}
                aria-label="Profile"
            />
            <MenuList>
                <MenuGroup title="Profile">
                    <NextLink href="/dashboard" passHref>
                        <MenuItem>Dashbaord</MenuItem>
                    </NextLink>

                    <MenuItem
                        onClick={async () => {
                            await logout({});
                            Router.push("/");
                        }}
                    >
                        Logout
                    </MenuItem>
                </MenuGroup>
            </MenuList>
        </Menu>
    );

    if (fetching) {
    } else {
        return (
            <Flex maxW={"100%"}>
                <Box ml={"auto"} pt={4}>
                    {/* Statement to check if u are login or not */}
                    {data?.me ? profile : null}
                    {/* Report page nav bar */}
                    <NextLink href="/create-report" passHref>
                        <IconButton
                            aria-label="Report"
                            icon={<TbMessageReport />}
                            mx={4}
                        />
                    </NextLink>
                    {/* HEHE FLASHBANG */}
                    <DarkModeSwitch />
                </Box>
            </Flex>
        );
    }
};
