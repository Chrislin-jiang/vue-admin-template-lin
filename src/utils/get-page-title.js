import defaultSettings from '@/settings'

const title = defaultSettings.title || '吊装安全评价系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
