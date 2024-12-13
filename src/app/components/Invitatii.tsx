'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Flex, Title } from '@mantine/core';
import { InvitatiForm } from './InvitatiForm';

export const Invitatii = () => {
    return (
        <Box h="100vh" miw="full" p="xl">
            <Title size="100px" pl="xl">
                Confirmare
            </Title>
            <Flex justify="center">
                <InvitatiForm />
            </Flex>
        </Box>
    );
};
