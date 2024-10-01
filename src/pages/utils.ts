// Loads html
export const loadHtml = async (path: string) => {
    return await fetch(path)
        .then(response => response.text())
        .then(data => data)
        .catch(err => console.error("Error loading HTML file", err))
}