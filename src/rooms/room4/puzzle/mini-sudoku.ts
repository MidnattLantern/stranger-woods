import type { ICellModel } from './models';
import './mini-sudoku.scss';
import { getGameSessionMiniSudokuSeup, setGameSessionBeatenState, updateMiniSudokuSetup } from './mini-sudoku-states';
import { checkCellElement } from './mini-sudoku-helper';

// ================================
// Table chain generation fractions
// ================================
function generateSelectOptions() {
    const newSelectElement = document.createElement('select');
    newSelectElement.addEventListener('change', checkCellElement);

    for (let i: number = 0; i < 7; i++) {
        const newOption = document.createElement('option');
        newOption.value = String(i);
        newOption.textContent = String(i);
        newSelectElement.append(newOption);
    }

    return newSelectElement;
}

function generateCellElement(cellItem: ICellModel, rowDataset: string, columnDataset: string) {
    const newCellElement = document.createElement('td');
    newCellElement.dataset.row = `${rowDataset}`;
    newCellElement.dataset.column = `${columnDataset}`;

    if (cellItem.mutable) { // value 0 — guaranteed { value: 0, mutable: true }
        const generatedSelectOptions = generateSelectOptions();
        newCellElement.append(generatedSelectOptions);
    } else { // value 1 though 6 — for instance { value: 2, mutable: false }
        newCellElement.textContent = String(cellItem.value);
    }

    return newCellElement;
}

function generateRowElement(rowItem: ICellModel[], rowDataset: string) {
    const newRowElement = document.createElement('tr');
    newRowElement.dataset.row =`row-${rowDataset}`;

    for (let i: number = 0; i < rowItem.length; i++) {
        const cellItem = rowItem[i];
        const generatedCellElement = generateCellElement(cellItem, rowDataset, String(i+1)); // i+1 to init index with 1 instead of 0
        newRowElement.append(generatedCellElement);
    }

    return newRowElement;
}
// ================================

export function renderMiniSudoku() { // also initialize
    const room4Section = document.getElementById('room4Section') as HTMLDivElement | null;
    if (!room4Section) return;

    updateMiniSudokuSetup(); // syncorize setup UI and state
    const miniSudokuSetup = getGameSessionMiniSudokuSeup();

    // parent container
    const miniSudokuGameContainer = document.createElement('table');
    miniSudokuGameContainer.id = 'miniSudokuGameContainer';
    miniSudokuGameContainer.classList.add('mini-sudoku-game-container');

    // children
    const sudokuTableBody = document.createElement('tbody');
    sudokuTableBody.id = 'sudokuTableBody';

    for (let i: number = 0; i < miniSudokuSetup.length; i++) {
        const rowItem = miniSudokuSetup[i];
        const generatedRowElement = generateRowElement(rowItem, String(i+1)); // i+1 to init index with 1 instead of 0
        sudokuTableBody.append(generatedRowElement);
    }
    miniSudokuGameContainer.append(sudokuTableBody);

    //compile
    room4Section.append(miniSudokuGameContainer);
}

export function closeMiniSudokuGameSession() {
    setGameSessionBeatenState(false);
    const miniSudokuGameContainer = document.getElementById('miniSudokuGameContainer') as HTMLDivElement | null;
    if (miniSudokuGameContainer) miniSudokuGameContainer.remove();
}