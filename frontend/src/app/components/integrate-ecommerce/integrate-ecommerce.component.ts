import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {} from '../../services/encryption.service';

@Component({
  selector: 'app-integrate-ecommerce',
  templateUrl: './integrate-ecommerce.component.html',
  styleUrls: ['./integrate-ecommerce.component.css']
})
export class IntegrateEcommerceComponent {
  reactAppUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.reactAppUrl = this.sanitizeUrl('https://softwareseguroa-1.onrender.com');
    this.log('Sending name: Fiesta de circo');
    this.log(`encryption key: fiuharERwiotgo8723r891`);
    this.log(`desencryption data: {
          "events": [
          {
            "id": 186,
            "name": "Fiesta de circo",
            "reviews": 1,
            "price": "$250",
            "serviceType": "Fiesta",
            "supplierCategory": "Decoracion",
            "description": "Fiesta con temática de circo",
            "status": "Out of Stock",
            "qty": 0
          }
        ]
      }
    `);
  }

  sanitizeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  log(message: string): void {
    console.log(message);
  }
}


