export interface Person {
    id: string;
    name: string;
}

export interface Chair {
    id: string;
    x: number;
    y: number;
    // person: Person | null;
}

export interface Table {
    id: string;
    x: number;
    y: number;
    chairs: Chair[];
}
