import TileLayer from "ol/layer/Tile"
import TileArcGISRest from 'ol/source/TileArcGISRest'
import OSM from "ol/source/OSM"
import XYZ from 'ol/source/XYZ'


/**
 * 
 * @param {*} maptype 0表示OSM,1表示使用Arcgis在线午夜蓝地图服务
 */
var streetmap = function(maptype) {
    var maplayer = null;
    var reNumber = /^[0-9]+.?[0-9]*$/; //数字判断
    if (reNumber.test(maptype)){
        switch (maptype){
            case 0:
                maplayer = new TileLayer({
                    source: new OSM()
                })
            break;
            case 1:
                maplayer = new TileLayer({
                    source:new TileArcGISRest({
                        url:'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer'
                    })
                })
            break;
        }
    }
    return [maplayer];
}

var view = {
    x: 114.30,     //中心点经度和纬度
    y: 30.60,
    zoom: 10,          //地图缩放级别
    streetmap: streetmap
};

/**
 * 左边栏上半部分 地图图层信息
 * name 图层名称
 * url 获取图层的链接
 */
var vectorLayers = [
    {
        "id": "root",
        "label": "图层",
        "children": [{
            "id": "road",
            "label": '武汉市路网',
            "url": ''
        },
        {
            "id": "point",
            "label": '武汉市兴趣点',
            "url": ''
        },
        {
            "id": "water",
            "label": '武汉市水网',
            "url": ''
        }
        ]
    }
]
/**
 * 左边栏上半部分 地图底层信息
 * name 图层名称
 * url 获取图层的链接
 */
var leftTopBaseLayers = [
    {
        "name": 'OSM底图',
        "url": 0
    },
    {
        "name": 'Arcgis在线午夜蓝地图',
        "url": 1
    }
]


export default {
    view,
    vectorLayers,
    streetmap,
    leftTopBaseLayers
} 