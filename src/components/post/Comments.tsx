import Giscus from "@giscus/react";

// internal imports
import Hr from "../markdown/Hr";

export default function Comments() {

    return (
        <div className='w-full flex flex-col gap-y-3 mt-10'>
            <div className='w-full flex flex-col'>
                <span className='text-3xl text-gray-200 font-black'>
                    Comentários
                </span>
                <Hr />
            </div>
            <div className="w-full">
                <Giscus
                    id="comments"
                    repo="fanhenrique/blog"
                    repoId="R_kgDOMgtBwQ"
                    category="Announcements"
                    categoryId="DIC_kwDOMgtBwc4ChfNk"
                    mapping="pathname"
                    term="Welcome to @giscus/react component!"
                    reactionsEnabled="1"
                    emitMetadata="0"
                    inputPosition="top"
                    theme="dark"
                    lang="pt"
                    loading="lazy"
                />
            </div>
        </div >
    )
}