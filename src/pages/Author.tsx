import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Internal imports
import Layout from "../components/Layout";
import CustomMarkdown from "../components/markdown/CustomMarkdown";
import Hr from "../components/markdown/Hr";
import SearchByAuthor from "../components/cards/SearchByAuthor";

export interface AuthorsAttributesInterface {
    id: number,
    author: string,
    slug: string,
    image: string
    tags: string[]
}

export interface AuthorsInterface {
    attributes: AuthorsAttributesInterface
    markdown: string,
}

export default function Author() {

    const navigate = useNavigate()
    const [author, setAuthor] = useState<AuthorsInterface>()

    const loadModules = async (modules: Record<string, () => Promise<AuthorsInterface>>) => {

        let validAuthor = false

        for (const path in modules) {
            const author = await modules[path]()
                .then(module => { return module })
                .catch(error => console.error(error))

            if (author && author.attributes.slug == location.pathname.split('/')[2]) {
                setAuthor(author)
                validAuthor = true; break
            }
        }
        if (!validAuthor) navigate('/authors')
    }

    useEffect(() => {
        loadModules(import.meta.glob<AuthorsInterface>('../../authors/*.md'))
    }, []);

    return (
        <Layout>
            <div className='w-full bg-secondary-color p-4'>
                <div className="w-full flex flex-col gap-y-1">
                    <div className="w-full flex justify-end">
                        <SearchByAuthor search={author?.attributes.author} />
                    </div>
                    <Hr />
                </div>
                <CustomMarkdown>{author?.markdown}</CustomMarkdown>
            </div>
        </Layout>
    )
}