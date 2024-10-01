import { useEffect, useState } from "react";
import YAML from 'yaml'

// Internal imports
import Layout from "../components/Layout"
import AuthorCard from "../components/cards/AuthorCard";
import Span from "../components/Span";

export interface MetadataAuthorI {
    id: number,
    author: string,
    slug: string,
    image: string
    tags: string[]
}

export default function Authors() {

    const [authors, setAuthors] = useState<MetadataAuthorI[]>([])

    // Loads and sorts all posts
    const loadMetadatas = async (modules: Record<string, () => Promise<MetadataAuthorI>>) => {

        const loadedModules: MetadataAuthorI[] = []

        for (const path in modules) {

            const module = await fetch(path)
                .then(response => response.text())
                .then(data => data)
                .catch(err => console.error("Error loading YAML file", err))

            if (module) {
                const metadata = YAML.parse(module)
                loadedModules.push({ ...metadata })
            }
        }

        loadedModules.sort((a: MetadataAuthorI, b: MetadataAuthorI) => {
            if (b.author < a.author) return 1
            if (b.author > a.author) return -1
            return 0
        });

        setAuthors(loadedModules)
    }

    useEffect(() => {
        loadMetadatas(import.meta.glob<MetadataAuthorI>('../../authors/metadata/*.yaml'));
    }, [])

    return (
        <Layout>
            <div className="flex flex-col gap-y-5">
                <Span>Autores</Span>
                {authors.map((author: MetadataAuthorI, i: number) => {
                    return (
                        <AuthorCard
                            key={author.author + i}
                            {...author}
                        />
                    )
                })}
            </div>
        </Layout>
    )
}