import mapconfig from '@/config/mapconfig.js'
import state from './state'


const mutations = {
  //修改地图底图
  changeBaseLayer : (state,index) =>  state.baseLayer = mapconfig.streetmap(index),
  //修改地图中心
  changeCenter : (state,value) => state.center = value,
  //***************地图控件相关*********************/

  //添加控件总函数(后期改进)
  addDefaultControl : (state,DefaultControlObj) => {
    //添加对应的控件
    state[DefaultControlObj.ControlType] = DefaultControlObj.DefaultControl
    let ifShow = 'isShow' + DefaultControlObj.ControlType
    //更改对应的显示状态
    state[ifShow] = true
  },

  //删除控件总函数(后期改进)
  removeDefaultControl: (state,DefaultControName) => {
    state[DefaultControName] = false
  },

  //销毁控件总函数(后期修改)
  destoryDefaultControl: (state,DefaultControName) => {
    state[DefaultControName] = null
  },

  //缩放控件
  addZoomSlider : (state,ZoomSlider) => {
    //添加缩放控件
    state.ZoomSlider = ZoomSlider
    //添加时修改地图缩放控件显示状态为true
    state.isShowZoomSlider = true
  },
  //从屏幕上删除地图缩放控件
  removeZoomSlider: state => {    
    //此时仅修改地图缩放控件的显示状态为false,因为map页面还需要该zoomslider对象，以在地图中对其进行删除
    //真实的删除地图控件操作交给map页面由commit调用destoryZoomSlider进行
    state.isShowZoomSlider = false
  },
  //销毁地图缩放控件
  destoryZoomSlider: state => {
    //销毁当前state中的zoomslider
    state.ZoomSlider = null
  },

  //鼠标控件
  //添加鼠标位置控件
  addMousePosition : (state,MousePosition) => {
    state.MousePosition = MousePosition
    state.isShowMousePosition = true
  },
  //从屏幕上删除鼠标位置控件
  removeMousePosition: state => state.isShowMousePosition = false,
  //销毁鼠标位置控件
  destoryMousePosition: state => state.MousePosition = null,

  //比例尺控件
  //添加比例尺控件
  addScaleLine: (state,ScaleLine) => {
    state.ScaleLine = ScaleLine
    state.isShowScaleLine = true
  },
  //从屏幕上删除比例尺控件
  removeScaleLine: state =>  state.isShowScaleLine = false,
  //销毁比例尺控件
  destoryScaleLine: state => state.ScaleLine = null,

  //鹰眼控件
  //添加鹰眼控件
  addOverviewMap: (state,OverviewMap) => {
    state.OverviewMap = OverviewMap
    state.isShowOverviewMap = true
  },
  //从屏幕上删除鹰眼控件
  removeOverviewMap: state => state.isShowOverviewMap = false,
  //销毁鹰眼控件
  destoryOverviewMap: state => state.OverviewMap = null,

  //地图导航控件
  //添加地图导航控件
  addZoomToExtent: (state,ZoomToExtent) => {
    state.ZoomToExtent = ZoomToExtent
    state.isShowZoomToExtent = true
  },
  //从屏幕上删除地图导航控件
  removeZoomToExtent: state => state.isShowZoomToExtent = false,
  //销毁地图导航控件
  destoryZoomToExtent: state => state.ZoomToExtent = null,
  
  //***************地图控件相关*********************/

  //***************地图绘图相关*********************/
  //添加显示vector的图层
  addLayerVector: (state,LayerVector) => state.LayerVector = LayerVector,
  //添加绘制层
  addDrawVectorSource: (state,DrawVectorSource) => state.DrawVectorSource = DrawVectorSource,
  //添加要素,第二个参数为自定义要素对象，
  //FeatureType属性为要素类型
  //PointFeature、PolygonFeature等为要添加的要素类
  addFeature: (state,FeatureObjs) => {
    state[FeatureObjs.FeatureType] = FeatureObjs.PointFeature
  },

  //添加各种要素的函数
  addPointFeature: (state,PointFeature) => state.PointFeature = PointFeature,

  addLineStringFeature: (state,LineStringFeature) => state.LineStringFeature = LineStringFeature,

  addPolygonFeature: (state,PolygonFeature) => state.PolygonFeature = PolygonFeature,

  addCircleFeature: (state,CircleFeature) => state.CircleFeature = CircleFeature,

  addSquareFeature: (state,SquareFeature) => state.SquareFeature = SquareFeature,

  addRectangleFeature: (state,RectangleFeature) => state.RectangleFeature = RectangleFeature,

  //***************地图绘图相关*********************/
}

export default mutations