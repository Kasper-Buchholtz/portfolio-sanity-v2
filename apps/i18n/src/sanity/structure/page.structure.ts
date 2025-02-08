import { ListItemBuilder } from 'sanity/structure'
import defineStructure from '@/utils/defineStructure'
import AppConfig from '../../../config'
import { iconByLocale } from '@/utils/iconByLocale'


export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Sider')
    .child(
      S.list()
        .title('Sprog')
        .items(
          AppConfig.i18n.locales.map((locale) =>
            S.listItem()
              .title(locale.title)
              .icon(iconByLocale(locale.id))
              .child(
                S.documentTypeList('page')
                  .title(locale.title)
                  .filter('_type == "page" && locale == $locale')
                  .params({ locale: locale.id }),
              ),
          ),
        ),
    ),
)
