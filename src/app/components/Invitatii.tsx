/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { Box, Center, Flex, Text, Title } from '@mantine/core';
import { InvitatiForm } from './InvitatiForm';
import { useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';

export const Invitatii = () => {
    const [confirmat, setConfirmat] = useState(false);
    const largeScreen = useMediaQuery('(min-width: 1200px)');
    const mediumScreen = useMediaQuery('(max-width: 1200px) and (min-width: 768px)');
    const smallScreen = useMediaQuery('(max-width: 768px) and (min-width: 600px)');
    const mobileScreen = useMediaQuery('(max-width: 600px)');

    return (
        <Box mih="100vh" w="full" p="lg" bg="offwhite.1">
            {!confirmat ? (
                <>
                    <Flex direction="column" align="center">
                        <Title
                            size={largeScreen ? '8rem' : mediumScreen ? '6rem' : smallScreen ? '4rem' : '3rem'}
                            py="sm"
                            c="brown.1"
                            ta="center"
                        >
                            Confirmare
                        </Title>
                        <Text
                            style={{
                                fontFamily: 'Arima'
                            }}
                            size={largeScreen ? '1.5rem' : mediumScreen ? '1.25rem' : smallScreen ? '1rem' : '0.875rem'}
                            py="xs"
                            c="brown.1"
                            ta="center"
                        >
                            Vă așteptăm cu drag!
                        </Text>
                        <Text
                            style={{
                                fontFamily: 'Arima'
                            }}
                            size={largeScreen ? '1.5rem' : mediumScreen ? '1.25rem' : smallScreen ? '1rem' : '0.875rem'}
                            c="brown.1"
                            ta="center"
                            px={mobileScreen ? 'xs' : 'md'}
                        >
                            Te rugăm să ne anunți decizia ta prin completarea acestui formular!
                        </Text>
                    </Flex>
                    <Flex justify="center">
                        <InvitatiForm setConfirmat={setConfirmat} />
                    </Flex>
                </>
            ) : (
                <Center h="90vh">
                    <Title
                        size={largeScreen ? '8rem' : mediumScreen ? '6rem' : smallScreen ? '4rem' : '3rem'}
                        px="xl"
                        c="brown.1"
                        ta="center"
                    >
                        Multumim pentru Confirmare!
                    </Title>
                </Center>
            )}
        </Box>
    );
};
