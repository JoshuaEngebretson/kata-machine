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
        let node = this.lookup.get(key);
        // does it exist?
        if (!node) {
            // If it doesn't, we need to insert
            node = createNode(value);
            this.length++;
            this.prepend(node);
            // check capacity and evict if over
            this.trimCache();

            this.lookup.set(key, node);
            this.reverseLookup.set(node, key);
        } else {
            // If it does, we need to update to the front of the list
            this.detach(node);
            this.prepend(node);
            // and update the value
            node.value = value;
        }
    }

    get(key: K): V | undefined {
        const node = this.lookup.get(key);
        // check the cache to see if the node exists
        if (!node) {
            // if it doesn't, return undefined
            return undefined;
        }

        // update the value we found and move it to the front
        this.detach(node);
        this.prepend(node);

        // return out the value found or undefined if not exist
        return node.value;
    }

    private detach(node: Node<V>) {
        // Update where the prev node is pointing to for it's next
        // so if removing B from A<->B<->C
        // Point A to C as it's next
        if (node.prev) {
            node.prev.next = node.next;
        }

        // Update where the next node is pointing to for it's prev
        // so if removing B from A<->B<->C
        // Point C to A as it's prev
        if (node.next) {
            node.next.prev = node.prev;
        }

        // If this node was the head, update the head to the next node
        // So if removing A from A<->B<->C
        // Set the head to B
        if (this.head === node) {
            this.head = this.head.next;
        }

        // If this node was the tail, update the tail to the prev node
        // So if removing C from A<->B<->C
        // Set the tail to B
        if (this.tail === node) {
            this.tail = this.tail.prev;
        }

        // break the links from the node as it has been detached
        node.next = undefined;
        node.prev = undefined;
    }

    private prepend(node: Node<V>) {
        // Move the Node to the front of the cache
        if (!this.head) {
            // If there is no head, there is no tail
            // Set both to the node
            this.head = this.tail = node;
            return;
        }

        // As there is a head, set that as this nodes next point
        node.next = this.head;
        // set the previous heads prev to point to this node
        this.head.prev = node;

        // This node is now the head
        this.head = node;
    }

    private trimCache(): void {
        if (this.length <= this.capacity) {
            return;
        }

        const tail = this.tail as Node<V>;
        this.detach(this.tail as Node<V>);

        const key = this.reverseLookup.get(tail) as K;
        this.lookup.delete(key);
        this.reverseLookup.delete(tail);
        this.length--;
    }
}
