import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApproveMatchesModel } from '../models/ApproveMatchesModel';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  
  private monthlySubscription = `${this.apiUrl}/monthly-subscription`
  private monthlySubscriptionApproveMatches = `${this.apiUrl}/monthly-subscription/approve-matches`

  constructor(private http: HttpClient) {}

  headers = new HttpHeaders()
    .set("Content-Type", "application/json");

    MonthlySubscriptionLoad(): Observable<{}> {
      return this.http.get(this.monthlySubscription, { headers: this.headers }).pipe();
    }

    MonthlySubscriptionCreateOrUpdate(requestData): Observable<{}> {
      if(requestData.Id == 0){
        return this.http.post(this.monthlySubscription,requestData ,{ headers: this.headers }).pipe();
      }else{
        return this.http.put(this.monthlySubscription,requestData ,{ headers: this.headers }).pipe();
      }
    }

    MonthlySubscriptionDelete(requestData): Observable<{}> {
      return this.http.delete(`${this.monthlySubscription}?id=${requestData}`).pipe();
    }

    MonthlySubscriptionApproveMatches(requestData: ApproveMatchesModel): Observable<{}> {
      return this.http.post(this.monthlySubscriptionApproveMatches,requestData ,{ headers: this.headers }).pipe();
    }
}
