// 2d array to lateX matrix
function toLatexBMatrix(arr, fix) {
    if (!Array.isArray(arr) || arr.length === 0) {
        throw new Error("Input must be a non-empty 2D array");
    }
    const cols = arr[0].length;
    if (cols === 0) {
        throw new Error("Matrix must have at least one column");
    }
    // ensure proper 2D structure
    for (let i = 0; i < arr.length; i++) {
        if (!Array.isArray(arr[i]) || arr[i].length !== cols) {
            throw new Error("All rows must be arrays of equal length");
        }
    }
    // formatter helper
    const formatValue = (v) => {
        if (typeof v === "number" && typeof fix === "number") {
            const rounded = Number(v.toFixed(fix));
            return Object.is(rounded, -0) ? "0" : String(rounded);
        }
        return String(v);
    };
    const latexRows = arr
        .map(row => row.map(formatValue).join(" & "))
        .join(" \\\\ ");
    return `\\begin{bmatrix} ${latexRows} \\end{bmatrix}`;
}
function toLatexDeterminant(arr, fix) {
    if (!Array.isArray(arr) || arr.length === 0) {
        throw new Error("Input must be a non-empty 2D array");
    }
    const rows = arr.length;
    const cols = arr[0].length;
    if (cols === 0) {
        throw new Error("Matrix must have at least one column");
    }
    // rectangular check
    for (let i = 0; i < rows; i++) {
        if (!Array.isArray(arr[i]) || arr[i].length !== cols) {
            throw new Error("All rows must be arrays of equal length");
        }
    }
    // determinant must be square
    if (rows !== cols) {
        throw new Error("Determinant is defined only for square matrices");
    }
    // formatter (same logic you used before)
    const formatValue = (v) => {
        if (typeof v === "number" && typeof fix === "number") {
            const rounded = Number(v.toFixed(fix));
            return Object.is(rounded, -0) ? "0" : String(rounded);
        }
        return String(v);
    };
    const latexRows = arr
        .map(row => row.map(formatValue).join(" & "))
        .join(" \\\\ ");
    return `\\begin{vmatrix} ${latexRows} \\end{vmatrix}`;
}
function renderMatrixInputs(rows, cols, containerId, cellSize = 50) {
    const container = document.getElementById(containerId);
    if (!container) {
        throw new Error(`Container with id "${containerId}" not found`);
    }
    container.innerHTML = "";
    // Wrapper
    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.alignItems = "stretch";
    wrapper.style.justifyContent = "center";
    wrapper.style.gap = "6px";
    // Grid
    const grid = document.createElement("div");
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = `repeat(${cols}, ${cellSize}px)`;
    grid.style.gap = "6px";
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const input = document.createElement("input");
            input.type = "text";
            input.inputMode = "numeric";
            input.style.width = `${cellSize}px`;
            input.style.height = `50px`;
            input.style.textAlign = "center";
            input.style.fontSize = "16px";
            input.style.border = "1px solid #333";
            input.style.borderRadius = "4px";
            input.dataset.row = String(i);
            input.dataset.col = String(j);
            grid.appendChild(input);
        }
    }
    // Left bracket
    const leftBracket = document.createElement("div");
    leftBracket.style.borderLeft = "2px solid black";
    leftBracket.style.borderTop = "2px solid black";
    leftBracket.style.borderBottom = "2px solid black";
    leftBracket.style.width = "10px";
    // Right bracket
    const rightBracket = document.createElement("div");
    rightBracket.style.borderRight = "2px solid black";
    rightBracket.style.borderTop = "2px solid black";
    rightBracket.style.borderBottom = "2px solid black";
    rightBracket.style.width = "10px";
    wrapper.appendChild(leftBracket);
    wrapper.appendChild(grid);
    wrapper.appendChild(rightBracket);
    container.appendChild(wrapper);
}
function readMatrix2D(containerId, rows, cols) {
    const container = document.getElementById(containerId);
    if (!container) {
        throw new Error(`Container with id "${containerId}" not found`);
    }
    const inputs = container.querySelectorAll("input");
    const matrix = Array.from({ length: rows }, () => Array.from({ length: cols }, () => null));
    inputs.forEach(input => {
        const row = Number(input.dataset.row);
        const col = Number(input.dataset.col);
        if (Number.isInteger(row) &&
            Number.isInteger(col) &&
            row < rows &&
            col < cols) {
            matrix[row][col] = parseFloat(input.value);
        }
    });
    return matrix;
}
function verifyMatrix2D(inputMatrix, trueMatrix) {
    var _a, _b;
    const rows = trueMatrix.length;
    const cols = (_b = (_a = trueMatrix[0]) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
    // dimension check
    if (inputMatrix.length !== rows ||
        inputMatrix.some(row => row.length !== cols)) {
        throw new Error("Matrix dimensions do not match");
    }
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (!verify_values(inputMatrix[i][j], trueMatrix[i][j])) {
                return false;
            }
        }
    }
    return true;
}
function transposeMatrix(matrix) {
    if (matrix.length === 0)
        return [];
    const rows = matrix.length;
    const cols = matrix[0].length;
    // ensure rectangular matrix
    if (!matrix.every(row => row.length === cols)) {
        throw new Error("Matrix must be rectangular");
    }
    const result = Array.from({ length: cols }, () => Array.from({ length: rows }));
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            result[j][i] = matrix[i][j];
        }
    }
    return result;
}
function multiplyMatrices(A, B, fix) {
    if (A.length === 0 || B.length === 0) {
        throw new Error("Matrices must not be empty");
    }
    const aRows = A.length;
    const aCols = A[0].length;
    const bRows = B.length;
    const bCols = B[0].length;
    // rectangular checks
    if (!A.every(row => row.length === aCols)) {
        throw new Error("Matrix A is not rectangular");
    }
    if (!B.every(row => row.length === bCols)) {
        throw new Error("Matrix B is not rectangular");
    }
    // dimension compatibility check
    if (aCols !== bRows) {
        throw new Error(`Matrix multiplication not possible: A is ${aRows}×${aCols}, B is ${bRows}×${bCols}`);
    }
    // result matrix (aRows × bCols)
    const result = Array.from({ length: aRows }, () => Array.from({ length: bCols }, () => 0));
    for (let i = 0; i < aRows; i++) {
        for (let j = 0; j < bCols; j++) {
            for (let k = 0; k < aCols; k++) {
                result[i][j] += A[i][k] * B[k][j];
            }
            // ✅ optional decimal fixing
            if (typeof fix === "number") {
                const rounded = Number(result[i][j].toFixed(fix));
                result[i][j] = Object.is(rounded, -0) ? 0 : rounded;
            }
        }
    }
    return result;
}
function inverseMatrix(matrix, fix) {
    const n = matrix.length;
    if (n === 0) {
        throw new Error("Matrix must not be empty");
    }
    if (!matrix.every(row => row.length === n)) {
        throw new Error("Matrix must be square");
    }
    // clone matrix (don’t mutate input)
    const A = matrix.map(row => [...row]);
    // identity matrix
    const I = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
    // Gauss-Jordan elimination
    for (let col = 0; col < n; col++) {
        // find pivot
        let pivotRow = col;
        for (let r = col; r < n; r++) {
            if (Math.abs(A[r][col]) > Math.abs(A[pivotRow][col])) {
                pivotRow = r;
            }
        }
        if (A[pivotRow][col] === 0) {
            throw new Error("Matrix is singular (not invertible)");
        }
        // swap rows
        [A[col], A[pivotRow]] = [A[pivotRow], A[col]];
        [I[col], I[pivotRow]] = [I[pivotRow], I[col]];
        // normalize pivot row
        const pivot = A[col][col];
        for (let j = 0; j < n; j++) {
            A[col][j] /= pivot;
            I[col][j] /= pivot;
        }
        // eliminate other rows
        for (let r = 0; r < n; r++) {
            if (r === col)
                continue;
            const factor = A[r][col];
            for (let j = 0; j < n; j++) {
                A[r][j] -= factor * A[col][j];
                I[r][j] -= factor * I[col][j];
            }
        }
    }
    // optional decimal fixing
    if (typeof fix === "number") {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                const v = Number(I[i][j].toFixed(fix));
                I[i][j] = Object.is(v, -0) ? 0 : v;
            }
        }
    }
    return I;
}
function determinant(matrix, fix) {
    const n = matrix.length;
    if (n === 0) {
        throw new Error("Matrix must not be empty");
    }
    if (!matrix.every(row => row.length === n)) {
        throw new Error("Determinant requires a square matrix");
    }
    // clone matrix (do not mutate input)
    const A = matrix.map(row => [...row]);
    let det = 1;
    let swapCount = 0;
    for (let col = 0; col < n; col++) {
        // find pivot
        let pivotRow = col;
        for (let r = col; r < n; r++) {
            if (Math.abs(A[r][col]) > Math.abs(A[pivotRow][col])) {
                pivotRow = r;
            }
        }
        // singular matrix
        if (A[pivotRow][col] === 0) {
            return 0;
        }
        // swap rows if needed
        if (pivotRow !== col) {
            [A[col], A[pivotRow]] = [A[pivotRow], A[col]];
            swapCount++;
        }
        const pivot = A[col][col];
        det *= pivot;
        // eliminate below
        for (let r = col + 1; r < n; r++) {
            const factor = A[r][col] / pivot;
            for (let c = col; c < n; c++) {
                A[r][c] -= factor * A[col][c];
            }
        }
    }
    // adjust sign for row swaps
    if (swapCount % 2 === 1) {
        det = -det;
    }
    // optional rounding
    if (typeof fix === "number") {
        const rounded = Number(det.toFixed(fix));
        det = Object.is(rounded, -0) ? 0 : rounded;
    }
    return det;
}
function convertMatrixInputsToSpans(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        throw new Error(`Container with id "${containerId}" not found`);
    }
    const inputs = container.querySelectorAll("input");
    inputs.forEach(input => {
        const span = document.createElement("span");
        // copy value
        span.textContent = input.value || "";
        // keep size & alignment (important for matrix layout)
        span.style.display = "inline-flex";
        span.style.alignItems = "center";
        span.style.justifyContent = "center";
        span.style.width = input.style.width || "50px";
        span.style.height = input.style.height || "50px";
        span.style.border = input.style.border || "1px solid #333";
        span.style.borderRadius = input.style.borderRadius || "4px";
        span.style.fontSize = input.style.fontSize || "16px";
        span.style.boxSizing = "border-box";
        // optionally preserve matrix indices
        if (input.dataset.row)
            span.dataset.row = input.dataset.row;
        if (input.dataset.col)
            span.dataset.col = input.dataset.col;
        // replace input with span
        input.replaceWith(span);
    });
}