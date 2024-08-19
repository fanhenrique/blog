import { Routes, Route, Navigate } from "react-router-dom"

// internal imports
import Home from "./pages/Home"
import About from "./pages/About"
import Authors from "./pages/Authors"
import Contact from "./pages/Contact"
import Post from "./pages/Post"
import RefProvider from "./components/RefProvider"

export default function Router() {

    return (

        <Routes>
            <Route path='/' element={<RefProvider children={<Home />} />} />
            <Route path='/post/:slug' element={<Post />} />
            <Route path='/about' element={<About />} />
            <Route path='/authors' element={<Authors />} />
            <Route path='/contact' element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes >
    )
}