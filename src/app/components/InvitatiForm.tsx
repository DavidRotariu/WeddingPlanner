'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BackgroundImage, Box, Button, Flex, Radio, Text, TextInput, Image } from '@mantine/core';
import { useState } from 'react';

export const InvitatiForm = () => {
    const [nrOfInvites, setNrOfInvites] = useState(3);

    return (
        <Flex direction="column" gap="lg" w="80%" py="xl">
            <Flex direction="row" gap="md">
                <Box w="40"></Box>
                <Box w="50%">
                    <TextInput label="Email" />
                </Box>
            </Flex>

            {Array.from({ length: nrOfInvites }).map((_, index) => (
                <Flex direction="row" key={index} gap="md" w="full">
                    <Flex w="40" align="end">
                        {index === nrOfInvites - 1 && nrOfInvites > 1 && (
                            <Button
                                radius="50"
                                w="40"
                                p="0"
                                variant="subtle"
                                onClick={() => {
                                    setNrOfInvites(nrOfInvites - 1);
                                }}
                            >
                                <Image src="minus.svg" radius="sm" alt="minus"></Image>
                            </Button>
                        )}
                    </Flex>
                    <Box w="30%">
                        <TextInput miw="4/10" label={`Nume ${index + 1}`} />
                    </Box>
                    <Box w="30%">
                        <TextInput label={`Prenume`} />
                    </Box>
                    <Flex align="end" py="xs" ml="lg">
                        <Radio.Group defaultValue={index < 2 ? 'adult' : 'copil'}>
                            <Flex direction="row" gap="xl">
                                <Radio value="adult" label="Adult" />
                                <Radio value="copil" label="Copil" />
                            </Flex>
                        </Radio.Group>
                    </Flex>
                </Flex>
            ))}
            <Flex direction="row" gap="md">
                <Box w="40"></Box>
                <Button
                    radius="50"
                    w="40"
                    h="40"
                    p="0"
                    variant="subtle"
                    onClick={() => {
                        setNrOfInvites(nrOfInvites + 1);
                    }}
                >
                    <Image src="plus.svg" radius="sm" alt="plus"></Image>
                </Button>
            </Flex>
        </Flex>
    );
};
