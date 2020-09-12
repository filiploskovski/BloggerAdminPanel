export class Match {
    time:any;
    code:any;
    league:any;
    team1:any;
    team2:any;
    result:any;
    whoWon:any;
  
    constructor(match) {
        this.time = this.date(match);
        this.code = match.S;
        this.league = match.LN;
        this.team1 = match.T1;
        this.team2 = match.T2;
        this.result = match.KT1 + " " + match.KT2;
        this.whoWon = this.whoWonF(match);
        this.coefWin = this.coefWin(match);
    }
    whoWonF(match) {
        const firstTeamGoals = match.KT1;
        const secondTeamGoals = match.KT2;
  
        if (firstTeamGoals > secondTeamGoals) return 1;
        if (firstTeamGoals < secondTeamGoals) return 2;
        return 0;
    }
    coefWin(match) {
        if (this.whoWon == 1) return match.T1K;
        if (this.whoWon == 2) return match.T02;
        return match.T0K;
    }
    date(match) {
        let date = new Date(match.P);
        return date.toLocaleTimeString(["it-IT"], {
            hour: "2-digit",
            minute: "2-digit"
        });
    }
  }