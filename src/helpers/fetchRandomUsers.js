 import cardsMock from "../mocks/cards.json";

export const fetchRandomUsers = async () => {
    try {
        const response = await fetch("https://randomuser.me/api?results=4");
        let { results } = await response.json();
        results = results.map(x => ({
            key: x.name.first,
            src: x.picture.large,
        }));
        return results;
    } catch (err) {
        console.log(err);
        return cardsMock;
    }
}