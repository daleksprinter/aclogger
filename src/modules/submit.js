import {getdate} from "./utils";
import {sitefactory} from "./site";

class Submit {
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

export class AtCoderSubmit extends Submit {
    getSite() {
        return sitefactory.AtCoder()
    }
}
export class CodeforcesSubmit extends Submit {
    getSite() {
        return sitefactory.Codeforces()
    }
}
export class AOJSubmit extends Submit {
     getSite() {
         return sitefactory.AOJ()
    }
}
export class yukicoderSubmit extends Submit {
     getSite() {
         return sitefactory.yukicoder()
    }
}

export class Submissions {
    constructor(subs) {
        this.subs = subs ? subs : []
    }

    add(submission) {
        this.subs.push(submission)
    }

    count(site) {
        if(site) return this.getAll().filter(sub => sub.getSite().isSame(site)).length
        return this.getAll().length
    }

    getAll()  {
        return this.subs
    }

    merge(submissions){
        submissions.getAll().map(sub => {
            this.add(sub)
        })
        return this
    }

    filter(conditions) {
        return this.getAll().filter(sub => {
            return conditions.accept(sub)
        })
    }
}
