import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BreadcrumbService } from "xng-breadcrumb";

@Component({
  selector: "app-child-one",
  templateUrl: "./child-one.component.html",
  styleUrls: ["./child-one.component.css"],
})
export class ChildOneComponent implements OnInit {
  constructor(
    private router: Router,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.set("@ChildOne", "Child One");
  }

  checkRouteUrl() {
    return this.router.url == "/app/words/child-one";
  }
}
