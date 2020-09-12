import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';

import { FlatTreeControl } from '@angular/cdk/tree';

import { ItemNode, ItemDataSource } from './index';
import { MenuService } from './menu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  url: string;
  menuSubs: Subscription;
  treeControl: FlatTreeControl<ItemNode>;

  dataSource: ItemDataSource;

  getLevel = (node: ItemNode) => node.level;

  isExpandable = (node: ItemNode) => node.expandable;

  hasChild = (_: number, nodeData: ItemNode) => nodeData.expandable;
  constructor(private menuService: MenuService) {


  }
  ngOnInit(): void {
    this.menuSubs = this.menuService.getMenu().subscribe(data => {
      this.configMenu(this.menuService);
    });
  }
  ngOnDestroy() {
    this.menuSubs.unsubscribe();
  }
  configMenu(menuService: MenuService) {
    this.treeControl = new FlatTreeControl<ItemNode>(this.getLevel, this.isExpandable);
    this.dataSource = new ItemDataSource(this.treeControl, menuService);
    this.dataSource.data = menuService.initialData();
  }
}
