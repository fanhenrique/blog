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
import FigureCaption from './FigureCaption';
import LanguageSyntax from './LanguageSyntax';
import ReferenceSection from './ReferenceSection';
import SourceFigure from './SourceFigure';

interface DocumentProps {
    text: string
}

export default function Document(props: DocumentProps) {

    const navigate = useNavigate()
    const [doc, setDoc] = useState<string>('')

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

            // Source of the figure
            if (typedDomNode.name === 'p') {
                if (typedDomNode.children.length === 1) {
                    const c = typedDomNode.firstChild as Element
                    if (c instanceof Element && c.name === 'span' && (c.attribs.class === 'citation')) {
                        return <SourceFigure>{domToReact(typedDomNode.children as DOMNode[], options)}</SourceFigure>
                    }
                }
            }

            // Figure
            if (typedDomNode.name === 'figure') {
                const props = attributesToProps(typedDomNode.attribs)
                return <Figure {...props}>{domToReact(typedDomNode.children as DOMNode[], options)}</Figure>
            }

            // Figure caption
            if (typedDomNode.name === 'figcaption')
                return <FigureCaption>{domToReact(typedDomNode.children as DOMNode[], options)}</FigureCaption>

            // Footnote gap ↩︎
            if (typedDomNode.name === 'p') {
                const parent = typedDomNode.parent
                if (parent instanceof Element && parent.name == 'li') {
                    const section = typedDomNode.parent?.parent?.parent
                    if (section instanceof Element && section.attribs.id === 'footnotes')
                        return <Paragraph className='flex gap-x-1.5'>{domToReact(typedDomNode.children as DOMNode[], options)}</Paragraph>
                }
            }

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

            // Footnote padding left
            if (typedDomNode.name === 'ol') {
                if (typedDomNode.parent instanceof Element && typedDomNode.parent.name == 'section' && typedDomNode.parent.attribs.class === 'footnotes footnotes-end-of-document') {
                    return <Ol className='pl-6'>{domToReact(typedDomNode.children as DOMNode[], options)}</Ol>
                }
            }

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

            // Reference section
            if (typedDomNode.name === 'div' && typedDomNode.attribs.id === 'refs') {
                const props = attributesToProps(typedDomNode.attribs)
                return (
                    <ReferenceSection {...props}>
                        {domToReact(typedDomNode.children as DOMNode[], options)}
                    </ReferenceSection>
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