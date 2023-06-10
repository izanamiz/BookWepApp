// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const userNavConfig = [
  // {
  //   title: 'dashboard',
  //   path: '/dashboard/app',
  //   icon: icon('ic_analytics'),
  // },
  {
    title: 'books',
    path: '/dashboard/books',
    icon: icon('ic_blog'),
  },
  {
    title: 'cart',
    path: '/dashboard/cart',
    icon: icon('ic_cart'),
  },
  {
    title: 'order',
    path: '/dashboard/order',
    icon: icon('ic_cart'),
  },
];

export default userNavConfig;
