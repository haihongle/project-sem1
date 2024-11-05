import { Route, Routes } from 'react-router-dom'
import webRoutes from './routes/Routes'
import PageLayout from './components/layout/PageLayout/PageLayout'

function App() {
    return (
        <>
            <Routes>
                {webRoutes.map((route, index) => {
                    const Page = route.component;
                    return <Route key={index} path={route.path} element={<PageLayout><Page /></PageLayout>}></Route>
                })}
            </Routes>
        </>
    )
}

export default App
