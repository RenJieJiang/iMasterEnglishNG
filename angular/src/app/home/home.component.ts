import { Component, Injector, ChangeDetectionStrategy } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import { appModuleAnimation } from "@shared/animations/routerTransition";

@Component({
  templateUrl: "./home.component.html",
  animations: [appModuleAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent extends AppComponentBase {
  data: any;
  basicData: any;
  pieData: any;
  basicOptions: any;
  multiAxisData: any;
  multiAxisOptions: any;
  stackedData: any;
  stackedOptions: any;
  radarData: any;

  constructor(injector: Injector) {
    super(injector);

    this.basicData = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "First Dataset",
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: "#42A5F5",
        },
        {
          label: "Second Dataset",
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: "#FFA726",
        },
      ],
    };

    this.basicOptions = {
      legend: {
        labels: {
          fontColor: "#495057",
        },
      },
      scales: {
        xAxes: [
          {
            ticks: {
              fontColor: "#495057",
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              fontColor: "#495057",
            },
          },
        ],
      },
    };

    this.pieData = {
      labels: ['A','B','C'],
      datasets: [
          {
              data: [300, 50, 100],
              backgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ],
              hoverBackgroundColor: [
                  "#FF6384",
                  "#36A2EB",
                  "#FFCE56"
              ]
          }]
      };

    this.multiAxisData = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Dataset 1",
          backgroundColor: [
            "#EC407A",
            "#AB47BC",
            "#42A5F5",
            "#7E57C2",
            "#66BB6A",
            "#FFCA28",
            "#26A69A",
          ],
          yAxisID: "y-axis-1",
          data: [65, 59, 80, 81, 56, 55, 10],
        },
        {
          label: "Dataset 2",
          backgroundColor: "#78909C",
          yAxisID: "y-axis-2",
          data: [28, 48, 40, 19, 86, 27, 90],
        },
      ],
    };

    this.multiAxisOptions = {
      responsive: true,
      tooltips: {
        mode: "index",
        intersect: true,
      },
      scales: {
        yAxes: [
          {
            type: "linear",
            display: true,
            position: "left",
            id: "y-axis-1",
            ticks: {
              min: 0,
              max: 100,
            },
          },
          {
            type: "linear",
            display: true,
            position: "right",
            id: "y-axis-2",
            gridLines: {
              drawOnChartArea: false,
            },
            ticks: {
              min: 0,
              max: 100,
            },
          },
        ],
      },
    };

    this.stackedData = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          type: "bar",
          label: "Dataset 1",
          backgroundColor: "#42A5F5",
          data: [50, 25, 12, 48, 90, 76, 42],
        },
        {
          type: "bar",
          label: "Dataset 2",
          backgroundColor: "#66BB6A",
          data: [21, 84, 24, 75, 37, 65, 34],
        },
        {
          type: "bar",
          label: "Dataset 3",
          backgroundColor: "#FFA726",
          data: [41, 52, 24, 74, 23, 21, 32],
        },
      ],
    };

    this.stackedOptions = {
      tooltips: {
        mode: "index",
        intersect: false,
      },
      responsive: true,
      scales: {
        xAxes: [
          {
            stacked: true,
          },
        ],
        yAxes: [
          {
            stacked: true,
          },
        ],
      },
    };

    this.radarData = {
      labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
      datasets: [
          {
              label: 'My First dataset',
              backgroundColor: 'rgba(179,181,198,0.2)',
              borderColor: 'rgba(179,181,198,1)',
              pointBackgroundColor: 'rgba(179,181,198,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(179,181,198,1)',
              data: [65, 59, 90, 81, 56, 55, 40]
          },
          {
              label: 'My Second dataset',
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              pointBackgroundColor: 'rgba(255,99,132,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(255,99,132,1)',
              data: [28, 48, 40, 19, 96, 27, 100]
          }
      ]
  };
  }
}
