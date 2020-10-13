export class MatchModel {
    public Id: Number;
    public Date: Date;
    public Time: String;
    public Description: String;
    public Match: String;
    public Tip: String;
    public Odd: String;
    public Result: String;
    public WinLose: String;
    public League: String;

    constructor(match){
        this.Time = this.time(match);
        this.Match = match.T1 + " - " + match.T2;
        this.Tip = this.whoWonF(match);
        this.Odd = this.coefWin(match);
        this.Result = match.KT1 + ":" + match.KT2;
        this.League = match.LN;     
    }

    whoWonF(match) {
        const firstTeamGoals = match.KT1;
        const secondTeamGoals = match.KT2;
  
        if (firstTeamGoals > secondTeamGoals) return "1";
        if (firstTeamGoals < secondTeamGoals) return "2";
        return "X";
    }
    coefWin(match) {
        if (this.whoWonF(match) == '1') return match.T1K;
        if (this.whoWonF(match) == '2') return match.T02;
        return match.T0K;
    }
    time(match) {
        let date = new Date(match.P);
        return date.toLocaleTimeString(["it-IT"], {
            hour: "2-digit",
            minute: "2-digit"
        });
    }
}