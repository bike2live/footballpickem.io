import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/data.service';
import { PlayerStanding } from './player-standing';
import { Chart } from 'chart.js'
import { ChartResult } from './chart-result';
import { DatePipe } from '@angular/common';

const colors = [
    '#255935',
    '#3a844d',
    '#4ba65f',
    '#6bb779',
    '#a7ce8f',
    '#d5e3a7',
    '#f0f1be',
    '#f7f9e6',
    '#c63531',
    '#e06658',
    '#f9e3dc',
    '#dfe9eb',
    '#96c8db',
    '#3f90be',
    '#244a8b',
    '#cb84b1',
    '#c2745e',
    '#966ba7',
    '#eeaa68',
    '#a64390',
];

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
            borderWidth: 1,
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
                    borderWidth: 1,
                    borderColor: colors[colorIndex],
                    backgroundColor: colors[colorIndex],
                    fill: false
                };
                colorIndex++;
                this.chartData.data.datasets.push(dataSet);
            }
            if (first) {
                this.chartData.data.labels.push(this.datePipe.transform(r.gameDate, 'MMM dd'));
            }
            combinedScore += +r.weekTotalScore;
            dataSet.data.push(combinedScore);

        });

        // this.chartData.data.labels = chartResults.filter( r => {
        //     return this.datePipe.transform(r.gameDate, 'MMM dd');
        // } );

        console.log('chartData: ', this.chartData);
    }

    drawChart(): void {
        console.log('this.chartRef: ', this.chartRef);
        // const ctx = document.getElementById('canvas');
        const ctx = this.chartRef.nativeElement;
        console.log('ctx: ', ctx);
        let chartData = {
            type: 'line',
            data: {
                labels: ['Sept 1', 'Sept 8', 'Sept 15', 'Sept 22', 'Sept 29', 'Oct 6'],
                datasets: [{
                    label: 'Bob',
                    data: [15, 28, 44, 64, 70, 90],
                    borderWidth: 1,
                    borderColor: '#3044bb',
                    backgroundColor: '#3044bb',
                    fill: false
                },

                    {
                        label: 'Joe',
                        data: [13, 25, 47, 61, 75, 89],
                        borderWidth: 1,
                        borderColor: '#04bbbb',
                        backgroundColor: '#04bbbb',
                        fill: false
                    },
                    {
                        label: 'Randy',
                        data: [18, 30, 42, 66, 72, 91],
                        borderWidth: 1,
                        borderColor: '#6909bb',
                        backgroundColor: '#6909bb',
                        fill: false
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        };
        this.chart = new Chart(this.chartRef.nativeElement, this.chartData);

    }
}
