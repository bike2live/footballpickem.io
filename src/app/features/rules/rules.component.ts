import { Component, OnInit } from '@angular/core';
import {Rule} from "./rule";

const gRules = [
    {
        frontTitle: 'Overall Scoring',
        rearTitle: 'Example',
        frontImgClass: 'CanadaSqually',
        rearImgClass: 'AndersonZayne',
        frontText: 'Scores accumulate from week to week. The person with the highest total score at the end of the season wins.',
        rearText: 'show scores here'
    },
    {
        frontTitle: 'Weekly Scoring',
        rearTitle: 'Example',
        frontImgClass: 'CritchlowJoe',
        rearImgClass: 'BushmanMatt',
        frontText: 'For each game, scoring will be the sum of the difference between the guesses scores and actual game score. The person with the highest difference will be awarded 0 points. Each other person receives points equal to the now much less the highest difference is.',
        rearText: 'Joe\'s guess is 55 points off, Bob\'s guess is 15 points off, and Brad\'s guess is 5 off, Joe will get 0 points, Bob will get 40 points, and Brad will get 50 points.'
    },
    {
        frontTitle: 'Bonus 1: 10 points',
        rearTitle: 'Example',
        frontImgClass: 'DavidAkile',
        rearImgClass: 'ElBakriBrayden',
        frontText: 'For each game the one with the lowest difference, and who picked the game winner, will be awarded 10 points. If there is more than one with the same difference, 10 points will be awarded to each. If no one picked the correct winner, no bonus points will be awarded.',
        rearText: 'explain this rule'
    },
    {
        frontTitle: 'Bonus 2: 25 points',
        rearTitle: 'Example',
        frontImgClass: 'HogeBeau',
        rearImgClass: 'HogeTristan',
        frontText: 'If a person gets the exact score, a bonus of 25 points will be awarded.',
        rearText: 'explain this rule'
    },
    {
        frontTitle: 'Bonus 3: 5 points',
        rearTitle: 'Example',
        frontImgClass: 'EllisKeenan',
        rearImgClass: 'FauateaTonga',
        frontText: 'If a person gets the exact spread, and picks the game winner, a bonus of 5 points will be awarded.',
        rearText: 'show scores here'
    },
    {
        frontTitle: 'Penalty 1: -5 points',
        rearTitle: 'Example',
        frontImgClass: 'KafentzisAustin',
        rearImgClass: 'KatoaZach',
        frontText: 'Failure to submit a guess for any particular week will result in a penalty of –5 points.',
        rearText: 'show scores here'
    },
    {
        frontTitle: 'Penalty 2: -10 points',
        rearTitle: 'Example',
        frontImgClass: 'WarnerTroy',
        rearImgClass: 'MoungaTevita',
        frontText: 'If you pick the opponent to win, and BYU wins, you will be awarded a penalty of -10 points.',
        rearText: 'show scores here'
    },
    {
        frontTitle: 'Bragger\'s Rule',
        rearTitle: 'Example',
        frontImgClass: 'KaufusiCorbin',
        rearImgClass: 'LeeAustin',
        frontText: 'Each week that Michael does not win, he will be given a 25 point penalty. Each week that he is not leading the standings he will be given a 50 point penalty.',
        rearText: 'show scores here'
    },
    {
        frontTitle: 'Cheaters Rule',
        rearTitle: 'Example',
        frontImgClass: 'MangumTanner',
        rearImgClass: 'NwigweJJ',
        frontText: 'Cheaters Rule: In honor of Bruce\'s changing his score after the game, and his unbelievable feat of "guessing" the correct score twice in the same year, we\'ve introduced this rule. Cheaters will be penalized.',
        rearText: 'show scores here'
    },
];

@Component({
  selector: 'fp-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent{
    rules: Rule[] = gRules;
}
