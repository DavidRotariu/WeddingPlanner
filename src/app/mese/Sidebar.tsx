/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex, Image, NumberInput, ScrollArea, Switch, Text, TextInput, Title, Tooltip } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Guest } from './Guest';

type Guest = {
    children: boolean;
    created_at: string;
    email: string;
    id: string;
    name: string;
    seat: string;
    surname: string;
    table: string;
};

export const Sidebar = ({ guests, setGuests, tables, setTables }: any) => {
    const [seats, setSeats] = useState<string | number>(6);
    const [showInput, setShowInput] = useState(false);
    const [nume, setNume] = useState('');
    const [prenume, setPrenume] = useState('');
    const [copil, setCopil] = useState(false);

    useEffect(() => {
        const fetchGuests = async () => {
            try {
                const response = await fetch(
                    'https://mechanical-jacklyn-dvtech-310bbbab.koyeb.app/v1/guests/unassigned'
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                setGuests(data);
            } catch (error) {
                console.error('Error fetching guests:', error);
            }
        };

        fetchGuests();
    }, []);

    async function addTable() {
        const payload = {
            seats: seats
        };

        try {
            const response = await fetch('https://mechanical-jacklyn-dvtech-310bbbab.koyeb.app/v1/table', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                const error = await response.json();
                console.error('Error adding table:', error);
                return;
            }
            const data = await response.json();
            console.log('Table added successfully:', data);

            setTables((tables: any) => [...tables, data]);
        } catch (error) {
            console.error('Error adding table:', error);
        }
    }

    const handleAddGuest = async () => {
        if (!nume.trim() || !prenume.trim()) {
            console.error('Name fields cannot be empty');
            return;
        }

        const payload = {
            name: prenume,
            surname: nume,
            children: copil
        };

        try {
            const response = await fetch('https://mechanical-jacklyn-dvtech-310bbbab.koyeb.app/v1/guest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const error = await response.json();
                console.error('Error adding guest:', error);
                return;
            }

            const newGuest = await response.json();
            console.log('Guest added successfully:', newGuest);

            setGuests((prevGuests: Guest[]) => [...prevGuests, newGuest]);

            setNume('');
            setPrenume('');
            setCopil(false);
            setShowInput(false);
        } catch (error) {
            console.error('Error adding guest:', error);
        }
    };

    return (
        <Flex
            pos="absolute"
            top={0}
            left={0}
            w="250px"
            h="100%"
            bg="offwhite.1"
            opacity={0.8}
            p="md"
            direction="column"
            justify="start"
            gap="md"
        >
            <Text size="1.8rem" fw="semibold">
                Invitați fără locuri
            </Text>
            <ScrollArea w={300} h="80%">
                <Flex h="full" wrap="wrap" gap="sm">
                    {guests.length > 0 ? (
                        guests.map((guest: Guest) => <Guest key={guest.id} guest={guest} />)
                    ) : (
                        <div>Nu sunt invitati fara locuri.</div>
                    )}
                    <Tooltip label={showInput ? 'Anuleaza' : 'Adauga invitat'} position="top" withArrow>
                        <Button
                            radius="50"
                            w="40"
                            h="40"
                            p="0"
                            variant="subtle"
                            onClick={() => setShowInput(!showInput)}
                            mx="30"
                        >
                            {showInput ? (
                                <Image src="minus.svg" radius="sm" alt="plus" />
                            ) : (
                                <Image src="plus.svg" radius="sm" alt="plus" />
                            )}
                        </Button>
                    </Tooltip>

                    {showInput && (
                        <Flex direction="column" w="100%" mt="sm">
                            <Flex direction="row">
                                <TextInput
                                    placeholder="Prenume..."
                                    value={prenume}
                                    onChange={(event) => setPrenume(event.currentTarget.value)}
                                    mx="xs"
                                />
                                <TextInput
                                    placeholder="Nume..."
                                    value={nume}
                                    onChange={(event) => setNume(event.currentTarget.value)}
                                    mx="xs"
                                />
                            </Flex>
                            <Flex direction="row" justify="center" align="center">
                                <Switch
                                    size="lg"
                                    checked={copil}
                                    onChange={(event) => {
                                        setCopil(event.currentTarget.checked);
                                    }}
                                    onLabel="Copil"
                                    offLabel="Adult"
                                    mt="sm"
                                />
                                <Button mt="sm" mx="lg" px="xl" variant="filled" onClick={handleAddGuest}>
                                    Adauga
                                </Button>
                            </Flex>
                        </Flex>
                    )}
                </Flex>
            </ScrollArea>
            <Flex w="250px" direction="row" justify="center">
                <NumberInput value={seats} onChange={setSeats} w="100" min={2} max={12} />
                <Tooltip label={`Adauga masa cu ${seats} locuri`} position="top" withArrow>
                    <Button radius="50" w="40" h="40" p="0" variant="subtle" onClick={addTable} mx="30">
                        <Image src="plus.svg" radius="sm" alt="plus" />
                    </Button>
                </Tooltip>
            </Flex>
        </Flex>
    );
};
