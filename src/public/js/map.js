import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import XYZ from "ol/source/XYZ.js";
import { Vector as VectorLayer } from "ol/layer.js";
import TileArcGISRest from "ol/source/TileArcGISRest";
import { bbox as bboxStrategy } from "ol/loadingstrategy.js";
import VectorSource from "ol/source/Vector.js";
import GeoJSON from "ol/format/GeoJSON.js";
import { Stroke, Style } from "ol/style.js";


let skibsvragSource = new VectorSource({
    format: new GeoJSON(),
    loader: function(extent, resolution, projection) {
       var proj = projection.getCode();
       var url = 'https://94.231.110.64:8080/geoserver/AAU_Setup/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=AAU_Setup%3Aculturalheritage&maxFeatures=50000&outputFormat=application%2Fjson&srsname=EPSG:3857';
       var xhr = new XMLHttpRequest();
       xhr.open('GET', url);
       var onError = function() {
        skibsvragSource.removeLoadedExtent(extent);
       }
       xhr.onerror = onError;
       xhr.onload = function() {
         if (xhr.status == 200) {
            skibsvragSource.addFeatures(
                skibsvragSource.getFormat().readFeatures(xhr.responseText));
         } else {
           onError();
         }
       }
       xhr.send();
     },    
});

let displaySkibsVrag = new VectorLayer({
    source: skibsvragSource,
});

let backgroundmap = new TileLayer({
    id: "basemap",
    type: "base",
    title: "Basemap TOPO",
    source: new TileArcGISRest({
        url:
        "https://maps.helcom.fi/arcgis/rest/services/MADS/Basemap_TOPO/MapServer",
    }),
});



const map = new Map({
   // layers: [displaySkibsVrag],
target: "map",

view: new View({
    //projection: 'EPSG:3035',
    maxZoom: 18,
    center: [1951895.95429, 8379944.28496],
    zoom: 6,
}),
});


exports.map = async function buildMap(curMap = map, background = backgroundmap){

    curMap.addLayer(background);

    curMap.addLayer(displaySkibsVrag);

    console.log(displaySkibsVrag);



}

