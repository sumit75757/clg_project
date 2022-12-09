import { Injectable } from '@angular/core';

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


// const NavigationItems = [
//   {
//     id: 'other',
//     title: 'Admin',
//     type: 'group',
//     icon: 'feather icon-align-left',
//     children: [
//       {
//         id: 'sample-page',
//         title: 'Sample Page',
//         type: 'item',
//         url: '/sample-page',
//         classes: 'nav-item',
//         icon: 'feather icon-sidebar'
//       },
//       {
//         id: 'sellers',
//         title: 'Shops',
//         type: 'item',
//         url: '/seller',
//         classes: 'nav-item',
//         icon: 'feather icon-users',
//          children: [
//           {
//              id: 'product',
//             title: 'Product',
//             type: 'item',
//              url: '/seller/prodects/'
//           },
//         ]
//       },
//       {
//         id: 'service',
//         title: 'Service',
//         type: 'item',
//         url: '/service',
//         classes: 'nav-item',
//         icon: 'feather icon-settings'
//       },
//       {
//         id: 'service catogary',
//         title: 'Service Catogary',
//         type: 'item',
//         url: '/services/catogory',
//         classes: 'nav-item',
//         icon: 'feather icon-settings'
//       },
//       {
//         id: 'catogorys',
//         title: 'Catogorys',
//         type: 'item',
//         url: '/catogory',
//         classes: 'nav-item',
//         icon: 'feather icon-grid'
//       },
//       {
//         id: 'users',
//         title: 'Users',
//         type: 'item',
//         url: '/users',
//         classes: 'nav-item',
//         icon: 'feather icon-user'
//       },


//     ]
//   }
// ];

@Injectable()
export class NavigationItem {
  navigation() {

    let NavigationItems
    let userType: any = JSON.parse (localStorage.getItem('userData'))
    if (userType.character === 'admin') {
      NavigationItems = [
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
              title: 'Shops',
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
              id: 'service',
              title: 'Service',
              type: 'item',
              url: '/service',
              classes: 'nav-item',
              icon: 'feather icon-settings'
            },
            {
              id: 'service catogary',
              title: 'Service Catogary',
              type: 'item',
              url: '/services/catogory',
              classes: 'nav-item',
              icon: 'feather icon-settings'
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
    } else if (userType.character === 'seller') {
      NavigationItems = [
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
              title: 'Shops',
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
              id: 'service',
              title: 'Service',
              type: 'item',
              url: '/service',
              classes: 'nav-item',
              icon: 'feather icon-settings'
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

    }

    console.log(userType);

    return NavigationItems;
  }
  public get() {

    console.log(this.navigation());

    return this.navigation();
  }
}
