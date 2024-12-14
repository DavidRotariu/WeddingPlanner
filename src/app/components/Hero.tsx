/* eslint-disable @typescript-eslint/no-unused-vars */
import { BackgroundImage, Box, Center, Title } from '@mantine/core';

export const Hero = () => {
    return (
        <Box h="100vh" miw="full">
            <BackgroundImage h="100%" src="flowers.png">
                <Center h="90vh">
                    <Title size="10rem" py="sm" c="white">
                        Ezekiel & Simona
                    </Title>
                </Center>
            </BackgroundImage>
        </Box>
    );
};
