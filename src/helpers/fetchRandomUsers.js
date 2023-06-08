export const fetchRandomUsers = async () => {
    const response = await fetch("https://randomuser.me/api?results=4");
    const data = await response.json();
    return data.results;
}