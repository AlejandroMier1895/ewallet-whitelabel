async function copyToClipboard(message) {
    try {
        navigator.clipboard.writeText(message);
    } catch (error) {
        throw error;
    }
}

export { copyToClipboard };