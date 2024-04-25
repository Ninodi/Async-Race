export interface ICar{
    name: string;
    color: string;
    id?: number;
    time?: number;
    bestTime?: number;
    wins?: number;
    velocity?: number;
    position?: number;
}


export interface IWinnerInfo {
    id: number;
    time: number;
    wins: number;
}