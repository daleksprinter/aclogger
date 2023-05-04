class Condition {}

export class Conditions {
    constructor() {
        this.baseConditions = [
            new SubmissionDateCondition('2020-01-01', '2023-01-01'),
        ]
        this.accond = new AtCoderCondition(0, 3000, []),
        this.cfcond = new CodeforcesCondition(0, 3000, []),
        this.aojcond = new AizuOnlineJudgeCondition(0, 0, []),
        this.ycond = new yukiconderCondition(0, 6, [])
    }

    accept(submission){
        for(const c of this.baseConditions) if(!c.accept(submision)) return false;
        if(submission.getSite() === "AtCoder") return this.accond.accept(submission);
        if(submission.getSite() === "CodeForces") return this.cfcond.accept(submission);
        if(submission.getSite() === "AizuOnlineJudge") return this.aojcond.accept(submission);
        if(submission.getSite() === "yukicoder") return this.ycond.accept(submission);
        return false;
    }
}

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

    accept(submission) {
        return true
    }
}

export class CodeforcesCondition extends Condition {
    constructor(lower, upper, statuses) {
        super();
        this.statuses = statuses;
        this.codeforces_lower_point = lower;
        this.codeforces_upper_point = upper;
    }
    accept(submission) {
        return true
    }
}
export class AizuOnlineJudgeCondition extends Condition {
    constructor(lower, upper, statuses) {
        super();
        this.statuses = statuses;
        this.aoj_lower_point = lower;
        this.aoj_upper_point = upper;
    }
    accept(submission) {
        return true
    }
}
export class yukiconderCondition extends Condition {
    constructor(lower, upper, statuses) {
        super();
        this.statuses = statuses;
        this.yukicoder_lower_point = lower;
        this.yukicoder_upper_point = upper;
    }
    accept(submission) {
       return true
    }
}
