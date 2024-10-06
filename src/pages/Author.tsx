import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Internal imports
import Layout from "../components/Layout";
import Hr from "../components/document/Hr";
import SearchByAuthor from "../components/cards/SearchByAuthor";
import { MetadataAuthorI } from "./Authors";
import Document from '../components/document/Document';

export interface AuthorsI {
    metadata: MetadataAuthorI
    html: string,
}

export default function Author() {

    const location = useLocation()
    const navigate = useNavigate()

    const [author, setAuthor] = useState<AuthorsI>()

    const loadMetadatas = async (modules: Record<string, () => Promise<MetadataAuthorI>>) => {

        let validAuthor = false

        for (const path in modules) {

            const metadata = await modules[path]()
                .then(response => response)
                .catch(err => console.error("Error loading YAML file", err))

            if (metadata && metadata.slug === location.pathname.split('/')[2]) {

                const filepath = modules[path].name.split('/')
                const filename = filepath[filepath.length - 1].split('.')[0]

                const html = await import(`../../authors/html/${filename}.html?raw`)
                    .then((response) => response)
                    .catch(err => console.error("Error loading HTML file", err))

                if (html && html.default) {
                    setAuthor({
                        html: html.default,
                        metadata: { ...metadata }
                    })
                    validAuthor = true; break
                }
            }
        }
        if (!validAuthor) navigate('/authors')
    }

    useEffect(() => {
        loadMetadatas(import.meta.glob<MetadataAuthorI>('../../authors/metadata/*.yaml'));
    }, [])

    return (
        <Layout>
            <div className='w-full bg-secondary-color p-4'>
                <div className="w-full flex flex-col gap-y-1">
                    <div className="w-full flex justify-end">
                        <SearchByAuthor search={author?.metadata.author} />
                    </div>
                    <Hr />
                </div>
                {author?.html ? <Document text={author?.html} /> : <></>}
            </div>
        </Layout >
    )
}