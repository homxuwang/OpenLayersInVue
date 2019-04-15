import ZoomSlider from 'ol/control/ZoomSlider'
import MousePosition from 'ol/control/MousePosition'
import {createStringXY} from 'ol/coordinate'
import ScaleLine from 'ol/control/ScaleLine'
import OverviewMap from 'ol/control/OverviewMap'
import ZoomToExtent from 'ol/control/ZoomToExtent'

import mapconfig from '@/config/mapconfig.js'

import { mapGetters } from 'vuex'
//缩放控件
var zoomslider = function() {
  return new ZoomSlider();
}
//鼠标位置控件
var mouseposition = () => new MousePosition({
  coordinateFormat: createStringXY(4),
  className: 'mousePositionValue',
  target: document.getElementById('mousePosition')
});

//比例尺控件
var scaleline = () => new ScaleLine({
  //设置比例尺单位，degrees、imperial、us、nautical、metric（度量单位）
  units: "metric"
})

//鹰眼控件
//参数意义：
// collapsed，收缩选项；
// collapseLabel，收缩后的图标按钮；
// collapsible，是否可以收缩为图标按钮，默认为 true；
// label，当 overviewmapcontrol 收缩为图标按钮时，显示在图标按钮上的文字或者符号，默认为 »；
// layers，overviewmapcontrol针对的图层，默认情况下为所有图层；
// render，当 overviewmapcontrol 重新绘制时，调用的函数；
// target，放置的 HTML 元素；
// tipLabel，鼠标放置在图标按钮上的提示文字。
var overviewmap = () => new OverviewMap({
  className: 'ol-overviewmap ol-custom-overviewmap',
  layers: mapconfig.streetmap(0),
  collapseLabel: '\u00AB',
  //鹰眼控件折叠时功能按钮上的标识（网页的JS的字符编码）
  label: '\u00BB',
  //初始为展开显示方式
  collapsed: false
})


//导航控件
var zoomtoextent = () => new ZoomToExtent({
  // extent: [113.30144842, 30.5285152, 114.45160558, 30.4366038]
  extent:  mapconfig.ZoomToExtent_Extent
  // extent: [813079.7791264898, 5929220.284081122, 848966.9639063801, 5936863.986909639]
})

export default {
  zoomslider,
  mouseposition,
  scaleline,
  overviewmap,
  zoomtoextent
}