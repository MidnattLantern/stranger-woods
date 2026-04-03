import { getMiniSudokuSetup } from './mini-sudoku-setup';
import { getGameSessionSudokuTableState, setGameSessionBeatenState } from './mini-sudoku-states';

export function getSudokuTableState(): number[][] {
    const setup = getMiniSudokuSetup();
    return setup.map(row => 
        row.map(cell =>
            cell.value
        )
    );
};

export function checkCellElement(event: Event) {
    const targetElement = event.currentTarget as HTMLSelectElement;
    const traverseToCellElement = targetElement.closest('td'); // .closest() is a convenient DOM traversal tool
    if (!traverseToCellElement) return;

    const targetCellRow = Number(traverseToCellElement.dataset.row);
    const targetCellColumn = Number(traverseToCellElement.dataset.column);

    const sudokuTableStateIndexOffset: number = -1; // table model's first index is 0, rather than 1
    const sudokuTableStateRow: number = targetCellRow + sudokuTableStateIndexOffset;
    const sudokuTableStateColumn: number = targetCellColumn + sudokuTableStateIndexOffset;

    const sudokuTableState = getGameSessionSudokuTableState();
    sudokuTableState[sudokuTableStateRow][sudokuTableStateColumn] = Number(targetElement.value);
}

// =================
// Validation helper
// =================
// Note: 2x3 box validation is not implemented, multiple solutions may be possible depending on the setup
function validationCheckAllCellsAreFilled() { // serving validateTable()
    const sudokuTableState = getGameSessionSudokuTableState();

    for (let rowIndex: number = 0; rowIndex < 6; rowIndex++) {
        for (let columnIndex: number = 0; columnIndex < 6; columnIndex++) {
            const cellTarget = sudokuTableState[rowIndex][columnIndex];
            if (cellTarget === 0) { // at least one cell isn't filled
                return false;
            }
        }
    }
    return true; // no cell was left empty
}

function validationCheckRows(): boolean { // serving validateTable()
    const sudokuTableState = getGameSessionSudokuTableState();

    let SUM_CONDITION: number = (1+2+3+4+5+6); // = 21
    let row1Sum: number = 0;
    let row2Sum: number = 0;
    let row3Sum: number = 0;
    let row4Sum: number = 0;
    let row5Sum: number = 0;
    let row6Sum: number = 0;

    for (let columnIndex: number = 0; columnIndex < 6; columnIndex++) {
        row1Sum += sudokuTableState[0][columnIndex];
        row2Sum += sudokuTableState[1][columnIndex];
        row3Sum += sudokuTableState[2][columnIndex];
        row4Sum += sudokuTableState[3][columnIndex];
        row5Sum += sudokuTableState[4][columnIndex];
        row6Sum += sudokuTableState[5][columnIndex];
    }

    if (row1Sum !== SUM_CONDITION) return false;
    if (row2Sum !== SUM_CONDITION) return false;
    if (row3Sum !== SUM_CONDITION) return false;
    if (row4Sum !== SUM_CONDITION) return false;
    if (row5Sum !== SUM_CONDITION) return false;
    if (row6Sum !== SUM_CONDITION) return false;

    return true;
}

function validationCheckColumns(): boolean { // serving validateTable()
    const sudokuTableState = getGameSessionSudokuTableState();

    const SUM_CONDITION: number = (1+2+3+4+5+6); // = 21
    let column1Sum: number = 0;
    let column2Sum: number = 0;
    let column3Sum: number = 0;
    let column4Sum: number = 0;
    let column5Sum: number = 0;
    let column6Sum: number = 0;

    for (let rowIndex: number = 0; rowIndex < 6; rowIndex++) {
        column1Sum += sudokuTableState[rowIndex][0];
        column2Sum += sudokuTableState[rowIndex][1];
        column3Sum += sudokuTableState[rowIndex][2];
        column4Sum += sudokuTableState[rowIndex][3];
        column5Sum += sudokuTableState[rowIndex][4];
        column6Sum += sudokuTableState[rowIndex][5];
    }

    if (column1Sum !== SUM_CONDITION) return false;
    if (column2Sum !== SUM_CONDITION) return false;
    if (column3Sum !== SUM_CONDITION) return false;
    if (column4Sum !== SUM_CONDITION) return false;
    if (column5Sum !== SUM_CONDITION) return false;
    if (column6Sum !== SUM_CONDITION) return false;

    return true;
}

export function validateTable() {
    const sudokuTableBodyElement = document.getElementById('sudokuTableBody');
    if (!sudokuTableBodyElement) return;

    const allCellsAreFilled: boolean = validationCheckAllCellsAreFilled();
    const allRowsAreOK: boolean = validationCheckRows();
    const allColumnsAreOK: boolean = validationCheckColumns();

    if (allCellsAreFilled && allRowsAreOK && allColumnsAreOK) {
        setGameSessionBeatenState(true);
    }
}
// =================