import {getdate} from "./utils";

class submit {
    constructor(t, result, contest, title, point, url) {
        this.t = t
        this.result = result
        this.contest  = contest
        this.title = title
        this.point = point
        this.url = url
    }

    getPoint(){
        return this.point
    }

    getDateString() {
        return getdate(this.t)
    }

    getDate(){
        return new Date(this.t)
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
    constructor(subs) {
        this.subs = subs ? subs : []
    }

    add(submission) {
        this.subs.push(submission)
    }

    count(site) {
        if(site) return this.getAll().filter(sub => sub.getSite() === site).length
        return this.getAll().length
    }

    getAll()  {
        return this.subs
    }

    merge(submissions){
        submissions.getAll().map(sub => {
            this.add(sub)
        })
    }

    filter(conditions) {
        return this.getAll().filter(sub => {
            return conditions.accept(sub)
        })
    }
}
