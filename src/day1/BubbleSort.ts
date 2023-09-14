// Bubble sort repeatedly steps through the input list, swapping their values
// if needed until no swaps have to be performed during a pass, meaning that
// the list has become fully sorted.

// Runtime is O(n² - n) / 2 OR
// O(n²) (ignoring constants and insignificant numbers)

export default function bubble_sort(arr: number[]): void {
    for (let i = 0; i < arr.length; ++i) {
        for (let j = 0; j < arr.length - 1 - i; ++j) {
            if (arr[j] > arr[j + 1]) {
                const tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }
}
