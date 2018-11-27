import { PLUGIN_API_HOST } from '../../constants'

const API = {
  "shortUrl":"/api/shortUrl/Tencent",//永久链接
  "getNew":"/api/PluginStyleCenter/GetNew",  //[样式中心]获取最新样式
  "getFav":"/api/PluginStyleCenter/GetFav",               //[样式中心]获取收藏样式
  "getHotFavId":"/api/PluginStyleCenter/GetHotFavId",     //[样式中心] 获取最新/收藏
  "editCollectedStyle":"/api/PluginStyleCenter/AddFav",  //【样式中心】收藏样式
  "getCustomStyle":"/api/PluginStyleCenter/GetCustomStyle", //【样式中心】获取自定义
  "deleteFav":"/api/PluginStyleCenter/DeleteFav",                 //[样式中心]取消样式收藏
  "getStyleGate":"/api/PluginStyleCenter/GetStyleCate",//[样式中心]获取左侧导航
  "graphCopy":"/api/Material/Copy",           //图文副本
  "getWechatTypes":"/api/Cpc/GetWechatTypes",    //cpc获取广告分类
  "checkBinding":"/api/CPC/CheckBindingAuth",                //cpc是否绑定到西瓜插件
  "getAuth":"/api/CPC/GetAuth",                                 // 确认授权
  "getAdTypes":"/api/CPC/GetAdTypes",                        //cpc获取广告类表
  "getAdList":"/api/CPC/GetAdList",                             //cpc获取广告列表
  "getAdDetails":"/api/CPC/GetAdDetails",                       //cpc获取订单详情
  "createOrder":"/api/CPC/CreateOrder",                        //cpc接单
  "requestAuth":"/api/CPC/RequestAuth",                        //cpc上传认证数据
  "checkAuth":"/api/CPC/CheckAuth",                             //cpc 检测是否授权
  "getOrderLists":"/api/CPC/GetOrderLists",                      //cpc获取订单列表
  "cancelOrder":"/api/CPC/CancelOrder",                          //cpc取消订单
  "canCreateOrder":"/api/CPC/CanCreateOrder",		              //cpc是否达到接单标准
  "synchBizInfo":"/api/CPC/SynchBizInfo",                        //cpc同步数据接口
  "hasOrder":"/api/CPC/HasOrder",                                 //cpc是否有进行中的订单
  "getYouFenUrl":"/api/CPC/GetYouFenUrl", 						//cpc获取前往优粉吧链接
  "getUnfinishOrderLists":"/api/CPC/GetUnfinishOrderLists",      //cpc获取未提交订单
  "getImage":"/api/CPC/GetImage",                                  //cpc获取图片
  "getKeFuQQ":"/api/CPC/GetKeFuQQ",                                 //cpc获取客服QQ
  "getMaterialRemarks" :"/api/MaterialRemarks/Get",  //获取备注素材信息
  "setMaterialRemarks": "/api/MaterialRemarks/Set",	//设置素材信息
  "mpHome":"/api/InspireNew/MpHome",                    //灵感订阅首页
  "subscribe":"/api/InspireNew/Subscribe",               //灵感订阅
  "getHistorySubList":"/api/InspireNew/GetHistorySubList",      //获取历史订阅公众号
  "getUserSubList":"/api/InspireNew/GetUserSubList",              //【灵感订阅】获取订阅
  "getMediaList":"/api/PluginMedia/GetMediaList",                 //获取视频图片列表
  "addMediaImage":"/PluginMediaMvc/AddMediaImage",      //采集图片
  "addMediaVideo":"/api/PluginMedia/AddMediaVideo",       //采集视频
  "addMedia":"/api/PluginMedia/AddMedia",                     //添加素材图片/视频
  "delMedia":"/api/PluginMeDia/DelMedia",                      //删除素材图片/视频
  "delMaterialRemarks":"/api/MaterialRemarks/Del"
}
const getApiUrl = function(pathName) {
  return PLUGIN_API_HOST + API[pathName]
}

export default getApiUrl
