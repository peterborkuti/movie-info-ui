export class MovieForm {
    readonly mode: string;
    readonly api: string;
    readonly title: string;

    constructor(mode: string, api: string, title: string) {
        this.mode = mode === 'flux' ? 'flux' : 'synchron';
        this.api = api === 'omdbapi' ? 'omdbapi' : 'themoviedb';
        this.title = title;
    }
}