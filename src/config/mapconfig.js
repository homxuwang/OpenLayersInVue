import TileLayer from "ol/layer/Tile"
import TileArcGISRest from 'ol/source/TileArcGISRest'
import OSM from "ol/source/OSM"
import XYZ from 'ol/source/XYZ'


/**
 * 
 * @param {*} maptype 0表示OSM,1表示使用Arcgis在线午夜蓝地图服务
 */
var streetmap=function(maptype){
    var maplayer=null;
    switch(maptype){
        case 0:
            maplayer=new TileLayer({
                source: new OSM()
            })
        break;
        case 1:
            maplayer=new TileLayer({
                source:new TileArcGISRest({
                    url:'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer'
                })
            })
        break;
    }
    return [maplayer];
}

var mapconfig={
    x: 114.30,     //中心点经度和纬度
    y: 30.60,
    zoom: 10,          //地图缩放级别
    streetmap: streetmap
};

export default mapconfig