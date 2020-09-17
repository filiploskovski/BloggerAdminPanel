import { MatchModel } from '../models/match';

export class ApproveMatchesModel {
  public Matches: MatchModel[];
  public TotalOdd: Number;
  public Date: Date;

  constructor(matches, totalOdd:Number, date) {
    this.Matches = matches;
    this.TotalOdd = totalOdd;
    this.Date = date;
  }
  
}
