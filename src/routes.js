import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import BubbleChart from '@material-ui/icons/BubbleChart';
import LocationOn from '@material-ui/icons/LocationOn';
import Notifications from '@material-ui/icons/Notifications';
import Unarchive from '@material-ui/icons/Unarchive';

const routes = [
  {
    path: '/',
    name: 'Home',
    icon: Dashboard,
  },
  {
    path: '/user-profile',
    name: 'User Profile',
    icon: Person,
  },
  {
    path: '/table-list',
    name: 'Table List',
    icon: 'content_paste',
  },
  {
    path: '/typography',
    name: 'Typography',
    icon: LibraryBooks,
  },
  {
    path: '/icons',
    name: 'Icons',
    icon: BubbleChart,
  },
  {
    path: '/maps',
    name: 'Maps',
    icon: LocationOn,
  },
  {
    path: '/notifications',
    name: 'Notifications',
    icon: Notifications,
  },
  {
    path: '/upgrade-to-pro',
    name: 'Upgrade To PRO',
    icon: Unarchive,
  },
];

export default routes;
