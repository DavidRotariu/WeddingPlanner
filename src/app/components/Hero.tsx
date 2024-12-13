/* eslint-disable @typescript-eslint/no-unused-vars */
import { BackgroundImage, Box, Center, Text } from '@mantine/core';

export const Hero = () => {
    return (
        <Box h="100vh" miw="full">
            <BackgroundImage h="100%" src="flowers.jpg">
                <Center></Center>
            </BackgroundImage>
        </Box>
    );
};
