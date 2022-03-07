


export const toURLString = (string) => {
    return string.split(' ').join('-').split('/').join('-').toLowerCase();
}