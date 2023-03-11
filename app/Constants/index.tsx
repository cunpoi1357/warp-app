import {
    HTMLReactParserOptions,
    Element,
    attributesToProps
} from 'html-react-parser'

export const parserOptions: HTMLReactParserOptions = {
    replace: domNode => {
        if (domNode instanceof Element && domNode.name === 'img') {
            const props = attributesToProps(domNode.attribs)
            return <img {...props} style={{ display: 'inline' }} />
        }
    }
}
