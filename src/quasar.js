import Vue from 'vue'

import 'quasar/dist/quasar.css'
import '@quasar/extras/material-icons/material-icons.css'
import {
  Quasar,
  QLayout,
  QHeader,
  QDrawer,
  QPageContainer,
  QPage,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QInput,
  QSeparator,
  QBadge,
  QCard,
  QCardSection,
  QCardActions,
  QFab,
  QPageSticky,
  QDialog,
  ClosePopup,
} from 'quasar'

Vue.use(Quasar, {
  config: {},
  components: {
    QLayout,
    QHeader,
    QDrawer,
    QPageContainer,
    QPage,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QInput,
    QSeparator,
    QBadge,
    QCard,
    QCardSection,
    QCardActions,
    QFab,
    QPageSticky,
    QDialog,
  },
  directives: {
    ClosePopup,
  },
  plugins: {
  }
 })