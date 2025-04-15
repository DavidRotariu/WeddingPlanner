import { Box, Text, Anchor } from '@mantine/core';

export const Footer = () => {
    return (
        <Box
            py="md"
            bg="offwhite.1"
            style={{
                borderTop: '1px solid #e0e0e0',
                textAlign: 'center'
            }}
        >
            <Text size="sm" c="brown.1">
                Made by{' '}
                <Anchor href="https://thedvtech.com" target="_blank" c="brown.1" fw={600}>
                    dvtech
                </Anchor>
            </Text>
        </Box>
    );
};
