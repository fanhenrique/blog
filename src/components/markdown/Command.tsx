import { ReactNode } from 'react';

export default function Command(props: { children: ReactNode }) {

    return (
        <pre
            className='
                w-fit max-w-full
                text-gray-200 font-semibold 
                text-lg text-lef
                whitespace-pre-wrap
            '
        >
            {props.children}
        </pre>
    )
}