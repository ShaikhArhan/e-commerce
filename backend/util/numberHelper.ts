// export const decimalChecker = (num) => {
//     if (typeof num !== "number" || isNaN(num)) {
//         return { message: "invalid-input", status: false };
//     }

//     const isDecimal = num % 1 !== 0;

//     return {
//         data: isDecimal ? parseFloat(num.toFixed(1)) : num,
//         message: isDecimal ? "decimal" : "not-decimal",
//         isDecimal: isDecimal,
//         status: true
//     };
// };


// export const RoundOffNumberMaker = (num) => {
//     const result = decimalChecker(num)
//     if (!result.status) {
//         return result
//     }
//     if (!result.isDecimal) {
//         return {
//             data: result.data,
//             message: "not-decimal",
//             status: true
//         }
//     }
//     const decimalNumber = result.data * 10 % 10

//     if (decimalNumber === 5) {
//         return {
//             data: result.data + 0.5,
//             message: "rounded-off",
//             status: true
//         }
//     }

//     return {
//         data: Math.round(result.data),
//         message: "not-rounded-off",
//         status: true
//     }
// }


export const roundToHalf = (value: string | number) => {
    const num = typeof value === "string" ? parseFloat(value) : value;
    return Math.round(num * 2) / 2;
}