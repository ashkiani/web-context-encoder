'use strict';

const HTML_TEXT_ENTITIES = Object.freeze({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
});

function toText(value) {
    return value === null || value === undefined ? '' : String(value);
}

/**
 * Encodes a value for placement as plain text between normal HTML tags.
 *
 * Example:
 *   `<p>${encodeHtmlText(value)}</p>`
 *
 * This function is not intended for JavaScript, CSS, URL, script, style,
 * or event-handler contexts.
 *
 * @param {*} value Value to encode.
 * @returns {string} HTML-encoded text.
 */
function encodeHtmlText(value) {
    return toText(value).replace(
        /[&<>"']/g,
        character => HTML_TEXT_ENTITIES[character]
    );
}

/**
 * Encodes a value for placement inside a quoted ordinary HTML attribute.
 *
 * Example:
 *   `<div title="${encodeHtmlAttribute(value)}">Example</div>`
 *
 * The surrounding attribute value must be quoted. This function does not
 * validate URLs or make JavaScript, CSS, style, or event-handler attributes safe.
 *
 * @param {*} value Value to encode.
 * @returns {string} HTML-attribute-encoded text.
 */
function encodeHtmlAttribute(value) {
    return toText(value).replace(/[^\p{L}\p{N}]/gu, character => {
        const codePoint = character.codePointAt(0);
        return `&#x${codePoint.toString(16).toUpperCase()};`;
    });
}

module.exports = {
    encodeHtmlText,
    encodeHtmlAttribute
};
