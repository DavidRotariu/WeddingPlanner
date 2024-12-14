import { Card, Divider, Flex, Text, Title } from '@mantine/core';
import Image from 'next/image';

interface LocationCardProps {
    eventTitle: string;
    eventSubtitle: string;
    location: string;
    time: string;
    date: string;
}

export const LocationCard = ({ eventTitle, eventSubtitle, location, time, date }: LocationCardProps) => {
    return (
        <Card shadow="sm" p="lg" radius="md" w="100%" maw="800" my="xs">
            <Flex direction="row" align="center" justify="left" wrap="wrap">
                <Flex direction="column" align="center" px="md" w="120px">
                    <Title size="2rem" c="brown.1">
                        {eventTitle}
                    </Title>
                    <Title size="2rem" c="brown.1">
                        {eventSubtitle}
                    </Title>
                </Flex>
                <Divider orientation="vertical" size="sm" mx="lg" />
                <Flex direction="column" justify="center" align="left" gap="xs">
                    <Flex gap="sm" direction="row" align="center">
                        <Image src="location.svg" alt="Location Icon" width={24} height={24} />
                        <Text size="md" c="#7A8FA2">
                            {location}
                        </Text>
                    </Flex>
                    <Flex gap="sm" direction="row" align="center">
                        <Image src="time.svg" alt="Time Icon" width={24} height={24} />
                        <Text size="md" c="gray">
                            {time}
                        </Text>
                    </Flex>
                    <Flex gap="sm" direction="row" align="center">
                        <Image src="calendar.svg" alt="Calendar Icon" width={24} height={24} />
                        <Text size="md" c="gray">
                            {date}
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    );
};
