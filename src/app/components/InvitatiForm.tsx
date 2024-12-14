'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BackgroundImage, Box, Button, Flex, Radio, Text, TextInput, Image } from '@mantine/core';
import { useState } from 'react';

export const InvitatiForm = ({ setConfirmat }: any) => {
    const [nrOfInvites, setNrOfInvites] = useState(3);
    const [email, setEmail] = useState('');
    const [invites, setInvites] = useState(
        Array.from({ length: nrOfInvites }).map(() => ({ name: '', surname: '', children: false }))
    );

    // updating the text inputs
    const handleInputChange = (index: number, field: 'name' | 'surname', value: string) => {
        const updatedInvites = [...invites];
        updatedInvites[index][field] = value;
        setInvites(updatedInvites);
    };
    // updating the radio inputs
    const handleRadioChange = (index: number, value: string) => {
        const updatedInvites = [...invites];
        updatedInvites[index].children = value === 'copil';
        setInvites(updatedInvites);
    };
    // add invitees endpoint
    const handleSubmit = async () => {
        const requestBody = {
            email,
            guests: invites.map((invite) => ({
                name: invite.name,
                surname: invite.surname,
                children: invite.children
            }))
        };
        try {
            const response = await fetch('https://accused-puffin-dvtech-d86fdbe0.koyeb.app/v1/guests/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error('Failed to submit the form');
            }
            const data = await response.json();
            console.log('Form submitted successfully:', data);
            setConfirmat(true);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const isFormValid = () => {
        return (
            email.trim() !== '' && invites.every((invite) => invite.name.trim() !== '' && invite.surname.trim() !== '')
        );
    };

    const addInvite = () => {
        setNrOfInvites(nrOfInvites + 1);
        setInvites([
            ...invites,
            { name: '', surname: '', children: false } // Ensure new invite has 'name', 'surname', and 'children' fields initialized
        ]);
    };

    const removeInvite = () => {
        setNrOfInvites(nrOfInvites - 1);
        setInvites(invites.slice(0, nrOfInvites - 1));
    };

    return (
        <Flex direction="column" gap="lg" w="80%" py="xl">
            <Flex direction="row" gap="md">
                <Box w="40"></Box>
                <Box w="50%">
                    <TextInput label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Box>
            </Flex>

            {Array.from({ length: nrOfInvites }).map((_, index) => (
                <Flex direction="row" key={index} gap="md" w="full">
                    <Flex w="40" align="end">
                        {index === nrOfInvites - 1 && nrOfInvites > 1 && (
                            <Button radius="50" w="40" p="0" variant="subtle" onClick={removeInvite}>
                                <Image src="minus.svg" radius="sm" alt="minus" />
                            </Button>
                        )}
                    </Flex>
                    <Box w="30%">
                        <TextInput
                            label={`Name ${index + 1}`}
                            value={invites[index].name}
                            onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                        />
                    </Box>
                    <Box w="30%">
                        <TextInput
                            label={`Surname ${index + 1}`}
                            value={invites[index].surname}
                            onChange={(e) => handleInputChange(index, 'surname', e.target.value)}
                        />
                    </Box>
                    <Flex align="end" py="xs" ml="lg">
                        <Radio.Group
                            value={invites[index].children ? 'copil' : 'adult'}
                            onChange={(value) => handleRadioChange(index, value)}
                        >
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
                <Button radius="50" w="40" h="40" p="0" variant="subtle" onClick={addInvite}>
                    <Image src="plus.svg" radius="sm" alt="plus" />
                </Button>
            </Flex>

            <Button onClick={handleSubmit} disabled={!isFormValid()}>
                Submit
            </Button>
        </Flex>
    );
};
