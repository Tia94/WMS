import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ISubscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit, OnDestroy {

  private data: Array<any> = new Array<any>();
  private subscription: ISubscription;
  private selectedProducts: Array<number> = new Array<number>();

  public title: string = "Products";
  public rows: Array<any> = [];
  public columns: Array<any> = [
    { title: 'Name', name: 'name', sort: true, filtering: { filterString: '', placeholder: 'Filter by name' } },
    { title: 'Category', name: 'category', sort: true, filtering: { filterString: '', placeholder: 'Filter by category' } },
    { title: 'quantity', name: 'quantity', sort: true, filtering: { filterString: '', placeholder: 'Filter by quantity' } },
    { title: 'Price', name: 'price', sort: true, filtering: { filterString: '', placeholder: 'Filter by price' } },
    { title: 'Update', name: 'update', sort: false, filtering: false },
    { title: 'Delete', name: 'delete', sort: false, filtering: false }
  ];
  public page: number = 1;
  public itemsPerPage: number = 10;
  public maxSize: number = 5;
  public numPages: number = 1;
  public length: number = 0;

  public config: any = {
    paging: true,
    sorting: { columns: this.columns },
    filtering: { filterString: '' },
    className: ['table-striped', 'table-bordered']
  };

  public constructor(private productService: ProductService, private router: Router) {

  }

  public ngOnInit(): void {

    this.getProducts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public changePage(page: any, data: Array<any> = this.data): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item: any) => {
          return item[column.name].toString().toLowerCase().match(column.filtering.filterString.toLowerCase());
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item: any) =>
        item[config.filtering.columnName].toString().toLowerCase().match(this.config.filtering.filterString.toLowerCase()));
    }

    let tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;
      this.columns.forEach((column: any) => {
        if (item[column.name].toString().toLowerCase().match(this.config.filtering.filterString.toLowerCase())) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  public onCellClick(data: any): any {
    let allowed: Array<string> = ["update", "delete"];

    if (!allowed.some(x => x === data.column))
      return;

    if (data.column === "update") {

    }
    else if (data.column === "delete") {
      this.productService.delete(data.row.id)
        .subscribe(response => {
          this.getProducts();
        });
    }

    console.log(data);
  }

  private getProducts(): void {
    this.subscription = this.productService.get()
      .subscribe(response => {
        this.data = response.data.map(x => {
          return {
            id: x.id,
            name: x.name,
            category: x.category,
            quantity: x.quantity,
            price: x.price,
            update: `<button type="button" class="btn btn-primary">Update</button>`,
            delete: `<button type="button" class="btn btn-danger">Delete</button>`
          };
        });
        this.length = response.data.length;
        this.onChangeTable(this.config);
      });
  }


}
