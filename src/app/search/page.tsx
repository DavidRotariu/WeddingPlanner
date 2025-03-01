/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Box, Button, Flex, Modal, Text, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Image from 'next/image';
import SearchTable from './SearchTable';

export default function HomePage() {
    return (
        <DndProvider backend={HTML5Backend}>
            <Box h="100vh" w="100vw" bg="offwhite.1">
                <SearchTable />
            </Box>
        </DndProvider>
    );
}
