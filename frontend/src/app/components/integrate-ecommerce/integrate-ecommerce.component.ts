import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-integrate-ecommerce',
  templateUrl: './integrate-ecommerce.component.html',
  styleUrls: ['./integrate-ecommerce.component.css']
})
export class IntegrateEcommerceComponent {
  reactAppUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.reactAppUrl = this.sanitizeUrl('https://softwareseguroa-1.onrender.com');
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}


