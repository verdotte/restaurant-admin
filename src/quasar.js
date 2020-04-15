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
  Notify,
  QSpinner,
  QAvatar,
  QImg,
  QSelect
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
    QSpinner,
    QAvatar,
    QImg,
    QSelect
  },
  directives: {
    ClosePopup,
  },
  plugins: {
    Notify,
  }
 })