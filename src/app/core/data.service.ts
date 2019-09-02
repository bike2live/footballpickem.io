import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map, tap, catchError} from 'rxjs/operators';
import { AppSetting } from '../admin/app-settings/appSetting';
import { GameResults } from '../features/game-results';
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

    public getGame(gameId: number): Observable<Game> {
        return this.http.get<any>(this.baseUrl + `game/${gameId}`)
          .pipe(
            map( response => <Game> response.game)
          );
    }

    public getGameResults(gameId: number): Observable<GameResults[]> {
        return this.http.get<any>(this.baseUrl + `gameResults/${gameId}`)
          .pipe(
            map( response => <GameResults[]> response.gameResults)
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
                    idp_id: b.idp_id,
                    name: b.name,
                    roles: b.roles,
                    photo: b.photo
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
    public register(userData: any): Observable<FbUser> {
        const register = {
            customer: {
                name: userData.name,
                email: userData.email,
                idp_id: userData.sub,
                photo: ''
            }
        };
        if (userData.picture) {
            if (Array.isArray(userData.picture)) {
                userData.photo = userData.picture[0];
            } else {
                userData.photo = userData.picture;
            }
        }

        console.log('sending this data to db: ', register);
        return this.http.post<any>(this.baseUrl + 'signUp', register)
            .pipe(
                tap((response) => console.log('register returned: ', response)),
                map(response => <FbUser> {
                    uid: response.uid,
                    idp_id: response.idp_id,
                    name: response.name,
                    roles: response.roles,
                    photo: response.photo
                })
            );
    }

    /*
             $response["status"] = "success";
        $response["message"] = "User account created successfully";
        $response["uid"] = $result;
        $response["name"] = $name;
        $response["idp_id"] = $idp_id;

     */
    /**
     * isUserRegistered - check to see if the user is registered
     */
    public isUserRegistered(idp_id: string): Observable<any> {
        const data = {
            customer: {
                idp_id: idp_id
            }
        };
        return this.http.post<any>(this.baseUrl + 'isUserRegistered', data)
            .pipe(
                tap((data) => console.log('data ', data) ),
                map((response) => <any> response.uid ),
                catchError(err => {
                    console.log('caught error during isUserRegistered: ', err);
                    return of({});
                })
            );
    }

    /**
     * login
     */
    public login(idp_id: string): Observable<any> {
        const data = {
            customer: {
                idp_id: idp_id,
                username: 'bob'
            }
        };
        return this.http.post<any>(this.baseUrl + 'login', data)
            .pipe(
                map((rep) => <FbUser> {
                    uid: rep.uid,
                    idp_id: rep.idp_id,
                    name: rep.name,
                    roles: rep.roles,
                    photo: rep.photo
                }),
                catchError(err => {
                    console.log('caught error during login: ', err);
                    return of({});
                })
            );
    }

    public logout(): Observable<void> {
        return this.http.get<any>(this.baseUrl + 'logout');
    }

    public deleteUser(uid): Observable<any> {
        const body = {
            uid: uid
        };
        return this.http.post<any>(this.baseUrl + 'deleteUser', body);
    }

    public getAppSettings(): Observable<AppSetting[]> {
        return this.http.get<any>(this.baseUrl + 'settings')
          .pipe(
            tap((data) => console.log('getAppSettings returned: ', data) ),
            map((rep) => <any> {
                settings: rep.settings
            }),
            catchError(err => {
                console.log('caught error during login: ', err);
                return of({});
            })
          );
    }

    public setAppSetting(appSetting: AppSetting): Observable<any> {
        return this.http.post<any>(this.baseUrl + 'updateSetting', appSetting);
    }

    private handleHttpError(error: HttpErrorResponse): Observable<SessionError> {
        const dataError = new SessionError();
        dataError.errorNumber = 100;
        dataError.message = error.statusText;
        dataError.friendlyMessage = 'An error occurred when reading the session';
        return of(dataError);
    }

}
