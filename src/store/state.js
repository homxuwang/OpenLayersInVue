import mapconfig from '@/config/mapconfig.js'

const state = {
  //地图底图
  baseLayer: mapconfig.streetmap(0),
  center: [mapconfig.view.x, mapconfig.view.y],
  //***************地图控件相关*********************/
  //缩放控件
  ZoomSlider: null,
  //地图缩放控件显示状态
  isShowZoomSlider: false,
  //地图鼠标位置控件
  MousePosition: null,
  //地图鼠标位置控件显示状态
  isShowMousePosition: false,
  //地图比例尺控件
  ScaleLine: null,
  //地图比例尺控件显示状态
  isShowScaleLine: false,
  //地图鹰眼控件
  OverviewMap: null,
  //地图鹰眼控件显示状态
  isShowOverviewMap: false,
  //地图导航控件
  ZoomToExtent: null,
  //地图导航控件显示状态
  isShowZoomToExtent: false
  //***************地图控件相关*********************/
};

export default state