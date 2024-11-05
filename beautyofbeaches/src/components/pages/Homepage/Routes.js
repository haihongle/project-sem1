import Activities from './Activities container/Activities'
import Explore from './Explore container/Explore'
import Image from './Image container/Image'
import Services from './Services container/Services'

//ROUTES FOR HOMEPAGE

const homepageRoutes = [
    { path: '/', component: Explore },
    { path: '/Activities', component: Activities }, 
    { path: '/Image', component: Image },
    { path: '/Services', component: Services },
   
]

export { homepageRoutes } 

