import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { CreateElement } from 'vue'

/**
 * @property source: the markdown source.
 * @property visible: whether render the markdown. defaults to true
 * @property highlight: whether enable syntax highlight. defaults to true
 * @property html: whether enable html. defaults to true
 * @property xhtmlOut: whether enable xhtml. defaults to true
 * @property breaks: whether convert `\n` to `<br>`. defaults to true.
 * @property linkify: whether autoconvert URL-like text to links. defaults to true
 * @property emoji: whether convert emotion symbol to `<img emotion>`, defaults to true
 * @property typographer: whether enable some language-neutral replacement + quotes beautification, defaults to true
 * @property quotes: Double + single quotes replacement pairs, when typographer enabled, defaults to '“”‘’'
 *
 */
export interface IMarkdownOptions {
  source?: string
  visible?: boolean
  highlight?: boolean
  html?: boolean
  xhtmlOut?: boolean
  breaks?: boolean
  linkify?: boolean
  emoji?: boolean
  typographer?: boolean
  quotes?: string
}
/**
 * AbstractMarkdown Viewer Mixin
 * @abstract
 *
 */
@Component({
  components: {}
})
export class AbstractMarkdown extends Vue implements IMarkdownOptions {
  @Prop({ type: String, default: '' }) source!: string
  @Prop({ type: Boolean, default: true }) visible!: boolean
  @Prop({ type: Boolean, default: true }) highlight!: boolean
  @Prop({ type: Boolean, default: true }) html!: boolean
  @Prop({ type: Boolean, default: true }) xhtmlOut!: boolean
  @Prop({ type: Boolean, default: true }) breaks!: boolean
  @Prop({ type: Boolean, default: true }) linkify!: boolean
  @Prop({ type: Boolean, default: true }) emoji!: boolean
  @Prop({ type: Boolean, default: true }) typographer!: boolean
  @Prop({ type: String, default: '“”‘’' }) quotes!: string
  sourceData = this.source

  /**
   * It will be triggered when source or visible changed.
   */
  @Watch('source')
  @Watch('visible')
  protected _onBeforeRender() {
    this.sourceData = this.prerender()
    this.$forceUpdate()
  }

  /**
   * this prerender will be executed after source changed.
   * @param content the markdown text.
   */
  prerender(content = this.source) {
    /* istanbul ignore next */
    if (this.emoji) {
      content = this.parseEmoji(content)
    }
    return content
  }
  /**
   * Convert prepared markdown text to html.
   * @param text the prepared(prerender) markdown text.
   * @param options the markdown options.
   */
  toHtml(text: string, options?: IMarkdownOptions) {
    return text
  }

  /**
   * convert emotion char in the markdown text.
   * @abstract
   * @param text the markdown text to process
   */
  parseEmoji(text: string) {
    return text
  }

  render(h: CreateElement) {
    const vContent = this.visible ? this.toHtml(this.sourceData, this) : ''
    return h('div', {
      domProps: {
        innerHTML: vContent
      }
    })
  }

  beforeMount() {
    /* istanbul ignore next */
    if (this.$slots.default) {
      let vSource = ''
      for (const slot of this.$slots.default) {
        vSource += slot.text
      }
      if (vSource) {
        this.sourceData = this.prerender(vSource)
      }
    }
  }
}
