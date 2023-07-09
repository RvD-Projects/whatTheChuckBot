export function escapeEntities(str:string) {
    const htmlEntities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;"
    };
    return str.replace(/([&<>\"'])/g, match => htmlEntities[match]);
}

export function unescapeEntities(str:string) {
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
