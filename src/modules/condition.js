import {sitefactory} from "./site";

export class conditionsDTO {
    constructor(from_date,
                to_date,
                atocder_lower_point,
                atcoder_upper_point,
                atcoder_status,
                codeforces_lower_point,
                codeforces_upper_point,
                codeforces_status,
                aoj_status,
                yukicoder_lower_point,
                yukiconder_upper_point,
                yukicoder_status,
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
                this.yukicoder_status = yukicoder_status
    }
}

export class Conditions {
    constructor(conddto) {
        this.baseConditions = [
            new SubmissionDateCondition(conddto.from_date, conddto.to_date),
        ]
        this.accond = new AtCoderCondition(conddto.atcoder_lower_point, conddto.atcoder_upper_point, conddto.atcoder_status)
        this.cfcond = new CodeforcesCondition(conddto.codeforces_lower_point, conddto.codeforces_upper_point, conddto.codeforces_status)
        this.aojcond = new AizuOnlineJudgeCondition(conddto.aoj_status)
        this.ycond = new yukiconderCondition(conddto.yukicoder_lower_point, conddto.yukiconder_upper_point, conddto.yukicoder_status)
    }

    accept(submission){
        for(const c of this.baseConditions) if(!c.accept(submission)) return false;
        if(submission.getSite().isSame(sitefactory.AtCoder())) return this.accond.accept(submission);
        if(submission.getSite().isSame(sitefactory.Codeforces())) return this.cfcond.accept(submission);
        if(submission.getSite().isSame(sitefactory.AOJ())) return this.aojcond.accept(submission);
        if(submission.getSite().isSame(sitefactory.yukicoder())) return this.ycond.accept(submission);
        return false;
    }
}


class Condition {}

export class SubmissionDateCondition extends Condition {
    constructor(from, to) {
        super();
        if(!this.isvalid()) throw Error('date condition is not invalid')
        this.submit_from = new Date(from);
        this.submit_to = new Date(to);
    }

    isvalid(from, to) {
        // TODO implement
        return true
    }
    accept(sub) {
        return this.submit_from.getTime() < sub.getDate().getTime() && sub.getDate().getTime() <= this.submit_to.getTime()
    }
}

export class AtCoderCondition extends Condition {
    constructor(lower, upper, statuses) {
        super();
        this.statuses = statuses;
        this.atcoder_lower_point = lower;
        this.atcoder_upper_point = upper;
    }

    acceptStatus(submission){
        return true
    }

    acceptPoint(submission){
        return this.atcoder_lower_point <= submission.getPoint() && submission.getPoint() <= this.atcoder_upper_point;
    }

    accept(submission) {
        return this.acceptPoint(submission) && this.acceptStatus(submission)
    }
}

export class CodeforcesCondition extends Condition {
    constructor(lower, upper, statuses) {
        super();
        this.statuses = statuses;
        this.codeforces_lower_point = lower;
        this.codeforces_upper_point = upper;
    }
    acceptStatus(submission){
        return true
    }
    acceptPoint(submission){
        return this.codeforces_lower_point <= submission.getPoint() && submission.getPoint() <= this.codeforces_upper_point;
    }

    accept(submission) {
        return this.acceptPoint(submission) && this.acceptStatus(submission)
    }
}
export class AizuOnlineJudgeCondition extends Condition {
    constructor(statuses) {
        super();
        this.statuses = statuses;
    }

    acceptStatus(submission){
        return true
    }
    accept(submission) {
        return this.acceptStatus(submission);
    }
}
export class yukiconderCondition extends Condition {
    constructor(lower, upper, statuses) {
        super();
        this.statuses = statuses;
        this.yukicoder_lower_point = lower;
        this.yukicoder_upper_point = upper;
    }

    acceptPoint(submission){
        return this.yukicoder_lower_point <= submission.getPoint() && submission.getPoint() <= this.yukicoder_upper_point;
    }

    accept(submission) {
        return this.acceptPoint(submission)
    }
}
