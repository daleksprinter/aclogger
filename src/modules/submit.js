class submit {
    constructor(t, result, contest, title, point, url) {
        this.t = t
        this.result = result
        this.contest  = contest
        this.title = title
        this.point = point
        this.url = url
    }

    getDate() {
        return '2023-01-01'
    }
}

export class acsubmit extends submit {
    getSite() {
        return "AtCoder"
    }
}
export class cfsubmit extends submit {
    getSite() {
        return "CodeForces"
    }
}
export class aojsubmit extends submit {
     getSite() {
        return "AizuOnlineJudge"
    }
}
export class ycsubmit extends submit {
     getSite() {
        return "yukicoder"
    }
}

export class submissions {
    constructor() {
        this.subs = []
    }

    add(submission) {
        this.subs.push(submission)
    }

    count() {
        return this.subs.length
    }

    account() {
        return 1
    }

    cfcount(){
        return 1
    }

    ykcount()  {
        return 1
    }

    aojcount() {
        return 1
    }

    getTodayAC() {
        return [new acsubmit('', 'AC', '', '', '', '')]
    }

    getAll()  {
        return this.subs
    }

    merge(submissions){
        submissions.getAll().map(sub => {
            this.add(sub)
        })
    }
}
