import { Card, Divider, Flex, Text, Title } from '@mantine/core';
import Image from 'next/image';
import { useMediaQuery } from '@mantine/hooks';

interface LocationCardProps {
    eventTitle: string;
    eventSubtitle: string;
    location: string;
    time: string;
    date: string;
    googleMapsUrl: string;
}

export const LocationCard = ({ eventTitle, eventSubtitle, location, time, date, googleMapsUrl }: LocationCardProps) => {
    const largeScreen = useMediaQuery('(min-width: 1200px)');
    const mediumScreen = useMediaQuery('(max-width: 1200px) and (min-width: 768px)');
    const smallScreen = useMediaQuery('(max-width: 768px) and (min-width: 480px)');
    const mobileScreen = useMediaQuery('(max-width: 480px)');

    const mapWidth = largeScreen ? '600px' : mediumScreen ? '500px' : '100%';
    const mapHeight = largeScreen ? '300px' : mediumScreen ? '250px' : '200px';

    return (
        <Card shadow="sm" p="lg" radius="md" w="100%" maw="800" my="xs">
            <Flex
                direction={mobileScreen ? 'column' : 'row'}
                align="center"
                justify={largeScreen ? 'left' : 'center2'}
                wrap="wrap"
            >
                <Flex direction="column" align="center" px="md" w={mobileScreen ? '100%' : '120px'}>
                    <Title
                        size={largeScreen ? '2.5rem' : mediumScreen ? '2rem' : smallScreen ? '1.75rem' : '1.5rem'}
                        c="brown.1"
                    >
                        {eventTitle}
                    </Title>
                    <Title
                        size={largeScreen ? '2.5rem' : mediumScreen ? '2rem' : smallScreen ? '1.75rem' : '1.5rem'}
                        c="brown.1"
                    >
                        {eventSubtitle}
                    </Title>
                </Flex>
                {!mobileScreen && <Divider orientation="vertical" size="sm" mx="lg" />}
                <Flex direction="column" justify="center" align={largeScreen ? 'left' : 'center'} gap="xs">
                    <Flex gap="sm" direction="row" align="center">
                        <Image src="location.svg" alt="Location Icon" width={24} height={24} />
                        <Text size={largeScreen ? 'md' : mediumScreen ? 'sm' : 'xs'} c="#7A8FA2">
                            {location}
                        </Text>
                    </Flex>
                    <Flex gap="sm" direction="row" align="center">
                        <Image src="time.svg" alt="Time Icon" width={24} height={24} />
                        <Text size={largeScreen ? 'md' : mediumScreen ? 'sm' : 'xs'} c="gray">
                            {time}
                        </Text>
                    </Flex>
                    <Flex gap="sm" direction="row" align="center">
                        <Image src="calendar.svg" alt="Calendar Icon" width={24} height={24} />
                        <Text size={largeScreen ? 'md' : mediumScreen ? 'sm' : 'xs'} c="gray">
                            {date}
                        </Text>
                    </Flex>
                </Flex>
                <Flex justify="center" ml="auto">
                    <iframe
                        src={googleMapsUrl}
                        width={mapWidth}
                        height={mapHeight}
                        style={{ border: 0, borderRadius: '8px' }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </Flex>
            </Flex>
        </Card>
    );
};
