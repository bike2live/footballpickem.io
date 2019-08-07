import { TestBed, inject } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
class MockHttpClient {
}

describe('DataService', () => {
    let mockHttpClient;

    beforeEach(() => {
        mockHttpClient = jasmine.createSpyObj(['getUserList']);

        TestBed.configureTestingModule({
            providers: [
                DataService,
                { provide: HttpClient, useValue: mockHttpClient }
            ]
        });
    });

    it('should be created', inject([DataService], (service: DataService) => {
        expect(service).toBeTruthy();
    }));

});
