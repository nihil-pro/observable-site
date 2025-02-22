const identifiers = [
  "async", "break", "class", "const", "continue", "debugger", "do", "while", "export", "for", "of", "in",
  "function", "if", "else", "let", "return", "switch", "throw", "try", "catch", "var", "while", "extends",
  "void", "typeof", "yield", "this", "super", "new", "null", "instanceof", "import", "delete", "await", "from", "finally",
  "true", "false", "null", "undefined", "static"
]

class Foo /** extends Array */ {

}

export class Highlighter {
  static registry = 0
  static #identifiers = identifiers
  static #classes: string[] = ["Observable"]
  static #objects: string[] = []
  static #listeners: string[] = []

  static {
    try {
      if (typeof Highlight !== 'undefined') {
        Reflect.ownKeys(window)
          .forEach((key) => {
            if (typeof key === 'string') {
              if (key[0] === 'o' && key[1] === 'n') {
                this.#listeners.push(key)
              } else {
                const value = Reflect.get(window, key)
                if (value && typeof value === 'object') {
                  this.#objects.push(key)
                }
              }
            }
          })
      }
    } catch {}

  }

  static highlight = (ref: HTMLElement | null) => {
    if (!ref || typeof Highlight === 'undefined') { return; }
    const walker = document.createTreeWalker(ref, NodeFilter.SHOW_TEXT)
    const nodes: Node[] = []
    let current = walker.nextNode()
    while (current) {
      nodes.push(current);
      current = walker.nextNode()
    }
    const content = ref.textContent || ''

    const maybeFn = content.matchAll(/\W\w*\(/g)
    const fns: string[] = []
    for (const result of maybeFn) {
      const [token] = result
      if (token.length > 2) {
        fns.push(token.replaceAll(/\W/g, ''))
      }
    }
    this.#highlight(nodes, ref, fns.concat(this.#classes))
      .then(highlight => {
        const key = ++this.registry
        CSS.highlights.set(`js-functions-${key}`, highlight)
        for (const sheet of document.styleSheets) {
          if (sheet.href?.includes('index')) {
            sheet.insertRule(`::highlight(js-functions-${key}) { color: var(--js-functions); }`, sheet.cssRules.length)
          }
        }
      })
      .catch(e => console.log(e))

    const maybeObjects = content.matchAll(/\w*[.]/g)
    const _objects: string[] = []
    for (const result of maybeObjects) {
      // if (!result[0].matchAll(/["|'|\/\*\*].*?["|'|\/]/g))
      _objects.push(result[0].replace('.',''))
    }

    const identifiers = this.#identifiers.filter(ident => content.includes(ident))
    this.#highlight(nodes, ref, identifiers)
      .then(highlight => {
        const key = ++this.registry
        CSS.highlights.set(`js-identifiers-${key}`, highlight)
        for (const sheet of document.styleSheets) {
          if (sheet.href?.includes('index')) {
            sheet.insertRule(`::highlight(js-identifiers-${key}) { color: var(--js-identifier); }`, sheet.cssRules.length)
          }
        }
      })
      .catch(e => console.log(e))

    const objects = this.#objects.filter(ident => content.includes(ident))
    this.#highlight(nodes, ref, objects.concat(_objects))
      .then(highlight => {
        const key = ++this.registry
        CSS.highlights.set(`js-objects-${key}`, highlight)
        for (const sheet of document.styleSheets) {
          if (sheet.href?.includes('index')) {
            sheet.insertRule(`::highlight(js-objects-${key}) { color: var(--js-objects); }`, sheet.cssRules.length)
          }
        }
      })
      .catch(e => console.log(e))

    // prev ["|'|/*].*?["|'|*/]
    // ["|'|\/\*\*].*?["|'|\/]
    const maybeString = content.matchAll(/["|'|\/\*\*].*?["|'|\/]/g)
    const strings: string[] = []
    for (const result of maybeString) {
      strings.push(result[0])
    }

    this.#highlightStrings(nodes, ref, strings)
      .then(highlight => {
        const key = ++this.registry
        CSS.highlights.set(`js-strings-${key}`, highlight)
        for (const sheet of document.styleSheets) {
          if (sheet.href?.includes('index')) {
            sheet.insertRule(`::highlight(js-strings-${key}) { color: var(--js-strings); }`, sheet.cssRules.length)
          }
        }
      })
      .catch(e => console.log(e))

    const maybeComments = content.matchAll(/\/\/(.*)[^(\r\n|\r|\n)]*/g)
    const comments: string[] = []
    for (const result of maybeComments) {
      comments.push(result[0])
    }

    this.#highlightStrings(nodes, ref, comments)
      .then(highlight => {
        const key = ++this.registry
        CSS.highlights.set(`js-comments-${key}`, highlight)
        for (const sheet of document.styleSheets) {
          if (sheet.href?.includes('index')) {
            sheet.insertRule(`::highlight(js-comments-${key}) { color: var(--js-comments); }`, sheet.cssRules.length)
          }
        }
      })
      .catch(e => console.log(e))
  }

  static #highlight = async (nodes: Node[], ref: HTMLElement, identifiers: string[]) => {
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
            if (prevToken.match(/[a-z]/i)) {
              break;
            }

          }
          const range = new Range()
          range.setStart(element, index);
          startPos = index + str.length;
          range.setEnd(element, startPos);
          if (!nextToken.match(/[a-z]/i)) {
            ranges.push(range)
          }
        }
      }
      return ranges
    })

    // Create a Highlight object for the ranges.
    return new Highlight(...ranges.flat());
  }

  static async #highlightStrings(nodes: Node[], ref: HTMLElement, identifiers: string[]) {
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
}


