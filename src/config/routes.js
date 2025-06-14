import Today from '@/components/pages/Today'
import Top from '@/components/pages/Top'
import Categories from '@/components/pages/Categories'
import Submit from '@/components/pages/Submit'
import ProductDetail from '@/components/pages/ProductDetail'

export const routes = {
  today: {
    id: 'today',
    label: 'Today',
    path: '/today',
    icon: 'Calendar',
    component: Today
  },
  top: {
    id: 'top',
    label: 'Top',
    path: '/top',
    icon: 'TrendingUp',
    component: Top
  },
  categories: {
    id: 'categories',
    label: 'Categories',
    path: '/categories',
    icon: 'Grid3X3',
    component: Categories
  },
  submit: {
    id: 'submit',
    label: 'Submit',
    path: '/submit',
    icon: 'Plus',
    component: Submit
  },
  productDetail: {
    id: 'productDetail',
    label: 'Product',
    path: '/product/:id',
    component: ProductDetail
  }
}

export const routeArray = Object.values(routes)
export { routes }