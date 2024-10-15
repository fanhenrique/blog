import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import parse, {
    DOMNode,
    HTMLReactParserOptions,
    Element,
    Text,
    domToReact,
    attributesToProps
} from 'html-react-parser';

// Internal imports
import Heading1 from './Heading1';
import Heading2 from './Heading2';
import Heading3 from './Heading3';
import Heading4 from './Heading4';
import Heading5 from './Heading5';
import Heading6 from './Heading6';
import Paragraph from './Paragraph';
import Anchor from './Anchor';
import Hr from './Hr';
import Blockquote from './Blockquote';
import Ul from './Ul';
import Ol from './Ol';
import Mark from './Mark';
import Command from './Command';
import Code from './Code';
import Figure from './Figure';
import FigureTitle from './FigureTitle';
import LanguageSyntax from './LanguageSyntax';
import ReferenceSection from './ReferenceSection';
import FigureSource from './FigureSource';

interface DocumentProps {
    text: string
}

export default function Document(props: DocumentProps) {

    const navigate = useNavigate()
    const [doc, setDoc] = useState<string>('')
    let countRef = 0

    useEffect(() => {

        if (props.text) {
            // Prevent Cross Site Scripting (XSS)
            setDoc(DOMPurify.sanitize(props.text))
        } else {
            navigate('/')
        }
    }, [navigate, props.text])

    const options: HTMLReactParserOptions = {
        replace: (domNode: DOMNode) => {

            const typedDomNode = domNode as Element

            if (typedDomNode.name === 'h1')
                return <Heading1>{domToReact(typedDomNode.children as DOMNode[], options)}</Heading1>

            if (typedDomNode.name === 'h2')
                return <Heading2>{domToReact(typedDomNode.children as DOMNode[], options)}</Heading2>

            if (typedDomNode.name === 'h3')
                return <Heading3>{domToReact(typedDomNode.children as DOMNode[], options)}</Heading3>

            if (typedDomNode.name === 'h4')
                return <Heading4>{domToReact(typedDomNode.children as DOMNode[], options)}</Heading4>

            if (typedDomNode.name === 'h5')
                return <Heading5>{domToReact(typedDomNode.children as DOMNode[], options)}</Heading5>

            if (typedDomNode.name === 'h6')
                return <Heading6>{domToReact(typedDomNode.children as DOMNode[], options)}</Heading6>

            if (typedDomNode.name === 'p')
                return <Paragraph>{domToReact(typedDomNode.children as DOMNode[], options)}</Paragraph>

            if (typedDomNode.name === 'mark')
                return <Mark>{domToReact(typedDomNode.children as DOMNode[], options)}</Mark>

            if (typedDomNode.name === 'a') {
                const props = attributesToProps(typedDomNode.attribs)
                return <Anchor {...props}>{domToReact(typedDomNode.children as DOMNode[], options)}</Anchor>
            }

            if (typedDomNode.name === 'hr')
                return <Hr />

            if (typedDomNode.name === 'blockquote')
                return <Blockquote>{domToReact(typedDomNode.children as DOMNode[], options)}</Blockquote>

            if (typedDomNode.name === 'ul')
                return <Ul>{domToReact(typedDomNode.children as DOMNode[], options)}</Ul>

            if (typedDomNode.name === 'ol')
                return <Ol>{domToReact(typedDomNode.children as DOMNode[], options)}</Ol>

            // Code in text
            if (typedDomNode.name === 'code' && !typedDomNode.attribs.class)
                return <Code>{domToReact(typedDomNode.children as DOMNode[], options)}</Code>

            // Command
            if (typedDomNode.name === 'pre' && typedDomNode.attribs.class === 'command') {
                const c = typedDomNode.firstChild as Element
                if (c instanceof Element && c.name == 'code') {
                    if (c.firstChild instanceof Text) {
                        return <Command>{c.firstChild.data}</Command>
                    }
                }
            }

            // Code block
            if (typedDomNode.name === 'pre' && typedDomNode.attribs.class && typedDomNode.attribs.class !== 'command') {
                const c = typedDomNode.firstChild as Element
                if (c instanceof Element && c.name == 'code') {
                    if (c.firstChild instanceof Text) {
                        return (
                            <LanguageSyntax
                                language={typedDomNode.attribs.class}
                            >
                                {c.firstChild.data}
                            </LanguageSyntax>
                        )
                    }
                }
            }

            // Figure
            if (typedDomNode.name === 'figure')
                return <Figure>{domToReact(typedDomNode.children as DOMNode[], options)}</Figure>

            // Figure title
            if (typedDomNode.name === 'figcaption')
                return <FigureTitle>{domToReact(typedDomNode.children as DOMNode[], options)}</FigureTitle>

            // Figure source
            if (typedDomNode.name === 'span') {
                const parent = typedDomNode.parent as Element
                if (parent instanceof Element && parent.name == 'figure') {
                    return <FigureSource>{domToReact(typedDomNode.children as DOMNode[], options)}</FigureSource>
                }
            }

            // Reference section
            if (typedDomNode.name === 'div' && typedDomNode.attribs.id === 'refs') {
                const props = attributesToProps(typedDomNode.attribs)
                return (
                    <ReferenceSection {...props}>
                        {domToReact(typedDomNode.children as DOMNode[], options)}
                    </ReferenceSection>
                )
            }

            // Link to reference
            if (typedDomNode.name === 'span' && typedDomNode.attribs.class === 'citation') {
                return (
                    <Anchor
                        id={`${typedDomNode.attribs['data-cites']}-${countRef++}`}
                        href={`#ref-${typedDomNode.attribs['data-cites']}`}
                    >
                        {domToReact(typedDomNode.children as DOMNode[], options)}
                    </Anchor>
                )
            }

            return false
        },
    }

    return (
        <div className='text-lg text-white font-normal' >
            {parse(doc, options)}
        </div >
    )
}