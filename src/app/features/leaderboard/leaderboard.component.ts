import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/data.service';
import { PlayerStanding } from './player-standing';
import { Chart } from 'chart.js'
import { ChartResult } from './chart-result';
import { DatePipe } from '@angular/common';

const colors = [
    '#a6cee3',
    '#1f78b4',
    '#b2df8a',
    '#33a02c',
    '#fb9a99',
    '#e31a1c',
    '#fdbf6f',
    '#ff7f00',
    '#cab2d6',
    '#6a3d9a',
    '#b15928',

    '#4acd9e',
    '#8cbe7d',
    '#a8b336',
    '#a99e27',
    '#473013',
    '#341B0F',
    '#21240A',
    '#25371A',
    '#224B31',
    '#1C5E50',
    '#237072',
    '#438095',
    '#072721',
    '#0E3C3D',
    '#23515C',
    '#45647C',
    '#717599',
    '#A583AF',
    '#1B242F',
    '#363244',
    '#583E55',
    '#7C4A61',
    '#A15767',
    '#C36766',
    '#ffff99',
];

const gradientBarChartConfiguration =  {
    maintainAspectRatio: false,
    legend: {
        display: false
    },

    tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
    },
    responsive: true,
    scales:{
        yAxes: [{

            gridLines: {
                drawBorder: false,
                color: 'rgba(29,140,248,0.1)',
                zeroLineColor: "transparent",
            },
            ticks: {
                suggestedMin: 60,
                suggestedMax: 120,
                padding: 20,
                fontColor: "#9e9e9e"
            }
        }],

        xAxes: [{

            gridLines: {
                drawBorder: false,
                color: 'rgba(29,140,248,0.1)',
                zeroLineColor: "transparent",
            },
            ticks: {
                padding: 20,
                fontColor: "#9e9e9e"
            }
        }]
    }
};

@Component({
    selector: 'fp-leaderboard',
    templateUrl: './leaderboard.component.html',
    styleUrls: ['./leaderboard.component.scss'],
    providers: [DatePipe]
})
export class LeaderboardComponent implements OnInit {
    @ViewChild('lineChart') private chartRef;
    scores: PlayerStanding[];
    chartResults: ChartResult[];
    chartData: any;
    chart: any;

    constructor(private dataService: DataService,
                private datePipe: DatePipe) {
        this.chart = [];
        this.chartResults = [];
    }

    ngOnInit() {
        this.getPlayerStandings();
        this.getPlayerChart();
    }

    getPlayerStandings(): void {
        this.dataService.getPlayerStandings().subscribe(
            (data: PlayerStanding[]) => {
                this.scores = data;
            },
            (err: any) => console.log(err)
        );
    }

    getPlayerChart(): void {
        this.dataService.getPlayerChart().subscribe(
            (data: ChartResult[]) => {
                this.chartResults = data;
                this.generateChartData(data);
                this.drawChart();
            },
            (err: any) => console.log(err)
        );
    }

    private generateChartData(chartResults: ChartResult[]) {

        console.log('generating char data');

        this.chartData = {
            type: 'line',
            data: {
                labels: [],
                datasets: [],
            },
            options: {
                legend: {
                    display: true,
                    position: 'right'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        };

        let first = true;
        let uid = 0;
        let combinedScore = .0;
        let dataSet = {
            label: '',
            data: [],
            borderWidth: 2,
            borderColor: '',
            backgroundColor: '',
            fill: false
        };
        let colorIndex = 0;
        chartResults.forEach( r => {
            if (r.uid !== uid) {
                if (uid !== 0) {
                    first = false;
                }
                uid = r.uid;
                combinedScore = 0;
                dataSet = {
                    label: r.name,
                    data: [],
                    borderWidth: 2,
                    borderColor: colors[colorIndex],
                    backgroundColor: colors[colorIndex],
                    fill: false
                };
                colorIndex++;
                this.chartData.data.datasets.push(dataSet);
            }
            if (first) {
                let gameDate = r.gameDate.replace(' ', 'T') + 'Z';
                this.chartData.data.labels.push(this.datePipe.transform(gameDate, 'MMM dd'));
            }
            combinedScore += +r.weekTotalScore;
            dataSet.data.push(combinedScore);
        });

    }

    /*
    var ctx = document.getElementById("CountryChart").getContext("2d");

      var gradientStroke = ctx.createLinearGradient(0,230,0,50);

      gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
      gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
      gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors


      var myChart = new Chart(ctx, {
        type: 'bar',
        responsive: true,
        legend: {
              display: false
        },
        data: {
          labels: ['USA','GER','AUS','UK','RO','BR'],
          datasets: [{
            label: "Countries",
            fill: true,
            backgroundColor: gradientStroke,
            hoverBackgroundColor: gradientStroke,
            borderColor: '#1f8ef1',
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            data: [ 53, 20, 10, 80, 100, 45],
          }]
        },
          options: gradientBarChartConfiguration
      });

     */

    drawChart(): void {
        const ctx = this.chartRef.nativeElement;
        // let gradientStroke = ctx.getContext('2d').createLinearGradient(0,200,0,150);
        //
        // gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
        // gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
        // gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors
        //
        // this.chartData.data.datasets[0].backgroundColor = gradientStroke;
        // this.chartData.data.datasets[1].backgroundColor = gradientStroke;
        // this.chartData.data.datasets[2].backgroundColor = gradientStroke;
        // this.chartData.data.datasets[3].backgroundColor = gradientStroke;

        this.chart = new Chart(this.chartRef.nativeElement, this.chartData);
    }
}
