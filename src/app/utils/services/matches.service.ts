import { Injectable } from '@angular/core';
import {  MatchModel } from 'src/app/utils/models/match';
import { ApproveMatchesModel } from '../models/ApproveMatchesModel';

@Injectable({
  providedIn: 'root',
})
export class MatchesService {
  private url = 'https://dapi.beto2.com/Results/GetAllFlatSkr?DatumParovi=';
  //This shoud go from API
  private dataApi = JSON.parse(
    '{"leagues":["Cyprus 1","Uruguay 1","Egypt 1"],"timePeriod":[1300,2000],"freeMatchesMaxCoef":1.8,"monthlySubscriptionBetween":[9,20],"vipTicketBetween":[250,300]}'
  );

  constructor() {}

  generateMonthlySubscription(date): ApproveMatchesModel {
    return this.findMatches(2, this.dataApi.monthlySubscriptionBetween,date);
  }

  generatetVipTicket(date): ApproveMatchesModel {
    return this.findMatches(4, this.dataApi.vipTicketBetween, date);
  }

  private findMatches(numberOfMatches, arrCoefBetween, date) {
    let lstFinal = [];
    let matches = this.getMatches(date);
    let finalCoef = 1;

    while (true) {
      let rnd = Math.floor(Math.random() * matches.length + 1);

      if (matches[rnd] !== undefined && matches[rnd].Odd !== null)
        lstFinal.push(matches[rnd]);

      if (lstFinal.length == numberOfMatches) {
        finalCoef = 1;

        lstFinal.forEach((match) => {
          finalCoef *= match.Odd;
        });

        if (finalCoef > arrCoefBetween[0] && finalCoef < arrCoefBetween[1]) {
          break;
        }

        lstFinal = [];
      }
    }

    return new ApproveMatchesModel(lstFinal,parseFloat(finalCoef.toFixed(2)),date);
  }

  private getMatches(date) {
    const that = this;
    let matches = [];
    let dateParsed = new Date(date).toLocaleDateString();
    let url = this.url + dateParsed;
    let request = new XMLHttpRequest();
    request.open('get', url, false);
    request.onload = function () {
      JSON.parse(this.response).forEach((match) => {
        if (match.SP == 'Фудбал' && match.SMK == 'Крај' && that.time(match)) {
          matches.push(new MatchModel(match));
        }
      });
    };
    request.send();
    return matches;
  }

  private time(match) {
    let date = new Date(match.P).toLocaleTimeString(['it-IT'], {
      hour: '2-digit',
      minute: '2-digit',
    });
    let dateSps = date.split(':');
    let spl = parseInt(dateSps[0] + dateSps[1]);
    if (spl >= this.dataApi.timePeriod[0] && spl <= this.dataApi.timePeriod[1])
      return true;
    return false;
  }
}
