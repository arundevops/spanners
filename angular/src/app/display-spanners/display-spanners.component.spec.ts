/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DisplaySpannersComponent } from './display-spanners.component';
import {RouterTestingModule} from "@angular/router/testing";
import {SpannersService} from "../spanners.service";
import {Spanner} from "../spanner";
import {Observable} from "rxjs";

describe('DisplaySpannersComponent', () => {
  let component: DisplaySpannersComponent;
  let fixture: ComponentFixture<DisplaySpannersComponent>;
  let compiledPage: DebugElement;

  const expectedSpanners: Spanner[] = [
    {id: 0, name: 'Bertha', size: 12},
    {id: 1, name: 'Keeley', size: 14},
    {id: 2, name: 'Georgie', size: 15}
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplaySpannersComponent ],
      imports: [RouterTestingModule],
      providers: [
        {provide: SpannersService, useValue: {
          getSpanners(): Observable<Spanner[]> {return Observable.of(expectedSpanners);}
        }}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySpannersComponent);
    component = fixture.componentInstance;
    compiledPage = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create one row per spanner', async(() => {
    expect((compiledPage.queryAll(By.css('table tbody tr'))).length).toBe(expectedSpanners.length);
  }));

  it('should contain spanner details in table rows', async(() => {
    for (let row in expectedSpanners) {
      let tr: DebugElement = compiledPage.queryAll(By.css('table tbody tr'))[row];
      expect(tr.queryAll(By.css('td'))[0].nativeElement.textContent).toBe(expectedSpanners[row].name);
      expect(tr.queryAll(By.css('td'))[1].nativeElement.textContent).toContain(expectedSpanners[row].size);
    }
  }));

  it('should contain link to detail-spanner in table rows', async(() => {
    for (let row in expectedSpanners) {
      expect(compiledPage.queryAll(By.css('tr td a'))[row].nativeElement.href).toContain('/detail-spanner/' + expectedSpanners[row].id);
    }
  }));
});
