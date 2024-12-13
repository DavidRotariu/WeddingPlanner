import { Hero } from './components/Hero';
import { Information } from './components/Information';
import { Invitatii } from './components/Invitatii';
import { Location } from './components/Location';

export default function Home() {
    return (
        <>
            <Hero />
            <Information />
            <Location />
            <Invitatii />
        </>
    );
}
