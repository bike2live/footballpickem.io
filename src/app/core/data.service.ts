import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {map, tap, catchError, mergeMap} from 'rxjs/operators';
import {SessionError} from '../session-error';
import {User} from '../users/user';
import {Game} from "../features/game";
import {UserScore} from "../features/schedule/add-score-modal/userScore";


@Injectable({
    providedIn: 'root'
})
export class DataService {
    private baseUrl = 'http://localhost/api/v2/';
    // private baseUrl = '/api/v2/';

    constructor(private http: HttpClient) {
    }

    public getUserScore(gameId: number): Observable<UserScore> {
        return this.http.get<any>(this.baseUrl + `userScore/` + gameId)
            .pipe(
                tap(response => console.log('getUserScore returned: ', response)),
                map( response => <UserScore> response.userScore ),
                tap( result => console.log('getUserScore userScore: ', result))
            );
    }

    public addUserScore(userScore: UserScore): Observable<UserScore> {
        const requestData = {
            userScore: userScore
        };

        return this.http.post<any>(this.baseUrl + 'addscore', requestData)
            .pipe(
                tap(response => console.log('addScore returned: ', response)),
                map( response => <UserScore> response.userScore ),
                tap( result => console.log('addScore result: ', result))
            );
    }

    public editGameScore(game: Game): Observable<Game> {
        const requestData = {
            game: game
        };

        return this.http.post<any>(this.baseUrl + 'editGameScore/' + game.id, requestData)
            .pipe(
                tap(response => console.log('editGameScore returned: ', response)),
                map( response => <Game> response.game ),
                tap( result => console.log('editGameScore result: ', result))
            );
    }

    public getSession(): Observable<User | SessionError> {
        return this.http.get<any>(this.baseUrl + 'session')
            .pipe(
                // tap(event => console.log(' getSession returned: ', event)),
                map(b => <User> {
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

        console.log(' attempting to get schedule');

        return this.http.get<any>(this.baseUrl + 'schedule')
            .pipe(
                tap(response => console.log(' getSchedule returned: ', response)),
                map( (response) => <Game[]> response.games ),
                tap( games => console.log(' final response from getSchedule: ', games))
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
                map(rep => <User | any> {
                    uid: rep.uid,
                    username: rep.username,
                    name: rep.name
                })
            );
    }

    /**
     * login
     */
    public login(loginForm: any): Observable<User> {

        console.log(' loginForm: ', loginForm);
        const data = {
            customer: {
                username: loginForm.userName,
                password: loginForm.password
            }
        };

        console.log(' login data: ', data);

        return this.http.post<any>(this.baseUrl + 'login', data)
            .pipe(
                map(rep => <User> {
                    uid: rep.uid,
                    username: rep.username,
                    name: rep.name,
                    roles: rep.roles
                })
            );
    }

    private handleHttpError(error: HttpErrorResponse): Observable<SessionError> {
        const dataError = new SessionError();
        dataError.errorNumber = 100;
        dataError.message = error.statusText;
        dataError.friendlyMessage = 'An error occurred when reading the session';
        return of(dataError);
    }

}
