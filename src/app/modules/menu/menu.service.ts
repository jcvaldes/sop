import { HttpService } from './../../core/services/http.service';
import { Injectable } from '@angular/core';
import { ItemNode } from './index';
import { map } from 'rxjs/operators';
import urljoin from 'url-join';
import { environment } from '@env';
import { HttpClient } from '@angular/common/http';
import MenuItem from './menuitem.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService extends HttpService {
  url: string;
  dataMap = new Map<string, string[]>();
  menuFlattern = [];
  // dataMap = new Map<string, string[]>([
  //   ['Fruits', ['Apple', 'Orange', 'Banana']],
  //   ['Vegetables', ['Tomato', 'Potato', 'Onion']],
  //   ['Apple', ['Fuji', 'Macintosh']],
  //   ['Onion', ['Yellow', 'White', 'Purple']]
  // ]);

  // rootLevelNodes: string[] = ['Fruits', 'Vegetables'];
  rootLevelNodes: string[] = [];
  constructor(public http: HttpClient) {
    super(http);
    this.url = urljoin(environment.apiUrl, '/api/menu');
  }

  getMenu() {
    return this.get(this.url).pipe(map(menu => {
      this.menuFlattern = menu;
      this.dataMap = this.convertMenu(menu);
    }));
  }

  convertMenu(menu) {
    // dataMap = new Map<string, string[]>([
    //   ['Fruits', ['Apple', 'Orange', 'Banana']],
    //   ['Vegetables', ['Tomato', 'Potato', 'Onion']],
    //   ['Apple', ['Fuji', 'Macintosh']],
    //   ['Onion', ['Yellow', 'White', 'Purple']]
    // ]);
    let menuMap = new Map<string, string[]>();
    debugger
    menu.forEach(m => {
      // Si es null es root
      if (!m.ParentId) {
        menuMap.set(m.title, this.getSubItems(m.id));
        this.rootLevelNodes.push(m.title);
      }
    });
    return menuMap;
  }
  getSubItems(menuId) {
    return this.menuFlattern.filter(m => m.ParentId === menuId);
  }
  /** Initial data from database */
  initialData(): ItemNode[] {
    let rootLevelNodes = [];
    this.menuFlattern.forEach(m => {
      if (m.ParentId === null) {
        rootLevelNodes.push(new ItemNode(m.title, 0, m.icon, m.uri, true));
      }
    });
    return rootLevelNodes;
  }

  getChildren(node: string): string[] | undefined {
    return this.dataMap.get(node);
  }

  isExpandable(node: string): boolean {
    return this.dataMap.has(node);
  }
}
