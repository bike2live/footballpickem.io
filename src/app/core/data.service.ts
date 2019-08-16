import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {map, tap, catchError, mergeMap} from 'rxjs/operators';
import {SessionError} from '../session-error';
import {FbUser} from '../users/fbUser';
import {Game} from "../features/game";
import {UserScore} from "../features/schedule/add-score-modal/userScore";
import {PlayerStanding} from "../features/leaderboard/player-standing";
import {WeeklyGuess} from "../features/dashboard/weekly-guess";
import {environment} from "../../environments/environment";
import { ChartResult } from "../features/leaderboard/chart-result";


@Injectable({
    providedIn: 'root'
})
export class DataService {
    private baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) {
    }

    public getUserScore(gameId: number): Observable<UserScore> {
        return this.http.get<any>(this.baseUrl + `userScore/${gameId}`)
            .pipe(
                // tap(response => console.log('getUserScore returned: ', response)),
                map( response => <UserScore> response.userScore )
                // tap( result => console.log('getUserScore userScore: ', result))
            );
    }

    public addUserScore(userScore: UserScore): Observable<UserScore> {
        const requestData = {
            userScore: userScore
        };

        return this.http.post<any>(this.baseUrl + 'addscore', requestData)
            .pipe(
                // tap(response => console.log('addScore returned: ', response)),
                map( response => <UserScore> response.userScore )
                // tap( result => console.log('addScore result: ', result))
            );
    }

    public editGameScore(game: Game): Observable<Game> {
        const requestData = {
            game: game
        };

        return this.http.post<any>(this.baseUrl + 'editGameScore/' + game.id, requestData)
            .pipe(
                // tap(response => console.log('editGameScore returned: ', response)),
                map( response => <Game> response.game )
                // tap( result => console.log('editGameScore result: ', result))
            );
    }

    public editGame(game: Game): Observable<Game> {
        const requestData = {
            game: game
        };

        return this.http.post<any>(this.baseUrl + 'editGame/' + game.id, requestData)
          .pipe(
            // tap(response => console.log('editGameScore returned: ', response)),
            map( response => <Game> response.game )
            // tap( result => console.log('editGameScore result: ', result))
          );
    }

    public getPlayerStandings(): Observable<PlayerStanding[]> {
        return this.http.get<any>(this.baseUrl + 'leaderBoard')
            .pipe(
                // tap(response => console.log('getPlayerStandings returned: ', response)),
                map( response => <PlayerStanding[]> response.results )
                // tap( result => console.log('getPlayerStandings result: ', result))
            );
    }

    public getPlayerChart(): Observable<ChartResult[]> {
        return this.http.get<any>(this.baseUrl + 'leaderBoard/chart')
            .pipe(
                tap(response => console.log('getPlayerChart returned: ', response)),
                map( response => <ChartResult[]> response.results ),
                tap( result => console.log('getPlayerChart result: ', result))
            );
    }

    public getSession(): Observable<FbUser | SessionError> {
        return this.http.get<any>(this.baseUrl + 'session')
            .pipe(
                // tap(event => console.log(' getSession returned: ', event)),
                map(b => <FbUser> {
                    uid: b.uid,
                    username: b.username,
                    name: b.name,
                    roles: b.roles
                }),
                catchError(err => this.handleHttpError(err))
            );
    }

    /**
     * Get the list of games for the season
     * @returns {Observable<any>}
     */
    public getSchedule(): Observable<Game[]> {

        // console.log(' attempting to get schedule');

        return this.http.get<any>(this.baseUrl + 'schedule')
            .pipe(
                // tap(response => console.log(' getSchedule returned: ', response)),
                map( (response) => <Game[]> response.games )
                // tap( games => console.log(' final response from getSchedule: ', games))
            );
    }

    public getWeeklyGuesses(gameid: number): Observable<WeeklyGuess[]> {

        return this.http.get<any>(this.baseUrl + 'weeklyUserGuesses/' + gameid)
            .pipe(
                // tap(response => console.log(' getWeeklyGuesses returned: ', response)),
                map( (response) => <WeeklyGuess[]> response.weeklyUserGuesses )
                // tap( games => console.log(' final getWeeklyGuesses from getSchedule: ', games))
            );
    }

    public getUserList(): Observable<FbUser[]> {

        return this.http.get<any>(this.baseUrl + 'userList')
            .pipe(
                // tap(response => console.log(' getUserList returned: ', response)),
                map( (response) => <FbUser[]> response.users )
                // tap( games => console.log(' final getUserList from getSchedule: ', games))
            );
    }

    /**
     * register
     */
    public register(registerForm: any) {
        const register = {
            customer: {
                username: registerForm.username,
                name: registerForm.name,
                password: registerForm.password
            }
        };

        return this.http.post<any>(this.baseUrl + 'signUp', register)
            .pipe(
                map(rep => <FbUser | any> {
                    uid: rep.uid,
                    username: rep.username,
                    name: rep.name
                })
            );
    }

    /**
     * login
     */
    public login(loginForm: any): Observable<FbUser> {

        // console.log(' loginForm: ', loginForm);
        const data = {
            customer: {
                username: loginForm.userName,
                password: loginForm.password
            }
        };

        // console.log(' login data: ', data);

        return this.http.post<any>(this.baseUrl + 'login', data)
            .pipe(
                map(rep => <FbUser> {
                    uid: rep.uid,
                    username: rep.username,
                    name: rep.name,
                    roles: rep.roles
                })
            );
    }

    public logout(): Observable<void> {
        return this.http.get<any>(this.baseUrl + 'logout');
    }

    private handleHttpError(error: HttpErrorResponse): Observable<SessionError> {
        const dataError = new SessionError();
        dataError.errorNumber = 100;
        dataError.message = error.statusText;
        dataError.friendlyMessage = 'An error occurred when reading the session';
        return of(dataError);
    }

}
