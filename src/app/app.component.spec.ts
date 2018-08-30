import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component } from "@angular/core";

describe('AppComponent', () => {

    @Component({ selector: 'fp-navbar', template: '<div></div>' })
    class FakeFpNavBar { }
    @Component({ selector: 'router-outlet', template: '<div></div>' })
    class FakeRouter { }
    @Component({ selector: 'fp-footer', template: '<div></div>' })
    class FakeFpFooter { }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                FakeFpNavBar,
                FakeRouter,
                FakeFpFooter
            ],
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    // it(`should have as title 'FootballPickem6'`, async(() => {
    //     const fixture = TestBed.createComponent(AppComponent);
    //     const app = fixture.debugElement.componentInstance;
    //
    //     expect(app.title).toEqual('FootballPickem6');
    // }));
    //
    // it('should render title in a h1 tag', async(() => {
    //     const fixture = TestBed.createComponent(AppComponent);
    //     fixture.detectChanges();
    //     const compiled = fixture.debugElement.nativeElement;
    //     expect(compiled.querySelector('h1').textContent).toContain('Welcome to FootballPickem6!');
    // }));
});
