// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'manage books',
    path: '/dashboard/manage-books',
    icon: icon('ic_cart'),
  },
  {
    title: 'manage genres',
    path: '/dashboard/manage-genres',
    icon: icon('ic_cart'),
  },
  {
    title: 'books',
    path: '/dashboard/books',
    icon: icon('ic_cart'),
  },
];

export default navConfig;
