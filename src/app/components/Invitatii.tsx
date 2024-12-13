/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Center, Flex, Text, Title } from '@mantine/core';
import { InvitatiForm } from './InvitatiForm';

export const Invitatii = () => {
    return (
        <Box mih="100vh" w="full" p="lg" bg="offwhite.1">
            <Flex direction="column" align="center">
                <Title size="8rem" py="sm" c="brown.1">
                    Confirmare
                </Title>
                <Text size="1.5rem" py="xs" c="brown.1">
                    Te așteptăm cu drag!
                </Text>
                <Text size="1.5rem" c="brown.1">
                    Te rugăm să ne anunți decizia ta prin completarea acetsui formular!
                </Text>
            </Flex>
            <Flex justify="center">
                <InvitatiForm />
            </Flex>
        </Box>
    );
};
