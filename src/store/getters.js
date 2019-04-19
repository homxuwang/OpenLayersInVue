const getters = {//实时监听state值的变化(最新状态)
  //获取地图底图
  layers : state => state.baseLayer,
  //获取地图中心
  center : state => state.center,
  //***************地图控件相关*********************/

  //获取地图默认控件总函数(后期修改)
  getDefaultControl: (state,getters) => (ControlName) => state[ControlName],
  //获取地图默认控件显示状态总函数(后期修改)
  getDefaultControlShowState: (state,getters) => (ControlShowStateName) => state[ControlShowStateName],
  // //获取地图缩放控件
  // getZoomSlider : state => state.ZoomSlider,
  // //地图缩放控件显示状态
  isShowZoomSlider : state => state.isShowZoomSlider,

  // //获取鼠标位置控件
  // getMousePosition : state => state.MousePosition,
  // //获取鼠标位置显示状态
  isShowMousePosition : state => state.isShowMousePosition,

  // //获取比例尺控件
  // getScaleLine: state => state.ScaleLine,
  // //获取比例尺控件显示状态
  isShowScaleLine: state => state.isShowScaleLine,

  // //获取鹰眼控件
  // getOverviewMap: state => state.OverviewMap,
  // //获取鹰眼控件显示状态
  isShowOverviewMap: state => state.isShowOverviewMap,

  // //获取地图导航控件
  // getZoomToExtent: state => state.ZoomToExtent,
  // //获取地图导航控件显示状态
  isShowZoomToExtent: state => state.isShowZoomToExtent,
  //***************地图控件相关*********************/

  //***************地图绘图相关*********************/

  getDrawVectorSource: state => state.DrawVectorSource,

  getLayerVector: state => state.LayerVector,

  getFeature: (state,featureName) => state[featureName],

  getPointFeature: state => state.PointFeature,

  getLineStringFeature: state => state.LineStringFeature,

  getPolygonFeature: state => state.PolygonFeature,

  getCircleFeature: state => state.CircleFeature,

  getSquareFeature: state => state.SquareFeature,

  getRectangleFeature: state => state.RectangleFeature,  
  //***************地图绘图相关*********************/
};

export default getters