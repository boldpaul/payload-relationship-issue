export function extractPlainText(node: unknown): string {
    if (!node || typeof node !== 'object') return '';

    const text = (node as { text?: unknown }).text;
    if (typeof text === 'string') return text;

    const children = (node as { children?: unknown }).children;
    if (Array.isArray(children)) {
        return children.map(extractPlainText).join('');
    }

    const root = (node as { root?: { children?: unknown } }).root;
    if (root && Array.isArray(root.children)) {
        return root.children.map(extractPlainText).join('');
    }

    return '';
}