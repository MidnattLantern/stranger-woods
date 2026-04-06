import { getSudokuTableState } from './mini-sudoku-helper';
import { getMiniSudokuSetup } from './mini-sudoku-setup';

let gameSessionBeatenState: boolean = false;
export const getGameSessionBeatenState = () => gameSessionBeatenState;
export function setGameSessionBeatenState(newState: boolean) {
    gameSessionBeatenState = newState;
}

let gameSessionMiniSudokuSetup = getMiniSudokuSetup();
export const getGameSessionMiniSudokuSeup = () => gameSessionMiniSudokuSetup;

let gameSessionSudokuTableState = getSudokuTableState();
export const getGameSessionSudokuTableState = () => gameSessionSudokuTableState;

export function updateMiniSudokuSetup() {
    gameSessionMiniSudokuSetup = getMiniSudokuSetup();
    gameSessionSudokuTableState = getSudokuTableState();
}