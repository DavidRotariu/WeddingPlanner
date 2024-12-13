'use client';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Flex, Radio, TextInput } from '@mantine/core';
import { useState } from 'react';

export const InvitatiForm = () => {
    const [nrOfInvites, setNrOfInvites] = useState(4);

    return (
        <Flex direction="column" gap="lg" w="80%" py="xl">
            <Box w="60%">
                <TextInput label="Email" />
            </Box>

            {Array.from({ length: nrOfInvites }).map((_, index) => (
                <Flex direction="row" key={index} gap="md" w="full">
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
        </Flex>
    );
};
