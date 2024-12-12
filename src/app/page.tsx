import HeartLoader from './components/HeartLoader';
import { Center } from '@mantine/core';

export default function Home() {
    return (
        <Center w="full" h="95vh">
            <HeartLoader />
        </Center>
    );
}
