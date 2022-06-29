import {Injectable} from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'other',
    title: 'Admin',
    type: 'group',
    icon: 'feather icon-align-left',
    children: [
      {
        id: 'sample-page',
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'feather icon-sidebar'
      },
      {
        id: 'sellers',
        title: 'Sellers',
        type: 'item',
        url: '/seller',
        classes: 'nav-item',
        icon: 'feather icon-users',
         children: [
          {
             id: 'product',
            title: 'Product',
            type: 'item',
             url: '/seller/prodects/'
          },
        ]
      },
      {
        id: 'catogorys',
        title: 'Catogorys',
        type: 'item',
        url: '/catogory',
        classes: 'nav-item',
        icon: 'feather icon-grid'
      },
      {
        id: 'users',
        title: 'Users',
        type: 'item',
        url: '/users',
        classes: 'nav-item',
        icon: 'feather icon-user'
      },

    ]
  }
];

@Injectable()
export class NavigationItem {
  public get() {
    return NavigationItems;
  }
}
