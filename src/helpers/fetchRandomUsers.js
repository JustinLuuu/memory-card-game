export const fetchRandomUsers = async () => {
    const response = await fetch("https://randomuser.me/api?results=4");
    let { results } = await response.json();
    results = results.map(x => ({
        key: x.name.first,
        src: x.picture.large,
    }));
    return results;
}