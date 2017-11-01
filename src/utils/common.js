/**
 * get the url anchor
 * @param url
 * @returns {string}
 */
export const getUrlAnchor = (url) => {
    const index1 = url.indexOf("#");
    const index2 = url.indexOf("?");
    if (index2 && index1 < index2) {
        return url.substring(index1 + 1, index2);
    }
    return url.substring(index1 + 1);
};
