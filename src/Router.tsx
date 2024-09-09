import { Routes, Route, Navigate } from "react-router-dom"

// internal imports
import Home from "./pages/Home"
import Authors from "./pages/Authors"
import Post from "./pages/Post"
import RefProvider from "./components/RefProvider"
import Author from "./pages/Author"

export default function Router() {

    return (
        <RefProvider>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/post/:slug' element={<Post />} />
                <Route path='/authors' element={<Authors />} />
                <Route path='/author/:slug' element={<Author />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes >
        </RefProvider>
    )
}