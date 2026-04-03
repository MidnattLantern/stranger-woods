import table1 from '../../../data/mini-sudoku-tables/table1.json';
import table2 from '../../../data/mini-sudoku-tables/table2.json';
import table3 from '../../../data/mini-sudoku-tables/table3.json';

let tableToUse = table1;
export function setTableToUse(table: string) {
    switch (table) {
        case 'table1':
            tableToUse = table1;
            break;
        case 'table2':
            tableToUse = table2;
            break;
        case 'table3':
            tableToUse = table3;
            break;
        default:
            tableToUse = table1;
            break;
    }
}

// using .map() a model with proerties is automatically generated
export const getMiniSudokuSetup = () =>
    // iterate through each horizontal row
    tableToUse.map(row =>
        // iterate through each cell within a row
        row.map(cellValue =>
            // 0 is the value for cells the player can mutate.
            // `cellValue === 0` return true for the mutable property
            ({value: cellValue, mutable: cellValue === 0})
        )
    );