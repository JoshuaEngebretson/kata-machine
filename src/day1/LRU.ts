// LRU stands for Least Recently Used

type Node<T> = {
    value: T;
    next?: Node<T>;
    prev?: Node<T>;
};

function createNode<V>(value: V): Node<V> {
    return { value };
}

// Using a Doubly Linked List and a Hash Map
export default class LRU<K, V> {
    private length: number;
    private head?: Node<V>;
    private tail?: Node<V>;

    private lookup: Map<K, Node<V>>;
    private reverseLookup: Map<Node<V>, K>;

    constructor(private capacity: number = 10) {
        this.length = 0;
        this.head = this.tail = undefined;
        this.lookup = new Map<K, Node<V>>();
        this.reverseLookup = new Map<Node<V>, K>();
    }

    update(key: K, value: V): void {
        // does it exist?
        //
        // If it doesn't, we need to insert
        //  - check capacity and evict if over
        // If it does, we need to update to the front of the list
        // and update the value
    }

    get(key: K): V | undefined {
        // check the cache for existence
        // update the value we found and move it to the front
        // return out the value found or undefined if not exist
    }
}
