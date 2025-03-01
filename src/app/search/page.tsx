'use client';
import { useState } from 'react';
import { Box, Container, Title, Flex, Divider, TextInput } from '@mantine/core';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SearchTable from './SearchTable';

export default function HomePage() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <DndProvider backend={HTML5Backend}>
            <Box h="100vh" w="100vw" bg="offwhite.1" p="lg">
                <Container size="lg">
                    {/* Page Title */}
                    <Flex justify="center" align="center" direction="column" mb="lg">
                        <Title order={1} size="2.5rem" fw={700} c="brown.7">
                            Lista Invitați
                        </Title>
                        <Divider my="md" w="50%" color="gray.4" />
                    </Flex>

                    {/* Search Input */}
                    <Flex justify="center" mb="md">
                        <TextInput
                            w="50%"
                            // rightSection={<FaSearch size="1.1rem" />}
                            placeholder="Caută după nume..."
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.currentTarget.value)}
                        />
                    </Flex>

                    {/* Table Section */}
                    <Flex justify="center" align="center">
                        <Box w="100%" maw={800} p="md" bg="white" >
                            <SearchTable searchQuery={searchQuery} />
                        </Box>
                    </Flex>
                </Container>
            </Box>
        </DndProvider>
    );
}
