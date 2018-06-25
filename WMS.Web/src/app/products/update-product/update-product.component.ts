import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  private id: number;

  public title: string = "Update Product";
  public updateProductForm: FormGroup;
  public name: FormControl;
  public category: FormControl;
  public quantity: FormControl;
  public price: FormControl;
  public success: boolean = false;

  constructor(private productService: ProductService, private router: Router, private activatedRoute: ActivatedRoute) { }

  public ngOnInit(): void {
    this.createFormControls();
    this.createForm();

    this.activatedRoute.params.subscribe(params => {
      this.id = params.id;

      this.productService.get(this.id)
        .subscribe(response => {
          this.name.setValue(response.name);
          this.category.setValue(response.category);
          this.quantity.setValue(response.quantity);
          this.price.setValue(response.price);
        });
    });
  }

  public onSubmit(): void {
    if (this.updateProductForm.valid) {
      this.productService.update(this.id, this.name.value, this.category.value, this.quantity.value, this.price.value)
        .subscribe(response => {
          this.success = true;
        });
    }
  }

  private createFormControls() {
    this.name = new FormControl("", Validators.required);
    this.category = new FormControl("", Validators.required);
    this.quantity = new FormControl("", Validators.required);
    this.price = new FormControl("", Validators.required);
  }

  private createForm() {
    this.updateProductForm = new FormGroup({
      name: this.name,
      category: this.category,
      quantity: this.quantity,
      price: this.price
    });
  }
}
