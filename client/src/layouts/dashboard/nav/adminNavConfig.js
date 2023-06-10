// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const adminNavConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'manage books',
    path: '/dashboard/manage-books',
    icon: icon('ic_analytics'),
  },
  {
    title: 'manage genres',
    path: '/dashboard/manage-genres',
    icon: icon('ic_analytics'),
  },
  {
    title: 'books',
    path: '/dashboard/books',
    icon: icon('ic_blog'),
  },
];

export default adminNavConfig;
