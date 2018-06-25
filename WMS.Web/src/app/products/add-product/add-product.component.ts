import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public addProductForm: FormGroup;
  public name: FormControl;
  public category: FormControl;
  public quantity: FormControl;
  public price: FormControl;

  constructor(private productService: ProductService) { }

  public ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  public onSubmit(): void {    
    if (this.addProductForm.valid) {
      this.productService.add(
        this.name.value,
        this.category.value,
        this.quantity.value,
        this.price.value);
    }
  }

  private createFormControls() {
    this.name = new FormControl("", Validators.required);
    this.category = new FormControl("", Validators.required);
    this.quantity = new FormControl("", Validators.required);
    this.price = new FormControl("", Validators.required);
  }

  private createForm() {
    this.addProductForm = new FormGroup({
      name: this.name,
      category: this.category,
      quantity: this.quantity,
      price: this.price
    });
  }

}
