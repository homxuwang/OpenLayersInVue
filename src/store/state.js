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
  isShowZoomToExtent: false,
  //***************地图控件相关*********************/

  //***************地图绘图相关*********************/

  //绘图的显示图层
  ViewVector: null,
  //绘图的绘制图层
  DrawVectorSource: null,
  //绘图的点要素
  PointFeature: null,
  //绘图的线要素
  Line_StringFeature: null,
  //绘图的普通多边形要素
  PolygonFeature: null,
  //绘图的圆要素
  CircleFeature: null,
  //绘图的正方形要素
  SquareFeature: null,
  //绘图的长方形要素
  RectangleFeature: null,

  //***************地图绘图相关*********************/
};

export default state