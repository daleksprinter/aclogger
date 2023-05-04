class Condition {}

class SubmissionDateCondition extends Condition {
    constructor(from, to) {
        super();
        this.submit_from = from;
        this.submit_to = to;
    }
}

class AtCoderCondition extends Condition {
    constructor(lower, upper, status) {
        super();
        this.status = status;
        this.atcoder_lower_point = lower;
        this.atcoder_upper_point = upper;
    }
}

class CodeforcesCondition extends Condition {
    constructor(lower, upper, status) {
        super();
        this.status = status;
        this.codeforces_lower_point = lower;
        this.codeforces_upper_point = upper;
    }
}
class AizuOnlineJudgeCondition extends Condition {
    constructor(lower, upper, status) {
        super();
        this.status = status;
        this.aoj_lower_point = lower;
        this.aoj_upper_point = upper;
    }
}
class yukiconderCondition extends Condition {
    constructor(lower, upper, status) {
        super();
        this.status = status;
        this.yukicoder_lower_point = lower;
        this.yukicoder_upper_point = upper;
    }
}
