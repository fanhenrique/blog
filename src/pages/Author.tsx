import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import YAML from 'yaml'

// Internal imports
import Layout from "../components/Layout";
import Hr from "../components/document/Hr";
import SearchByAuthor from "../components/cards/SearchByAuthor";
import { MetadataAuthorI } from "./Authors";
import Document from '../components/document/Document';
import { loadHtml } from "./utils";

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

            const module = await fetch(path)
                .then(response => response.text())
                .then(data => data)
                .catch(err => console.error("Error loading YAML file", err))

            if (module) {
                const metadata = YAML.parse(module)

                if (metadata && metadata.slug == location.pathname.split('/')[2]) {

                    const html = await loadHtml(`../../authors/html/${metadata.path}`)

                    if (html) {
                        setAuthor({
                            html: html,
                            metadata: { ...metadata }
                        })
                        validAuthor = true; break
                    }
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
                <Document text={author?.html} />
            </div>
        </Layout >
    )
}