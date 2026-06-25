'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const {
    encodeHtmlText,
    encodeHtmlAttribute
} = require('../index');

test('encodeHtmlText encodes HTML-significant characters', () => {
    assert.equal(
        encodeHtmlText(`<h1 class="test">Tom & Jerry's</h1>`),
        '&lt;h1 class=&quot;test&quot;&gt;Tom &amp; Jerry&#39;s&lt;/h1&gt;'
    );
});

test('encodeHtmlText leaves ordinary text unchanged', () => {
    assert.equal(encodeHtmlText('Authorized internal test'), 'Authorized internal test');
});

test('encodeHtmlText handles null, undefined, and non-string values', () => {
    assert.equal(encodeHtmlText(null), '');
    assert.equal(encodeHtmlText(undefined), '');
    assert.equal(encodeHtmlText(123), '123');
    assert.equal(encodeHtmlText(false), 'false');
});

test('encodeHtmlText encodes an already encoded ampersand again', () => {
    assert.equal(encodeHtmlText('&lt;b&gt;'), '&amp;lt;b&amp;gt;');
});

test('encodeHtmlAttribute encodes non-alphanumeric characters', () => {
    assert.equal(
        encodeHtmlAttribute('Hello world "test"'),
        'Hello&#x20;world&#x20;&#x22;test&#x22;'
    );
});

test('encodeHtmlAttribute preserves Unicode letters and numbers', () => {
    assert.equal(encodeHtmlAttribute('Café123'), 'Café123');
});

test('encodeHtmlAttribute encodes characters that could break a quoted attribute', () => {
    assert.equal(
        encodeHtmlAttribute('" onmouseover="alert(1)'),
        '&#x22;&#x20;onmouseover&#x3D;&#x22;alert&#x28;1&#x29;'
    );
});
