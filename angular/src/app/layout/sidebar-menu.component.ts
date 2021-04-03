import { Component, Injector, OnInit } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  Router,
  Route,
  RouterEvent,
  NavigationEnd,
  PRIMARY_OUTLET,
} from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { filter } from "rxjs/operators";
import { MenuItem } from "@shared/layout/menu-item";
import { MenuItem as PrimeMenuItem } from "primeng/api";

@Component({
  selector: "sidebar-menu",
  templateUrl: "./sidebar-menu.component.html",
  styleUrls: ["./sidebar-menu.component.scss"],
})
export class SidebarMenuComponent extends AppComponentBase implements OnInit {
  menuItems: MenuItem[];
  authorizedMenuItems: PrimeMenuItem[] = [];
  menuItemsFromRoutes: PrimeMenuItem[] = [];
  menuItemsMap: { [key: number]: MenuItem } = {};
  activatedMenuItems: MenuItem[] = [];
  routerEvents: BehaviorSubject<RouterEvent> = new BehaviorSubject(undefined);
  homeRoute = "/app/home";
  routes: any[];

  constructor(private injector: Injector, private router: Router) {
    super(injector);
    router.events.subscribe(this.routerEvents);
  }

  ngOnInit(): void {
    //this.menuItems = this.getMenuItems();
    //this.patchMenuItems(this.menuItems);

    this.routerEvents
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const currentUrl = event.url !== "/" ? event.url : this.homeRoute;
        const primaryUrlSegmentGroup = this.router.parseUrl(currentUrl).root
          .children[PRIMARY_OUTLET];
        if (primaryUrlSegmentGroup) {
          //this.activateMenuItems("/" + primaryUrlSegmentGroup.toString());
          this.activatePrimeMenuItems("/" + primaryUrlSegmentGroup.toString());
        }

        // this.parseRouterConf();
      });

    this.parseRouteConfigToMenu("", this.router.config);

    this.authorizedMenuItems = this.getAuthorizedMenuItems(this.menuItemsFromRoutes);
  }

  /**
   * Get the router.config and load all lazy module using the configLoader
   */
  // parseRouterConf() {
  //   this.routes = this.router.config.reduce((acc, route) => {
  //     const children = [];
  //     if (route.loadChildren) {
  //       (<any>this.router).configLoader.load(this.injector, route).subscribe({
  //         next: (moduleConf) => {
  //           children.push(
  //             ...moduleConf.routes.map((childRoute) => childRoute.path)
  //           );
  //         },
  //       });
  //     }
  //     acc.push({
  //       path: route.path,
  //       children,
  //     });
  //     return acc;
  //   }, []);
  // }

  patchMenuItems(items: MenuItem[], parentId?: number): void {
    items.forEach((item: MenuItem, index: number) => {
      item.id = parentId ? Number(parentId + "" + (index + 1)) : index + 1;
      if (parentId) {
        item.parentId = parentId;
      }
      if (parentId || item.children) {
        this.menuItemsMap[item.id] = item;
      }
      if (item.children) {
        this.patchMenuItems(item.children, item.id);
      }
    });
  }

  activateMenuItems(url: string): void {
    this.deactivateMenuItems(this.menuItems);
    this.activatedMenuItems = [];
    const foundedItems = this.findMenuItemsByUrl(url, this.menuItems);
    foundedItems.forEach((item) => {
      this.activateMenuItem(item);
    });
  }

  activatePrimeMenuItems(url: string): void {
    //this.deactivatePrimeMenuItems(this.authorizedMenuItems);
    this.activatedMenuItems = [];
    const foundedItems = this.findPrimeMenuItemsByUrl(url, this.authorizedMenuItems);
    foundedItems.forEach((item) => {
      this.activatePrimeMenuItem(item);
    });
  }

  deactivateMenuItems(items: MenuItem[]): void {
    items.forEach((item: MenuItem) => {
      item.isActive = false;
      item.isCollapsed = true;
      if (item.children) {
        this.deactivateMenuItems(item.children);
      }
    });
  }

  deactivatePrimeMenuItems(items: PrimeMenuItem[]): void {
    items.forEach((item: PrimeMenuItem) => {
      item.expanded = false;
      if (item.items) {
        this.deactivatePrimeMenuItems(item.items);
      }
    });
  }

  findMenuItemsByUrl(
    url: string,
    items: MenuItem[],
    foundedItems: MenuItem[] = []
  ): MenuItem[] {
    items.forEach((item: MenuItem) => {
      if (item.route === url) {
        foundedItems.push(item);
      } else if (item.children) {
        this.findMenuItemsByUrl(url, item.children, foundedItems);
      }
    });
    return foundedItems;
  }

  findPrimeMenuItemsByUrl(
    url: string,
    items: PrimeMenuItem[],
    foundedItems: PrimeMenuItem[] = []
  ): PrimeMenuItem[] {
    for(let item of items) {
      if (item.routerLink === url) {
        foundedItems.push(item);
      } else if (item.items) {
        this.findPrimeMenuItemsByUrl(url, item.items, foundedItems);
      }
    }
    return foundedItems;
  }

  activateMenuItem(item: MenuItem): void {
    item.isActive = true;
    if (item.children) {
      item.isCollapsed = false;
    }
    this.activatedMenuItems.push(item);
    if (item.parentId) {
      this.activateMenuItem(this.menuItemsMap[item.parentId]);
    }
  }

  activatePrimeMenuItem(item: PrimeMenuItem): void {
    if (item.items) {
      item.items.forEach((item) => {
        //item.expanded = false;
      });
    }
    //this.activatedMenuItems.push(item);
    // if (item.parentId) {
    //   this.activatePrimeMenuItem(this.menuItemsMap[item.parentId]);
    // }
    item.expanded = true;
  }

  isMenuItemVisible(item: PrimeMenuItem): boolean {
    if (!item.state?.permission) {
      return true;
    }
    return this.permission.isGranted(item.state?.permission);
  }

  getAuthorizedMenuItems(menus: PrimeMenuItem[]): PrimeMenuItem[] {
    menus.forEach((item) => {
      item.visible = this.isMenuItemVisible(item);
    });
    return menus;
  }

  convertMenuItemsToRoutes(parent: String, config: Route[]): PrimeMenuItem[] {
    const menuItems: PrimeMenuItem[] = [];
    config.forEach((r) => {
      menuItems.push({
        label: this.l(r.path),
        icon: r.data?.icon,
        routerLink: r.path,
        state: { permission: "Pages.Tenants" },
      });
    });

    return menuItems;
  }

  menuCallBack(event?) :void{


  }


  parseRouteConfigToMenu(parent: String, config: Route[]) {
    config.forEach((route) => {

      //console.log(parent + "/" + route.path);

      if (parent.length > 0 && route.path?.length > 0) {
        //>=3 level menus, just return. _loadedConfig can only detect 2 level menus for the 1st load time.
        //2nd time, seems angular will cash the menus _loadedConfig will detect > 2 levels
        if (parent.split("/").length >= 3) {
          return;
        }

        if (!route.data?.children) {
          this.menuItemsFromRoutes.push({
            label: this.l(this.titleCaseWord(route.path)),
            icon: route.data?.icon,
            routerLink: parent + "/" + route.path,
            state: { permission: route.data?.permission },
            routerLinkActiveOptions: { exact: true },
            expanded: this.checkActiveState(parent + "/" + route.path),
            command: this.menuCallBack
          });
        }
        //menus has child
        else {
          //outer parent menu needn't routeLink
          const menu = {
            label: this.l(this.titleCaseWord(route.path)),
            icon: route.data?.icon,
            //routerLink: parent + "/" + route.path,
            state: { permission: route.data?.permission },
            routerLinkActiveOptions: { exact: true },
            expanded: this.checkActiveState(parent + "/" + route.path)
          };

          let childMenu = {
            label: this.l(this.titleCaseWord(route.data?.children[0].path)),
            icon: route.data?.children[0].data?.icon,
            routerLink: parent + "/" + route.path + "/" + route.data?.children[0].path,
            //TODO: add permission
            routerLinkActiveOptions: { exact: true },
            expanded: this.checkActiveState(parent + "/" + route.path + "/" + route.data?.children[0].path),
          };
          let childAndGrandChildMenus;

          //3rd level menu
          if (route.data?.children[0].data?.children) {
            const grandchildMenu = {
              label: this.l(this.titleCaseWord(route.data?.children[0].data?.children[0].path)),
              icon: route.data?.children[0].data?.children[0].data?.icon,
              routerLink: parent + "/" + route.path + "/" + route.data?.children[0].path + "/" + route.data?.children[0].data?.children[0].path,
              //TODO: add permission
              routerLinkActiveOptions: { exact: true },
              expanded: this.checkActiveState(parent + "/" + route.path + "/" + route.data?.children[0].path + "/" + route.data?.children[0].data?.children[0].path)
            }

            childAndGrandChildMenus = {...childMenu, items: [grandchildMenu]};
          }

          const itemsReady = childAndGrandChildMenus ? childAndGrandChildMenus : childMenu;
          this.menuItemsFromRoutes.push({...menu, items: [itemsReady]});
        }
      }
      if (route.children) {
        const currentPath = route.path ? parent + "/" + route.path : parent;
        this.parseRouteConfigToMenu(currentPath, route.children);
      }
      if (route["_loadedConfig"]) {
        const currentPath = route.path ? parent + "/" + route.path : parent;
        const children = route["_loadedConfig"].routes;
        this.parseRouteConfigToMenu(currentPath, children);
      }
    });
  }

  titleCaseWord(word: string) {
    if (!word) return word;

    let formattedWord: string = "";
    word.split("-").forEach((w) => {
      formattedWord += w[0].toUpperCase() + w.substr(1).toLowerCase();
    });

    return formattedWord;
  }

  //check if router is active
  checkActiveState(givenLink) {
    if (this.router.url.indexOf(givenLink) === -1) {
      return false;
    } else {
      return true;
    }
  }
}
