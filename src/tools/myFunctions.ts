export function escapeEntities(str: string) {
    const htmlEntities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;"
    };
    return str.replace(/([&<>\"'])/g, match => htmlEntities[match]);
}

export function unescapeEntities(str: string) {
    const htmlEntities = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&apos;": "'"
    };
    return str.replace(/&amp;|&lt;|&gt;|&quot;|&apos;/g, match => htmlEntities[match]);
}

export function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
    return true;
}

export function textToLines(inputString: string, lineLength: number): string[] {
    const lines: string[] = [];
    for (let i = 0; i < inputString.length; i += lineLength) {
        lines.push(inputString.slice(i, i + lineLength));
    }
    return lines;
}

export function toSafeJsonString(object: any) {
    return JSON.stringify(object, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value // return everything else unchanged
        , 2);
}