import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Invitatii } from './components/Invitatii';
import { Location } from './components/Location';

export default function Home() {
    return (
        <>
            <Hero />
            <Location />
            <Invitatii />
            <Footer />
        </>
    );
}
