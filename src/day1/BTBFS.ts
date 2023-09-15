// Bredth-First Search implicity uses a Queue as the Data Structure
// // This is the oposite of a Depth-First Search which uses a Stack as the
// // Data Structure

// Running time should be O(n) if working properly on a Queue
// // but due to using const a = [] (which is an ArrayList within JS/TS)
// // it has a running time of O(n²)

export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    const q: (BinaryNode<number> | null)[] = [head];

    while (q.length) {
        const curr = q.shift() as BinaryNode<number> | undefined | null;
        if (!curr) {
            continue;
        }

        // search
        if (curr.value === needle) {
            return true;
        }
        q.push(curr.left);
        q.push(curr.right);
    }

    return false;
}
