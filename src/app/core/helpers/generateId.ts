export function generateId(): string {
    return [Date.now(), Math.trunc(Math.random() * 10000)].map((value) => value.toString(36)).join('-');
}
