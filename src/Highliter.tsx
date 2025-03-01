import { UiNotification } from 'light-notifier'

const identifiers = [
  "async", "break", "class", "const", "continue", "debugger", "do", "while", "export", "for", "of", "in",
  "function", "if", "else", "let", "return", "switch", "throw", "try", "catch", "var", "while", "extends",
  "void", "typeof", "yield", "this", "super", "new", "null", "instanceof", "import", "delete", "await", "from", "finally",
  "true", "false", "null", "undefined", "static", "default"
]

const unsupported = `Your browser doesn't support code highlighting. Please try another.`

export class Highlighter {
  static #inserted = new Set<string>()
  static registry = 0
  static #identifiers = identifiers
  static #classes: string[] = ["Observable"]
  static #notificationShown = false


  static highlight = (ref: HTMLElement | null) => {
    if (!ref || typeof Highlight === 'undefined') {
      if (!this.#notificationShown) {
        setTimeout(() => {
          new UiNotification()
            .setMessage(unsupported)
            .warning()
            .setAutoHideDurationInMs(3000)
            .show()
        },1000)
        this.#notificationShown = true
      }
      return;
    }
    const walker = document.createTreeWalker(ref, NodeFilter.SHOW_TEXT)
    const nodes: Node[] = []
    let current = walker.nextNode()
    while (current) {
      nodes.push(current);
      current = walker.nextNode()
    }
    const content = ref.textContent || ''
    this.#highlightIdentifiers(content, nodes, ref)
    this.#highlightObjects(content, nodes, ref)
    this.#highlightFunctions(content, nodes, ref)
    this.#highlightValues(content, nodes, ref)
    this.#highlightComments(content, nodes, ref)
  }

  static #highlight = (nodes: Node[], identifiers: string[]) => {
    const ranges = nodes.map(element => {
      // console.log('element',  element)
      const text = element.textContent || ''

      let ranges: Range[] = []

      for (const str of identifiers) {
        let startPos = 0;
        startPos = 0;
        while (startPos < text.length) {
          const index = text.indexOf(str, startPos);
          if (index === -1) break;
          const prevToken = text[index-1]
          const nextToken = text[index + str.length]
          if (typeof prevToken !== 'undefined') {
            if (prevToken?.match(/[a-z]/i)) {
              break;
            }

          }
          const range = new Range()
          range.setStart(element, index);
          startPos = index + str.length;
          range.setEnd(element, startPos);
          if (!nextToken?.match(/[a-z]/i)) {
            ranges.push(range)
          }
        }
      }
      return ranges
    })

    // Create a Highlight object for the ranges.
    return new Highlight(...ranges.flat());
  }

  static #highlightStrings(nodes: Node[], ref: HTMLElement, identifiers: string[]) {
    const ranges = nodes.map(element => {
      // console.log('element',  element)
      const text = element.textContent || ''

      let ranges: Range[] = []

      for (const str of identifiers) {
        let startPos = 0;
        startPos = 0;
        while (startPos < text.length) {
          const index = text.indexOf(str, startPos);
          if (index === -1) break;
          const range = new Range()
          range.setStart(element, index);
          startPos = index + str.length;
          range.setEnd(element, startPos);
          ranges.push(range)
        }
      }
      return ranges
    })

    // Create a Highlight object for the ranges.
    return new Highlight(...ranges.flat());
  }

  static #highlightFunctions = (content: string, nodes: Node[], ref: HTMLElement) => {
    const maybeFn = content.matchAll(/\W\w*\(/g)
    const fns: string[] = []
    for (const result of maybeFn) {
      const [token] = result
      if (token.length > 2) {
        fns.push(token.replaceAll(/\W/g, ''))
      }
    }
    const highlight = this.#highlight(nodes, fns.concat(this.#classes))
    this.#insertRule('functions', highlight)
  }

  static #highlightIdentifiers = (content: string, nodes: Node[], ref: HTMLElement) => {
    const identifiers = this.#identifiers.filter(ident => content.includes(ident))
    const highlight = this.#highlight(nodes, identifiers)
    this.#insertRule('identifiers', highlight)
  }

  static #highlightObjects = (content: string, nodes: Node[], ref: HTMLElement) => {
    // \w*[.{1}](?:(?!\w).)*
    // \w*[.{1}]\w
    const maybeObjects = content.matchAll(/[a-zA-Z]+[.](?:(?!\w).)*/g)
    const _objects: string[] = []
    console.log(_objects)
    for (const result of maybeObjects) {
      _objects.push(result[0].replace('.',''))
    }

    const highlight = this.#highlight(nodes, _objects)
    this.#insertRule('objects', highlight)
  }

  static #highlightValues = (content: string, nodes: Node[], ref: HTMLElement) => {
    const maybeString = content.matchAll(/["|'|\/\*\*].*?["|'|\/]/g)
    const strings: string[] = []
    for (const result of maybeString) { strings.push(result[0]); }

    const highlight = this.#highlightStrings(nodes, ref, strings)
    this.#insertRule('strings', highlight)
  }

  static #highlightComments = (content: string, nodes: Node[], ref: HTMLElement) => {
    const maybeComments = content.matchAll(/\/\/(.*)[^(\r\n|\r|\n)]*/g)
    const comments: string[] = []
    for (const result of maybeComments) {
      comments.push(result[0])
    }
    const highlight = this.#highlightStrings(nodes, ref, comments)
    this.#insertRule('comments', highlight)
  }

  static #insertRule = (identifier: string, highlight: Highlight) => {
    const key = ++this.registry
    CSS.highlights.set(`js-${identifier}-${key}`, highlight)
    for (const sheet of document.styleSheets) {
      if (sheet.href?.includes('index')) {
        const rule = `::highlight(js-${identifier}-${key}) { color: var(--js-${identifier}, #); }`
        if (!this.#inserted.has(rule)) {
          this.#inserted.add(rule)
          sheet.insertRule(rule, sheet.cssRules.length)
        }
      }
    }
  }
}