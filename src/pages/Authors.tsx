import { useEffect, useState } from "react";

// Internal imports
import Layout from "../components/Layout"
import AuthorCard from "../components/cards/AuthorCard";
import { AuthorsInterface } from "./Author";
import Span from "../components/Span";

export default function Authors() {

    const [authors, setAuthors] = useState<AuthorsInterface[]>([])

    const loadModules = async (modules: Record<string, () => Promise<AuthorsInterface>>) => {
        const loadedModules: AuthorsInterface[] = []

        for (const path in modules) {
            const author = await modules[path]()
                .catch(module => { return module })
                .catch(error => console.error(error))

            if (author) loadedModules.push(author)
        }

        loadedModules.sort((a: AuthorsInterface, b: AuthorsInterface) => {
            if (b.attributes.author < a.attributes.author) return 1
            if (b.attributes.author > a.attributes.author) return -1
            return 0
        });

        setAuthors(loadedModules)
    }

    useEffect(() => {
        loadModules(import.meta.glob<AuthorsInterface>('../../authors/*.md'))
    }, []);

    return (
        <Layout>
            <div className="flex flex-col gap-y-5">
                <Span>Autores</Span>
                {authors.map((author: AuthorsInterface) => {
                    return (
                        <AuthorCard {...author.attributes} />
                    )
                })}
            </div>
        </Layout>
    )
}