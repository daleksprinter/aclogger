import {Submissions, AtCoderSubmit, CodeforcesSubmit, AOJSubmit, yukicoderSubmit} from "./submit";

class BaseClient {}
export class AtCoderClient extends BaseClient{
    constructor(user) {
        super();
        this.user = user
        this.url = "https://kenkoooo.com/atcoder/atcoder-api/results?user=" + user
    }
    fetch() {
        if(this.user !== "" && this.user !== undefined) {
            return fetch(this.url).then((res) => {
                return res.json()
            })
        } else{
            return Promise.resolve([])
        }
    }

    getAllSubmissions() {
        return this.fetch().then(json => {
            const subs = this.toSubmissions(json)
            return Promise.resolve(subs)
        })
    }

    resToSub(res) {
        const subtime = res['epoch_second'] * 1000;
        const result = res['result']
        const contestid =  res['contest_id'].toUpperCase()
        const title = res['problem_id']
        const point = res['point']
        const url =  "https://atcoder.jp/contests/" + res['contest_id'] + "/submissions/" + res['id']

        const s = new AtCoderSubmit(subtime, result, contestid, title, point, url)
        return s
    }

    toSubmissions(results) {
        const subs = new Submissions()
        for(const res of results){
            subs.add(this.resToSub(res))
        }
        return subs
    }
}

export class CodeForcesClient extends BaseClient {
    constructor(user) {
        super();
        this.user = user
        this.url = "https://codeforces.com/api/user.status?handle=" + this.user + "&from=1&count=1000"
    }

    fetch() {
        if(this.user !== "" && this.user !== undefined) {
            return fetch(this.url).then((res) => {
                return res.json()
            })
        }else{
            return Promise.resolve({result:[]})
        }
    }

    getAllSubmissions() {
        return this.fetch().then(json => {
            const subs = this.toSubmissions(json['result'])
            return Promise.resolve(subs)
        })
    }

    resToSub(res) {
          const subtime = res['creationTimeSeconds'] * 1000;
          const result = res['verdict']
          const contestid = res['problem']['contestId']
          const title = res['problem']['index'] + '. ' + res['problem']['name']
          const point = res['problem']['rating']
          const url = "https://codeforces.com/contest/" + res['problem']['contestId'] + "/submission/" + res['id']
          const sub = new CodeforcesSubmit(subtime, result, contestid, title, point, url)
          return sub
    }

    toSubmissions(results) {
        const subs = new Submissions()
        for(const res of results){
            subs.add(this.resToSub(res))
        }
        return subs
    }

}

export class AizuOnlineJudgeClient extends BaseClient{
    constructor(user) {
        super();
        this.user = user
        this.url = "https://judgeapi.u-aizu.ac.jp/submission_records/users/" + this.user + "?page=0&size=10000";
    }
    fetch() {
        if(this.user !== "" && this.user !== undefined) {
            return fetch(this.url).then((res) => {
                return res.json()
            })
        }else{
            return Promise.resolve([])
        }
    }

    getAllSubmissions() {
        return this.fetch().then(json => {
            const subs = this.toSubmissions(json)
            return Promise.resolve(subs)
        })
    }

    resToSub(res) {
        const subtime = res['submissionDate'];
        const result = res['status']
        const contestid = null
        const title = res['problemId']
        const point = null
        const url = "http://judge.u-aizu.ac.jp/onlinejudge/review.jsp?rid=" + res['judgeId']
        const s = new AOJSubmit(subtime, result, contestid, title, point, url)
        return s
    }

    toSubmissions(results) {
        const subs = new Submissions()
        for(const res of results){
            subs.add(this.resToSub(res))
        }
        return subs
    }
}


export class yukicoderClient extends BaseClient{
    constructor(user) {
        super();
        this.user = user
        this.url = "https://yukicoder.me/api/v1/solved/name/" + this.user
    }
    fetch() {
        if(this.user !== "" && this.user !== undefined) {
            return fetch(this.url).then((res) => {
                return res.json()
            })
        }else{
            return Promise.resolve([])
        }
    }

    getAllSubmissions() {
        return this.fetch().then(json => {
            const subs = this.toSubmissions(json)
            return Promise.resolve(subs)
        })
    }

    resToSub(res) {
        const subtime = new Date(res['Date']).getTime();
        const result = "AC"
        const contestid = null
        const title = res['Title']
        const point =  res['Level']
        const url  = "https://yukicoder.me/"
        const s = new yukicoderSubmit(subtime, result, contestid, title, point, url)
        return s
    }

    toSubmissions(results) {
        const subs = new Submissions()
        for(const res of results){
            subs.add(this.resToSub(res))
        }
        return subs
    }
}

export class Clients {
    constructor(AtCoderUser, CodeforcesUser, AOJUser, yukicoderUser) {
        this.atcoderClient = new AtCoderClient(AtCoderUser)
        this.codeforcesClient = new CodeForcesClient(CodeforcesUser)
        this.aojClient = new AizuOnlineJudgeClient(AOJUser)
        this.yukicoderClient = new yukicoderClient(yukicoderUser)
    }

    fetch(callback) {
        return Promise.all([this.atcoderClient.getAllSubmissions(), this.codeforcesClient.getAllSubmissions(), this.aojClient.getAllSubmissions(), this.yukicoderClient.getAllSubmissions()])
            .then(res => {
                const s = res.reduce((accum, subs) => accum.merge(subs), new Submissions())
                callback(s)
            })
    }
}
