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
                    style={{
                        fontFamily: 'Arima'
                    }}
                    size={largeScreen ? '1.5rem' : mediumScreen ? '1.25rem' : smallScreen ? '1rem' : '0.875rem'}
                    pb="md"
                    c="brown.1"
                >
                    Vă invităm să fiți alături de noi în aceste momente speciale.
                </Text>
                <Center w="100%">
                    <LocationCard
                        eventTitle="Cununia"
                        eventSubtitle="religioasă"
                        location="Biserica Penticostală Plopeni"
                        time="Ora 14:00"
                        date="Joi, 1 Mai 2025"
                        googleMapsUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2687.207740539041!2d26.33037631227405!3d47.660960584101474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4734fb7dbb870703%3A0x104bca4f2f001d1!2sBiserica%20Penticostal%C4%83%20Plopeni!5e0!3m2!1sen!2sro!4v1740846590946!5m2!1sen!2sro"
                    />
                </Center>
                <Center w="100%">
                    <LocationCard
                        eventTitle="Masa"
                        eventSubtitle=""
                        location="La Filuță (Mălini)"
                        time="Ora 17:00"
                        date="Joi, 1 Mai 2025"
                        googleMapsUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2702.8972329843477!2d25.963629412260467!3d47.35540430516944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47350c9bb7a2e975%3A0xf8deb37fa7217508!2zUGVuc2l1bmVhIExhIEZpbHXFo8SD!5e0!3m2!1sen!2sro!4v1740846635661!5m2!1sen!2sro"
                    />
                </Center>
            </Flex>
        </Box>
    );
};
