/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Box, Button, Flex, Modal, Text, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Image from 'next/image';

import { Sidebar } from './Sidebar';
import { Guest } from '../types/tableTypes';
import Tables from './Tables';
import { useDisclosure } from '@mantine/hooks';

type Table = {
    id: string;
    seats: number;
    guests: Guest[];
};

export default function HomePage() {
    const [tables, setTables] = useState<Table[]>([]);
    const [guests, setGuests] = useState<Guest[]>([]);
    const [opened, { open, close }] = useDisclosure(false);

    useEffect(() => {
        const fetchTables = async () => {
            try {
                const response = await fetch('https://accused-puffin-dvtech-d86fdbe0.koyeb.app/v1/tables');
                const data = await response.json();

                const tableData = data['assigned'];

                const transformedData = tableData.map((table: any) => ({
                    id: table.id,
                    seats: parseInt(table.seats, 10),
                    guests: Object.keys(table.guests).map((key) => table.guests[key] || {})
                }));

                setTables(transformedData);
                console.log(transformedData);
            } catch (error) {
                console.error('Error fetching tables:', error);
            }
        };
        fetchTables();
    }, []);

    const handleSendEmails = async () => {
        try {
            const response = await fetch('https://accused-puffin-dvtech-d86fdbe0.koyeb.app/v1/email/all', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                const error = await response.json();
                console.error('Error sending emails:', error);
                return;
            }
            const data = await response.json();
            console.log('Emails sent successfully:', data);
        } catch (error) {
            console.error('Error sending emails:', error);
        } finally {
            close();
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <Box h="100vh" w="100vw" bg="offwhite.1">
                <Sidebar tables={tables} setTables={setTables} guests={guests} setGuests={setGuests} />
                <Flex
                    pos="absolute"
                    top={0}
                    left="300px"
                    right={0}
                    h="100px"
                    align="center"
                    justify="center"
                    bg="offwhite.1"
                    px="md"
                >
                    <Title size="6rem" py="sm" c="brown.1">
                        Locuri Mese
                    </Title>
                </Flex>
                <Flex pos="relative" mt="100px" ml="250px">
                    <Tables tables={tables} setTables={setTables} guests={guests} setGuests={setGuests} />
                </Flex>
                <Button
                    pos="fixed"
                    bottom="20px"
                    right="20px"
                    size="lg"
                    color="#C2A59E"
                    onClick={open}
                    radius="lg"
                    leftSection={<Image src="mail.svg" alt="mail" width="24" height="24" />}
                >
                    <span style={{ color: '#666057' }}>Trimite</span>
                </Button>
                <Modal opened={opened} onClose={close} title="Trimite email" lockScroll={false}>
                    <p>Sunteți siguri că vreți să trimiteți un email fiecărui invitat cu locurile lor?</p>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                        <Button variant="outline" color="gray" onClick={close}>
                            Anulare
                        </Button>
                        <Button variant="filled" color="blue" onClick={handleSendEmails}>
                            Confirmă
                        </Button>
                    </div>
                </Modal>
            </Box>
        </DndProvider>
    );
}
