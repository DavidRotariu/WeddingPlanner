'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BackgroundImage, Box, Button, Flex, Radio, Text, TextInput, Image, Title } from '@mantine/core';
import { useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';

export const InvitatiForm = ({ setConfirmat }: any) => {
    const largeScreen = useMediaQuery('(min-width: 1200px)');
    const mediumScreen = useMediaQuery('(max-width: 1200px) and (min-width: 768px)');
    const smallScreen = useMediaQuery('(max-width: 768px) and (min-width: 600px)');
    const mobileScreen = useMediaQuery('(max-width: 600px)');

    const [nrOfInvites, setNrOfInvites] = useState(2);
    const [email, setEmail] = useState('');
    const [invites, setInvites] = useState(
        Array.from({ length: nrOfInvites }).map(() => ({ name: '', surname: '', children: false }))
    );

    const handleInputChange = (index: number, field: 'name' | 'surname', value: string) => {
        const updatedInvites = [...invites];
        updatedInvites[index][field] = value;
        setInvites(updatedInvites);
    };

    const handleRadioChange = (index: number, value: string) => {
        const updatedInvites = [...invites];
        updatedInvites[index].children = value === 'copil';
        setInvites(updatedInvites);
    };

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
            const response = await fetch('https://mechanical-jacklyn-dvtech-310bbbab.koyeb.app/v1/guests/signup', {
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
        setInvites([...invites, { name: '', surname: '', children: false }]);
    };

    const removeInvite = () => {
        setNrOfInvites(nrOfInvites - 1);
        setInvites(invites.slice(0, nrOfInvites - 1));
    };

    return (
        <Box mih="100vh" w="100%" p={mobileScreen ? 'xs' : 'xl'} bg="offwhite.1">
            <Flex direction="column" align="center" w="100%">
                <Box w={largeScreen ? '60%' : mediumScreen ? '70%' : '90%'} py="xl">
                    <Flex direction="column" gap="xl">
                        <TextInput
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            size={mobileScreen ? 'sm' : 'md'}
                            styles={{
                                label: { color: '#5C4B51', fontSize: mobileScreen ? '0.9rem' : '1rem' }
                            }}
                        />

                        {Array.from({ length: nrOfInvites }).map((_, index) => (
                            <Flex
                                direction={mobileScreen ? 'column' : 'row'}
                                key={index}
                                gap="md"
                                w="100%"
                                align={mobileScreen ? 'stretch' : 'end'}
                            >
                                <TextInput
                                    label={`Prenume ${index + 1}`}
                                    value={invites[index].name}
                                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                                    size={mobileScreen ? 'sm' : 'md'}
                                    styles={{
                                        label: { color: '#5C4B51', fontSize: mobileScreen ? '0.9rem' : '1rem' }
                                    }}
                                    w={mobileScreen ? '100%' : '40%'}
                                />
                                <TextInput
                                    label={`Nume ${index + 1}`}
                                    value={invites[index].surname}
                                    onChange={(e) => handleInputChange(index, 'surname', e.target.value)}
                                    size={mobileScreen ? 'sm' : 'md'}
                                    styles={{
                                        label: { color: '#5C4B51', fontSize: mobileScreen ? '0.9rem' : '1rem' }
                                    }}
                                    w={mobileScreen ? '100%' : '40%'}
                                />
                                <Flex align="center" gap="md">
                                    <Radio.Group
                                        value={invites[index].children ? 'copil' : 'adult'}
                                        onChange={(value) => handleRadioChange(index, value)}
                                        size={mobileScreen ? 'sm' : 'md'}
                                    >
                                        <Flex direction="row" gap="xl">
                                            <Radio value="adult" label="Adult" />
                                            <Radio value="copil" label="Copil" />
                                        </Flex>
                                    </Radio.Group>
                                </Flex>
                                {index === nrOfInvites - 1 && nrOfInvites > 1 ? (
                                    <Button radius="xl" miw="30" mih="30" p="0" variant="subtle" onClick={removeInvite}>
                                        <Image src="minus.svg" alt="minus" h="30" w="30" />
                                    </Button>
                                ) : (
                                    <Box w="30" h="30"></Box>
                                )}
                            </Flex>
                        ))}

                        <Flex justify="end" p="0">
                            <Button radius="xl" miw="30" mah="30" p="0" variant="subtle" onClick={addInvite}>
                                <Image src="plus.svg" alt="plus" h="30" w="30" />
                            </Button>
                        </Flex>

                        <Flex justify="center">
                            <Button
                                onClick={handleSubmit}
                                disabled={!isFormValid()}
                                w={mobileScreen ? '100%' : '200'}
                                size={mobileScreen ? 'sm' : 'md'}
                            >
                                Confirmă prezența
                            </Button>
                        </Flex>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
};
