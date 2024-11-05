import Homepage from '../components/pages/Homepage/Homepage'
import Aboutus from '../components/pages/Aboutus/AboutUs'
import Blog from '../components/pages/Blog/Blog'
import Gallery from '../components/pages/Gallery/Gallery'
import Mainpage from '../components/pages/Mainpage/Mainpage'
import Beachpage from '../components/pages/Beachpage/Beachpage'

const webRoutes = [
    { path: '*', component: Homepage},
    { path: '/About-us', component: Aboutus },
    { path: '/Blog', component: Blog },
    { path: '/Gallery', component: Gallery },
    { path: '/Mainpage', component: Mainpage }, 
    { path: '/Beach/:region/:id/beaches/:beachID', component: Beachpage},
]

export default webRoutes
