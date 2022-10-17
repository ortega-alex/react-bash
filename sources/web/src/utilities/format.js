export const replaceAccents = str => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
export const replaceWhiteSpaceByCharacter = (str, char) => str.replace(/\s/g, char);
