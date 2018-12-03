# Abstract Markdown viewer Mixin

```ts
/**
 * AbstractMarkdown Viewer Mixin
 * @abstract
 * @property source: the markdown source.
 * @property visible: whether render the markdown. defaults to true
 * @property highlight: whether enable syntax highlight. defaults to true
 * @property html: whether enable html. defaults to true
 * @property xhtmlOut: whether enable xhtml. defaults to true
 * @property breaks: whether convert '\n' to '<br>'. defaults to true.
 * @property linkify: whether autoconvert URL-like text to links. defaults to true
 * @property emoji: whether convert emotion symbol to '<img emotion>', defaults to true
 * @property typographer: whether enable some language-neutral replacement + quotes beautification, defaults to true
 * @property quotes: Double + single quotes replacement pairs, when typographer enabled, defaults to '“”‘’'
 *
 */
  /**
   * Convert prepared markdown text to html.
   * @param text the prepared(prerender) markdown text.
   * @param options the markdown options.
   */
  toHtml(text: string, options?: IMarkdownOptions){
    return text;
  }

  /**
   * convert emotion char in the markdown text.
   * @abstract
   * @param text the markdown text to process
   */
  parseEmoji(text: string) {
    return text;
  }


```
