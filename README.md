# @ashkiani/web-context-encoder
Context-specific encoding utilities for HTML and other web output contexts.

Provides small, dependency-free helpers for encoding dynamic values before inserting them into generated output.

The current release supports HTML text and quoted ordinary HTML attribute contexts.

---

## Installation

```bash
npm install @ashkiani/web-context-encoder
```

---

## Why context-specific encoding?

Dynamic values inserted directly into generated HTML may be interpreted as markup or executable content instead of being displayed as text.

Output encoding converts characters that have special meaning in the destination context into a safe representation. Because HTML, JavaScript, CSS, and URLs are parsed differently, the correct encoding function depends on where the value will be inserted.

For additional guidance, see the [OWASP Cross Site Scripting Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html).

---

## Usage

### HTML text

Use `encodeHtmlText()` for a value placed between normal HTML tags:

```js
const { encodeHtmlText } = require('@ashkiani/web-context-encoder');

const text = '<h1>some text</h1>';
const html = `<p>${encodeHtmlText(text)}</p>`;
```

The generated HTML contains:

```html
<p>&lt;h1&gt;some text&lt;/h1&gt;</p>
```

The browser or email client displays the submitted value as text instead of interpreting it as HTML.

### Quoted HTML attributes

Use `encodeHtmlAttribute()` for a value placed inside a quoted ordinary HTML attribute:

```js
const { encodeHtmlAttribute } = require('@ashkiani/web-context-encoder');

const title = 'Internal "test"';
const html = `<div title="${encodeHtmlAttribute(title)}">Example</div>`;
```

Always quote the attribute value and use a hardcoded, ordinary attribute name.

---

## API

### `encodeHtmlText(value)`

Encodes a value for placement as plain text between normal HTML tags.

The following characters are encoded:

| Character | Encoded value |
| --------- | ------------- |
| `&`       | `&amp;`       |
| `<`       | `&lt;`        |
| `>`       | `&gt;`        |
| `"`       | `&quot;`      |
| `'`       | `&#39;`       |

`null` and `undefined` are returned as an empty string. Other values are converted to strings before encoding.

### `encodeHtmlAttribute(value)`

Encodes a value for placement inside a quoted ordinary HTML attribute. Letters and numbers are preserved; other characters are converted to hexadecimal HTML entities.

`null` and `undefined` are returned as an empty string. Other values are converted to strings before encoding.

---

## Important security boundaries

Encoding is context-specific. These functions are intended only for the contexts documented above.

They do not make values safe for:

* JavaScript or `<script>` blocks
* Event-handler attributes such as `onclick` or `onerror`
* CSS or `style` attributes
* URLs without separate URL and protocol validation
* Intentionally permitted HTML markup, which requires sanitization rather than encoding

This package performs output encoding. It does not replace input validation or HTML sanitization.

Encode values when generating output. Do not pre-encode values before storing them, and avoid encoding the same value more than once.

---

## Testing

```bash
npm test
```

---

## License

MIT © Siavash Ashkiani
