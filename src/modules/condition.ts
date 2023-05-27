import {sitefactory} from "./site";
import {Submit} from "./submit";
import {Status} from "./status"

export class conditionsDTO {
    from_date:number
    to_date:number
    atcoder_lower_point:number
    atcoder_upper_point:number
    atcoder_status: Status[]
    codeforces_lower_point:number
    codeforces_upper_point:number
    codeforces_status: Status[]
    aoj_status: Status[]
    yukicoder_lower_point:number
    yukiconder_upper_point:number

    constructor(from_date: number,
                to_date: number,
                atocder_lower_point: number,
                atcoder_upper_point: number,
                atcoder_status: Status[],
                codeforces_lower_point: number,
                codeforces_upper_point: number,
                codeforces_status: Status[],
                aoj_status: Status[],
                yukicoder_lower_point: number,
                yukiconder_upper_point: number,
    ) {
                this.from_date = from_date
                this.to_date = to_date
                this.atcoder_lower_point = atocder_lower_point
                this.atcoder_upper_point = atcoder_upper_point
                this.atcoder_status = atcoder_status
                this.codeforces_lower_point = codeforces_lower_point
                this.codeforces_upper_point = codeforces_upper_point
                this.codeforces_status = codeforces_status
                this.aoj_status = aoj_status
                this.yukicoder_lower_point = yukicoder_lower_point
                this.yukiconder_upper_point = yukiconder_upper_point
    }
}

export class Conditions {
    baseConditions: Condition[]
    accond: Condition
    cfcond: Condition
    aojcond: Condition
    ycond: Condition
    constructor(conddto: conditionsDTO) {
        this.baseConditions = [
            new SubmissionDateCondition(conddto.from_date, conddto.to_date),
        ]
        this.accond = new AtCoderCondition(conddto.atcoder_lower_point, conddto.atcoder_upper_point, conddto.atcoder_status)
        this.cfcond = new CodeforcesCondition(conddto.codeforces_lower_point, conddto.codeforces_upper_point, conddto.codeforces_status)
        this.aojcond = new AizuOnlineJudgeCondition(conddto.aoj_status)
        this.ycond = new yukiconderCondition(conddto.yukicoder_lower_point, conddto.yukiconder_upper_point)
    }

    accept(submission: Submit){
        for(const c of this.baseConditions) if(!c.accept(submission)) return false;
        if(submission.getSite().isSame(sitefactory.AtCoder())) return this.accond.accept(submission);
        if(submission.getSite().isSame(sitefactory.Codeforces())) return this.cfcond.accept(submission);
        if(submission.getSite().isSame(sitefactory.AOJ())) return this.aojcond.accept(submission);
        if(submission.getSite().isSame(sitefactory.yukicoder())) return this.ycond.accept(submission);
        return false;
    }
}


abstract class Condition {
    abstract accept(sub: Submit): boolean
}

export class SubmissionDateCondition extends Condition {
    submit_from: any
    submit_to: any
    constructor(from: number, to: number) {
        super();
        if(!this.isvalid(from, to)) throw Error('date condition is not invalid')
        this.submit_from = new Date(from);
        this.submit_to = new Date(to);
    }

    isvalid(from: number, to: number) {
        // TODO implement
        return true
    }
    accept(sub: Submit) {
        return this.submit_from.getTime() < sub.getDate().getTime() && sub.getDate().getTime() <= this.submit_to.getTime()
    }
}

export class AtCoderCondition extends Condition {
    statuses: Status[]
    atcoder_lower_point:number
    atcoder_upper_point:number
    constructor(lower: number, upper: number, statuses: Status[]) {
        super();
        this.statuses = statuses;
        this.atcoder_lower_point = lower;
        this.atcoder_upper_point = upper;
    }

    acceptStatus(s: Submit){
        return this.statuses.map(s => s.getStatus()).includes(s.getResult().getStatus())
    }

    acceptPoint(s: Submit){
        const p =  s.getPoint()
        if(p===null) return false
        return this.atcoder_lower_point <= p && p <= this.atcoder_upper_point;
    }

    accept(s: Submit) {
        return this.acceptPoint(s) && this.acceptStatus(s)
    }
}

export class CodeforcesCondition extends Condition {
    statuses: Status[]
    codeforces_lower_point:number
    codeforces_upper_point:number

    constructor(lower: number, upper: number, statuses: Status[]) {
        super();
        this.statuses = statuses;
        this.codeforces_lower_point = lower;
        this.codeforces_upper_point = upper;
    }
    acceptStatus(s: Submit){
        return this.statuses.map(s => s.getStatus()).includes(s.getResult().getStatus())
    }
    acceptPoint(s: Submit):boolean{
        const p =  s.getPoint()
        if(p===null) return false
        return this.codeforces_lower_point <= p && p <= this.codeforces_upper_point;
    }

    accept(s: Submit) {
        return this.acceptPoint(s) && this.acceptStatus(s)
    }
}
export class AizuOnlineJudgeCondition extends Condition {
    statuses: Status[]
    constructor(statuses: Status[]) {
        super();
        this.statuses = statuses;
    }

    acceptStatus(s: Submit){
        return this.statuses.map(s => s.getStatus()).includes(s.getResult().getStatus())
    }

    accept(s: Submit) {
        return this.acceptStatus(s);
    }
}
export class yukiconderCondition extends Condition {
    yukicoder_lower_point:number
    yukicoder_upper_point:number

    constructor(lower: number, upper: number) {
        super();
        this.yukicoder_lower_point = lower;
        this.yukicoder_upper_point = upper;
    }

    acceptPoint(s: Submit):boolean{
        const p = s.getPoint()
        if(p === null ) return false
        return this.yukicoder_lower_point <= p && p <= this.yukicoder_upper_point;
    }

    accept(s: Submit) {
        return this.acceptPoint(s)
    }
}
