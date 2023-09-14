export default class SinglyLinkedList<T> {
    public length: number;

    constructor() {}

    // add a new node at the end - O(1)
    prepend(item: T): void {}

    // add a new node at the beginning - O(1)
    append(item: T): void {}

    // add a new node at a specific position - O(n)
    insertAt(item: T, idx: number): void {}

    // remove a node at a specific position - O(n)
    remove(item: T): T | undefined {}

    // remove a node at a specific position - O(n)
    removeAt(idx: number): T | undefined {}

    // get the node by its index - O(n)
    get(idx: number): T | undefined {}
}
