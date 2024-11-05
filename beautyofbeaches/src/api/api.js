import http from "./http"

const getAllRegions = async () => {
    try {
        const response = await http.get("/regions");
        return response.data;
    } catch (error) {
        throw error;
    }
}

// Get regions
const regions = await getAllRegions();

// Get specific region
const getRegion = (id) => {
    return regions[id - 1]
}

// Get beaches
let beaches = [];
for(var i = 0; i < regions.length; i++) {
    beaches.push(...regions[i].beaches)
}

// Get images gallery
const images = (() => {
    let gallery = [];
    let selectedBeach = new Set();

    while (selectedBeach.size < 11) {
        let randomRegionIndex = Math.floor(Math.random() * regions.length);
        let region = regions[randomRegionIndex];
        
        let randomBeachIndex = Math.floor(Math.random() * region.beaches.length);
        let beach = region.beaches[randomBeachIndex];

        let randomGalleryIndex = Math.floor(Math.random() * beach.gallery.length);
        let image = beach.gallery[randomGalleryIndex];

        let beachIdentifier = `${region.id}-${beach.id}`;

        if (!selectedBeach.has(beachIdentifier)) { 
            selectedBeach.add(beachIdentifier);
            gallery.push({
                regionID: region.id,
                regionName: region.name,
                beachID: beach.id,
                name: beach.name,
                path: image.path
            });        
        }   
    }
    return gallery;
})();

// Get activities gallery
const activities = (() => {
    let activity = [];
    let selectedActivity = new Set();

    while (selectedActivity.size < 6) {
        let j = Math.floor(Math.random() * beaches.length);
        let random = Math.floor(Math.random() * (4 - 1));

        if (!selectedActivity.has(j)) { 
            selectedActivity.add(j);
            activity.push({
                info: beaches[j].activity[random].info,
                path: beaches[j].activity[random].path
            });        
        }   
    }
    return activity;
})();

// Get services gallery
const services = (() => {
    let service = [];
    let selectedService = new Set();

    while (selectedService.size < 8) {
        let j = Math.floor(Math.random() * beaches.length);
        let random = Math.floor(Math.random() * (4 - 1));

        if (!selectedService.has(j)) { 
            selectedService.add(j);
            service.push({
                nameFood: beaches[j].food[random].name,
                pathFood: beaches[j].food[random].path,
                nameHotel: beaches[j].hotel[random].name,
                pathHotel: beaches[j].hotel[random].path,
            });        
        }   
    }
    return service;
})();

// Get blogs gallery
const blogs = (() => {
    let blog = [];
    let selectedBlog = new Set();

    while (selectedBlog.size < 4) {
        let j = Math.floor(Math.random() * beaches.length);
        let random = Math.floor(Math.random() * 5);

        if (!selectedBlog.has(j)) { 
            selectedBlog.add(j);
            blog.push({
                path: beaches[j].gallery[random].path,
                info: beaches[j].blog[0].info,
                content: beaches[j].blog[0].content,
                link: beaches[j].blog[0].link,
            });        
        }   
    }
    return blog;
})();

const data ={
    regions,
    getRegion,
    beaches,
    images,
    activities,
    services,
    blogs
}

export default data