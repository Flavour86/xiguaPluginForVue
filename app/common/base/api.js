import { PLUGIN_API_HOST } from '../../constants'

const API = {
  'articalInfo': '/api/ArticleInfo', // 【微信详情页】文章信息
  'articalAnalysis': '/api/ArticleAnalyse', // 【微信详情页】指数分析
  'articalSame': '/api/ArticleSame', // 【微信详情页】相似文章
  'bizDetail': '/api/BizDetail', // 【微信详情页】近期推文【公众号增强信息】
  'getHistory': '/api/BizDetail/GetHistory', // 【微信详情页】历史推文
  'getHot': '/api/BizDetail/GetHot', // 【微信详情页】热门文章
  'getQrcode': '/api/UserLogin/GetTicket', // 登录二维码接口
  'getUserLogin': '/api/UserLogin/LoginQrCodeTick', // 判断用户是否登录
  'checkLoginState': '/api/UserLogin/GetLoginState', // 获取用户登录状态(过期)
  'loginOut': '/api/UserLogin/Logout', // 退出登录
  'getVersion': '/api/PluginVersion/GetVersion', // 获取版本
  'validateN': '/api/PluginBiz/Update', // 获取公众号首页信息
  'updateLog': '/api/PluginVersion/GetUpdateLog', // 更新日志
  'countArticalImport': '/api/PluginLog/ArticleImport', // 统计文章导入
  'countBizOpen': '/api/PluginLog/BizOpen', // 统计公众号打开
  'countThirdPlugin': '/api/ThirdPluginInfo/Report', // 统计第三方插件
  'TestTemplate': '/Modal/DiagResult', // 【违规检测】违规检测模版接口
  'postDiagArt': '/api/DiagArticle/Diag', // 【违规检测】post违规检测文章
  'getDiagRest': '/api/DiagArticle/GetDiagResult', // 【违规检测】获取文章检查结果  轮询
  'getCss': '/api/PluginCss/Get', // 获取插件css
  'getJs': '/api/PluginJs/Get', // 获取插件js
  'IsNewUserBiz': '/api/Inspire/IsNewUserBiz', // 【灵感中心】用户是否首次使用
  'getInspireHome': '/api/Inspire/MpHome', // 【灵感中心】微信首页灵感中心
  'getSytemTag': '/api/InspireNew/GetSytemTag', // 【灵感中心】获取灵感素材分类
  'getGuideBiz': '/api/InspireNew/GetGuideBiz', // 【灵感中心】获取推荐号
  'postInspireSubscribe': '/api/InspireNew/Subscribe', // 【灵感中心】提交推荐订阅
  'getAllArticleListByScore': '/api/Inspire/GetAllArticleListByScore', // 【灵感中心】全部订阅的指数分析
  'getSubscribeList': '/api/Inspire/GetSubscribeList', // 【灵感中心】获取订阅列表
  'getAllArticleListByPubTime': '/api/Inspire/GetAllArticleListByPubTime', // 【灵感中心】全部订阅按日期查看
  'checkOpen': '/api/Inspire/CheckOpen', // 获取是否开启灵感中心状态
  'setOpen': '/api/Inspire/SetOpen', // 开启灵感中心
  'getArticleListByPubTime': '/api/Inspire/GetArticleListByPubTime', // 【灵感中心】当前公众号按日期查看
  'unSubscribe': '/api/Inspire/Unsubscribe', // 【灵感中心】取消订阅
  'searchMbiz': '/api/Inspire/SearchMbiz',
  'articleAnalyse': '/ViewArticleInfo/ArticleAnalyse', // 【灵感中心】传播指数
  'mulActAdd': '/api/PluginUserBiz/Add', // 【多账号】新增关联公众号
  'mulActGetBiz': '/api/PluginUserBiz/Get', // 【多账号】获取公众号列表
  'mulActDelete': '/api/PluginUserBiz/Reduce', // 【多账号】删除公众号
  'mulActSort': '/api/PluginUserBiz/Sort', // 【多账号】排序
  'collectArticle': '/api/PluginMaterial/Collect', // 文章采集
  'inspireCollect': '/InspireCenter/Collect', // 文章采集【灵感中心】
  'collectReport': '/api/PluginMaterial/CollectReport', // 文章采集打点
  'editCollectedStyle': '/api/PluginStyleCenter/AddFav', // 编辑器样式收藏
  'operateReportSubmit': '/api/OperateReport/Submit', // 上报操作记录日志
  'addMediaImage': '/PluginMediaMvc/AddMediaImage', // 采集图片
  'getPlugConfigDescription': '/api/Function/GetDescription' // 获取开关说明信息
}
const getApiUrl = function (pathName) {
  return PLUGIN_API_HOST + API[pathName]
}

export default getApiUrl
