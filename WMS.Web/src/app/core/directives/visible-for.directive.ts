import { Directive, Input, ElementRef, Renderer, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as jwt_decode from "jwt-decode";

@Directive({
  selector: '[appVisibleFor]'
})
export class VisibleForDirective implements OnInit {

  @Input("appVisibleFor") role: string = "";

  constructor(private el: ElementRef, private renderer: Renderer, private authService: AuthService) {

  }

  ngOnInit(): void {
    let display: string = "none";

    if (this.authService.isLoggedIn()) {
      let token: any = jwt_decode(this.authService.getToken());
      if (token.role.toLocaleLowerCase() === this.role.toLocaleLowerCase()) {
        display = "block";
      }
    }

    this.renderer.setElementStyle(this.el.nativeElement, "display", display);
  }

}
