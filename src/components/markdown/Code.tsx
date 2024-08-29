import { HTMLAttributes } from 'react';

// internal imports
import Command from './Command';
import LanguageSyntax from './LanguageSyntax';
import CodeCopyButton from './CodeCopyButton';

export default function Code(props: HTMLAttributes<HTMLElement>) {

    const match = /language-(\w+)/.exec(props.className || '')

    return (
        <>
            {match ?
                <div className="w-full flex p-2 justify-between bg-backgroud-color my-5">
                    {match[1] === 'command' ?
                        <Command>{props.children}</Command> : <LanguageSyntax language={match[1]}>{props.children}</LanguageSyntax>
                    }
                    <CodeCopyButton>{props.children}</CodeCopyButton>
                </div>
                :
                <code
                    className='
                        w-fit inline
                        text-gray-200 font-semibold 
                        text-lg text-left
                        bg-backgroud-color
                        py-0.5 px-1.5 rounded-md
                    '
                >
                    {props.children}
                </code>
            }
        </ >
    )
}
