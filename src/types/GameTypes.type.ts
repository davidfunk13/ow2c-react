export enum GameTypes {
    Control = "Control",
    Escort = "Escort",
    Hybrid = "Hybrid",
    Push = "Push",
    Flashpoint = "Flashpoint"
}

export type GameType = keyof typeof GameTypes;

export default GameType;
