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
    '#ffff99',
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

    drawChart(): void {
        const ctx = this.chartRef.nativeElement;
        this.chart = new Chart(this.chartRef.nativeElement, this.chartData);
    }
}
