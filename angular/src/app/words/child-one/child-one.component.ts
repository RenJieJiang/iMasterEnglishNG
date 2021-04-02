import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BreadcrumbService } from "xng-breadcrumb";
import { ViewEncapsulation } from '@angular/core';
import { MenuItem } from "primeng/api/public_api";
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';

@Component({
  selector: "app-child-one",
  templateUrl: "./child-one.component.html",
  styleUrls: ["./child-one.component.scss"],
  providers: [ConfirmationService,MessageService],
  // encapsulation: ViewEncapsulation.None
})
export class ChildOneComponent implements OnInit {
  bsValue = new Date();
  cities: City[];
  selectedCity: City;
  items: MenuItem[];
  countries: any[];
  selectedCountry: Country;
  city: City;

  constructor(
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {

  }

  ngOnInit(): void {
    this.breadcrumbService.set("@ChildOne", "Child One");
    this.initData();
  }

  checkRouteUrl() {
    return this.router.url == "/app/words/child-one";
  }

  get selectedCityName() {
    return this.selectedCity?.name;
  }

  initData() {
    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];

    this.items = [
      {label: 'Update', icon: 'pi pi-refresh', command: () => {
          alert("update clicked");
      }},
      {label: 'Delete', icon: 'pi pi-times', command: () => {
        alert("delete clicked");
      }},
      {label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io'},
      {separator: true},
      {label: 'Setup', icon: 'pi pi-cog', routerLink: ['/setup']}
  ];

  this.countries = [
    {name: 'Australia', code: 'AU'},
    {name: 'Brazil', code: 'BR'},
    {name: 'China', code: 'CN'},
    {name: 'Egypt', code: 'EG'},
    {name: 'France', code: 'FR'},
    {name: 'Germany', code: 'DE'},
    {name: 'India', code: 'IN'},
    {name: 'Japan', code: 'JP'},
    {name: 'Spain', code: 'ES'},
    {name: 'United States', code: 'US'}
];
  }

  confirm1() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have accepted'});
        },
        reject: (type) => {
            switch(type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
                break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
                break;
            }
        }
    });
}
}

interface City {
  name: string;
  code: string;
}

type Country = {
  name: string;
  code: string;
};

