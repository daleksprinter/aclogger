import {getdate} from "./utils";
import {sitefactory, Site} from "./site";
import {Status} from "./status"
import {Conditions} from "./condition";

export abstract class Submit {
    t: number
    result: Status
    contest: String | null
    title: String
    point: String | null
    url: String
    constructor(t: number, result: Status, contest: String | null, title: String, point: String | null, url: String) {
        this.t = t
        this.result = result
        this.contest  = contest
        this.title = title
        this.point = point
        this.url = url
    }

    getResult() {
        return this.result
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

    abstract getSite(): Site
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
    subs: Submit[]
    constructor(subs: Submit[] | null) {
        this.subs = subs ? subs : []
    }

    add(submission: Submit) {
        this.subs.push(submission)
    }

    count(site: Site | null) {
        if(site) return this.getAll().filter(sub => sub.getSite().isSame(site)).length
        return this.getAll().length
    }

    getAll()  {
        return this.subs
    }

    merge(submissions: Submissions){
        submissions.getAll().map(sub => {
            this.add(sub)
        })
        return this
    }

    filter(conditions: Conditions) {
        return this.getAll().filter(sub => {
            return conditions.accept(sub)
        })
    }
}
