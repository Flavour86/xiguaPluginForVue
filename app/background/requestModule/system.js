import getVersion from '../version'
import { VERSION } from 'common/base'
import { COMMON_STATUS } from '@/constants'

export const checkVersion = (message, sender, sendResponse) => {
  const versionModule = getVersion()
  sendResponse({
    msg: COMMON_STATUS.SUCCESS,
    curVersion: VERSION,
    newVersion: versionModule.serverVersion,
    hasNewVersion: versionModule.isNeedUpdate
  })
}
