/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { BackgroundImage, Box, Button, Card, Center, Divider, Flex, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Image from 'next/image';
import { LocationCard } from './LocationCard';

interface LocationCardProps {
    eventTitle: string;
    eventSubtitle: string;
    location: string;
    time: string;
    date: string;
}


export const Location = () => {
    const largeScreen = useMediaQuery('(min-width: 1200px)');
    const mediumScreen = useMediaQuery('(max-width: 1200px) and (min-width: 768px)');
    const smallScreen = useMediaQuery('(max-width: 768px) and (min-width: 600px)');
    const mobileScreen = useMediaQuery('(max-width: 600px)');

    return (
        <Box mih="100vh" w="full" p="lg" bg="offwhite.1">
            <Flex direction="column" align="center">
                <Title
                    size={largeScreen ? '8rem' : mediumScreen ? '6rem' : smallScreen ? '4rem' : '3rem'}
                    py="sm"
                    c="brown.1"
                >
                    Locațiile evenimentelor
                </Title>
                <Text
                    size={largeScreen ? '1.5rem' : mediumScreen ? '1.25rem' : smallScreen ? '1rem' : '0.875rem'}
                    pb="md"
                    c="brown.1"
                >
                    Te invităm să fii alături de noi în aceste momente speciale.
                </Text>

                <Center w="100%">
                    <LocationCard
                        eventTitle="Cununia"
                        eventSubtitle="civilă"
                        location="Primăria Salcea"
                        time="Ora 12:00"
                        date="Miercuri, 8 ianuarie 2025"
                    />
                </Center>
                <Center w="100%">
                    <LocationCard
                        eventTitle="Cununia"
                        eventSubtitle="religioasă"
                        location="Biserica Penticostală Plopeni"
                        time="Ora 09:00"
                        date="Duminică, 12 ianuarie 2025"
                    />
                </Center>
                <Center w="100%">
                    <LocationCard
                        eventTitle="Masa"
                        eventSubtitle=""
                        location="La Filuță"
                        time="Ora 13:00"
                        date="Miercuri, 12 ianuarie 2025"
                    />
                </Center>
            </Flex>
        </Box>
    );
};
