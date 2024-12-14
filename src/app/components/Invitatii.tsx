/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { Box, Center, Flex, Text, Title } from '@mantine/core';
import { InvitatiForm } from './InvitatiForm';
import { useState } from 'react';

export const Invitatii = () => {
    const [confirmat, setConfirmat] = useState(false);

    return (
        <Box mih="100vh" w="full" p="lg" bg="offwhite.1">
            {!confirmat ? (
                <>
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
                        <InvitatiForm setConfirmat={setConfirmat} />
                    </Flex>
                </>
            ) : (
                <Flex justify="center" align="center">
                    <Title size="8rem" py="sm" c="brown.1">
                        Multumim pentru Confirmare!
                    </Title>
                </Flex>
            )}
        </Box>
    );
};
