/* eslint-disable @typescript-eslint/no-unused-vars */
import { BackgroundImage, Box, Button, Card, Center, Divider, Flex, Text, Title } from '@mantine/core';
import Image from 'next/image';
import { LocationCard } from './LocationCard';

export const Location = () => {
    return (
        <Box mih="100vh" w="full" p="lg" bg="offwhite.1">
            <Flex direction="column" align="center">
                <Title size="8rem" py="sm" c="brown.1">
                    Locațiile evenimentelor
                </Title>
                <Text size="1.5rem" pb="md" c="brown.1">
                    Te invităm să fii alături de noi în aceste momente speciale.
                </Text>
                <LocationCard
                    eventTitle="Cununia"
                    eventSubtitle="civilă"
                    location="Primăria Salcea"
                    time="Ora 12:00"
                    date="Miercuri, 8 ianuarie 2025"
                />
                <LocationCard
                    eventTitle="Cununia"
                    eventSubtitle="religioasă"
                    location="Biserica Penticostală Plopeni"
                    time="Ora 09:00"
                    date="Duminică, 12 ianuarie 2025"
                />
                <LocationCard
                    eventTitle="Masa"
                    eventSubtitle=""
                    location="La Filuță"
                    time="Ora 13:00"
                    date="Miercuri, 12 ianuarie 2025"
                />
            </Flex>
        </Box>
    );
};
