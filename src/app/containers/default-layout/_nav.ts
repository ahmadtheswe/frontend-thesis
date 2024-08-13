import {ExtendedINavData} from "./ExtendedINavData";

export const navItems: ExtendedINavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    // badge: {
    //   color: 'info',
    //   text: 'NEW'
    // }
  },
  {
    name: 'Upload Image',
    url: '/upload',
    iconComponent: { name: 'cil-speedometer' },
    isAdminRequired: true
  },
  {
    name: 'Images',
    url: '/images',
    iconComponent: { name: 'cil-speedometer' }
  },
  {
    name: 'Your Orders',
    url: '/your-orders',
    iconComponent: { name: 'cil-speedometer' },
    isNonAdminRequired: true
  },
  {
    name: 'Price Setup',
    url: '/price-setup',
    iconComponent: { name: 'cil-speedometer' },
    isAdminRequired: true
  },
  {
    name: 'Map Example',
    url: '/map-example',
    iconComponent: { name: 'cil-speedometer' },
    isAdminRequired: true
  },
];
