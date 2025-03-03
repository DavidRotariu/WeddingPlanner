/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { BackgroundImage, Box, Center, Title, Flex, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from 'react';

export const Hero = () => {
    const largeScreen = useMediaQuery('(min-width: 1200px)');
    const mediumScreen = useMediaQuery('(max-width: 1200px) and (min-width: 768px)');
    const smallScreen = useMediaQuery('(max-width: 768px) and (min-width: 600px)');
    const mobileScreen = useMediaQuery('(max-width: 600px)');

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const weddingDate = new Date('2025-05-01T09:00:00');

        const timer = setInterval(() => {
            const now = new Date();
            const difference = weddingDate.getTime() - now.getTime();

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const backgroundImage = mobileScreen ? 'backgroundmobile.png' : 'backgrounddesktop.png';
    const justifyContent = mobileScreen ? 'start' : 'center';

    return (
        <Box h="100vh" miw="full">
            <BackgroundImage h="100%" src={backgroundImage}>
                {mobileScreen ? (
                    <Flex direction="column" justify={justifyContent} align="center" h="110vh" gap="xl">
                        {/* <Title
                            size={largeScreen ? '10rem' : mediumScreen ? '8rem' : smallScreen ? '6rem' : '3.5rem'}
                            py="sm"
                            c="white"
                            ta="center"
                        >
                            Ezekiel & Simona
                        </Title> */}

                        <Flex gap={largeScreen ? 'xl' : mediumScreen ? 'lg' : 'md'} align="center" mt="auto" mb="10rem">
                            <Box ta="center">
                                <Text
                                    style={{
                                        fontFamily: 'Arima'
                                    }}
                                    size={largeScreen ? '5rem' : mediumScreen ? '4rem' : '2.5rem'}
                                    c="#666057"
                                    fw={700}
                                >
                                    {timeLeft.days}
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: 'Arima'
                                    }}
                                    size={largeScreen ? '2rem' : mediumScreen ? '1.5rem' : '1rem'}
                                    c="#666057"
                                >
                                    Zile
                                </Text>
                            </Box>
                            <Text
                                style={{
                                    fontFamily: 'Arima'
                                }}
                                size={largeScreen ? '5rem' : mediumScreen ? '4rem' : '2.5rem'}
                                c="#666057"
                                fw={700}
                            >
                                :
                            </Text>
                            <Box ta="center">
                                <Text
                                    style={{
                                        fontFamily: 'Arima'
                                    }}
                                    size={largeScreen ? '5rem' : mediumScreen ? '4rem' : '2.5rem'}
                                    c="#666057"
                                    fw={700}
                                >
                                    {timeLeft.hours}
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: 'Arima'
                                    }}
                                    size={largeScreen ? '2rem' : mediumScreen ? '1.5rem' : '1rem'}
                                    c="#666057"
                                >
                                    Ore
                                </Text>
                            </Box>
                            <Text
                                style={{
                                    fontFamily: 'Arima'
                                }}
                                size={largeScreen ? '5rem' : mediumScreen ? '4rem' : '2.5rem'}
                                c="#666057"
                                fw={700}
                            >
                                :
                            </Text>
                            <Box ta="center">
                                <Text
                                    style={{
                                        fontFamily: 'Arima'
                                    }}
                                    size={largeScreen ? '5rem' : mediumScreen ? '4rem' : '2.5rem'}
                                    c="#666057"
                                    fw={700}
                                >
                                    {timeLeft.minutes}
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: 'Arima'
                                    }}
                                    size={largeScreen ? '2rem' : mediumScreen ? '1.5rem' : '1rem'}
                                    c="#666057"
                                >
                                    Minute
                                </Text>
                            </Box>
                            <Text
                                style={{
                                    fontFamily: 'Arima'
                                }}
                                size={largeScreen ? '5rem' : mediumScreen ? '4rem' : '2.5rem'}
                                c="#666057"
                                fw={700}
                            >
                                :
                            </Text>
                            <Box ta="center">
                                <Text
                                    style={{
                                        fontFamily: 'Arima'
                                    }}
                                    size={largeScreen ? '5rem' : mediumScreen ? '4rem' : '2.5rem'}
                                    c="#666057"
                                    fw={700}
                                >
                                    {timeLeft.seconds}
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: 'Arima'
                                    }}
                                    size={largeScreen ? '2rem' : mediumScreen ? '1.5rem' : '1rem'}
                                    c="#666057"
                                >
                                    Secunde
                                </Text>
                            </Box>
                        </Flex>
                    </Flex>
                ) : (
                    <Flex direction="column" py="5rem" align="center" h="110vh">
                        <Title
                            size={largeScreen ? '10rem' : mediumScreen ? '8rem' : smallScreen ? '6rem' : '3.5rem'}
                            c="#666057"
                            ml="auto"
                            mr="20rem"
                        >
                            Ezekiel
                        </Title>
                        <Title
                            size={largeScreen ? '10rem' : mediumScreen ? '8rem' : smallScreen ? '6rem' : '3.5rem'}
                            c="#666057"
                            ml="auto"
                            mr="20rem"
                            pb="5rem"
                        >
                            + Simona
                        </Title>

                        <Flex gap={largeScreen ? 'xl' : mediumScreen ? 'lg' : 'md'} ml="auto" mr="13rem">
                            <Box ta="center">
                                <Text
                                    style={{
                                        fontFamily: 'Arima'
                                    }}
                                    size={largeScreen ? '5rem' : mediumScreen ? '4rem' : '2.5rem'}
                                    c="#666057"
                                    fw={700}
                                >
                                    {timeLeft.days}
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: 'Arima'
                                    }}
                                    size={largeScreen ? '2rem' : mediumScreen ? '1.5rem' : '1rem'}
                                    c="#666057"
                                >
                                    Zile
                                </Text>
                            </Box>
                            <Text
                                style={{
                                    fontFamily: 'Arima'
                                }}
                                size={largeScreen ? '5rem' : mediumScreen ? '4rem' : '2.5rem'}
                                c="#666057"
                                fw={700}
                            >
                                :
                            </Text>
                            <Box ta="center">
                                <Text
                                    style={{
                                        fontFamily: 'Arima'
                                    }}
                                    size={largeScreen ? '5rem' : mediumScreen ? '4rem' : '2.5rem'}
                                    c="#666057"
                                    fw={700}
                                >
                                    {timeLeft.hours}
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: 'Arima'
                                    }}
                                    size={largeScreen ? '2rem' : mediumScreen ? '1.5rem' : '1rem'}
                                    c="#666057"
                                >
                                    Ore
                                </Text>
                            </Box>
                            <Text
                                style={{
                                    fontFamily: 'Arima'
                                }}
                                size={largeScreen ? '5rem' : mediumScreen ? '4rem' : '2.5rem'}
                                c="#666057"
                                fw={700}
                            >
                                :
                            </Text>
                            <Box ta="center">
                                <Text
                                    style={{
                                        fontFamily: 'Arima'
                                    }}
                                    size={largeScreen ? '5rem' : mediumScreen ? '4rem' : '2.5rem'}
                                    c="#666057"
                                    fw={700}
                                >
                                    {timeLeft.minutes}
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: 'Arima'
                                    }}
                                    size={largeScreen ? '2rem' : mediumScreen ? '1.5rem' : '1rem'}
                                    c="#666057"
                                >
                                    Minute
                                </Text>
                            </Box>
                            <Text
                                style={{
                                    fontFamily: 'Arima'
                                }}
                                size={largeScreen ? '5rem' : mediumScreen ? '4rem' : '2.5rem'}
                                c="#666057"
                                fw={700}
                            >
                                :
                            </Text>
                            <Box ta="center">
                                <Text
                                    style={{
                                        fontFamily: 'Arima'
                                    }}
                                    size={largeScreen ? '5rem' : mediumScreen ? '4rem' : '2.5rem'}
                                    c="#666057"
                                    fw={700}
                                >
                                    {timeLeft.seconds}
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: 'Arima'
                                    }}
                                    size={largeScreen ? '2rem' : mediumScreen ? '1.5rem' : '1rem'}
                                    c="#666057"
                                >
                                    Secunde
                                </Text>
                            </Box>
                        </Flex>
                    </Flex>
                )}
            </BackgroundImage>
        </Box>
    );
};
