export class Game {
    id: number;
    week: number;
    opponent: string;
    location: string;
    stadiumName: string;
    homeOrAway: boolean;
    byuScore: number;
    oppScore: number;
    gameDate: string;
    closeDate: string;
    showUntilDate: string;
    diff: number;

    public constructor(init?: Partial<Game>) {
        Object.assign(this, init);
    }
}
