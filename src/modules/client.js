import {submissions, acsubmit, cfsubmit, aojsubmit, ycsubmit} from "./submit";

class client{}
export class AtCoderClient extends client{
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

    resToSub(res) {
        const subtime = res['epoch_second'] * 1000;
        const result = res['result']
        const contestid =  res['contest_id'].toUpperCase()
        const title = res['problem_id']
        const point = res['point']
        const url =  "https://atcoder.jp/contests/" + res['contest_id'] + "/submissions/" + res['id']

        const s = new acsubmit(subtime, result, contestid, title, point, url)
        return s
    }

    toSubmissions(results) {
        const subs = new submissions()
        for(const res of results){
            subs.add(this.resToSub(res))
        }
        return subs
    }
}

export class CodeForcesClient extends client {
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

    resToSub(res) {
          const subtime = res['creationTimeSeconds'] * 1000;
          const result = res['verdict']
          const contestid = res['problem']['contestId']
          const title = res['problem']['index'] + '. ' + res['problem']['name']
          const point = res['problem']['rating']
          const url = "https://codeforces.com/contest/" + res['problem']['contestId'] + "/submission/" + res['id']
          const sub = new cfsubmit(subtime, result, contestid, title, point, url)
          return sub
    }

    toSubmissions(results) {
        const subs = new submissions()
        for(const res of results){
            subs.add(this.resToSub(res))
        }
        return subs
    }

}

export class AizuOnlineJudgeClient extends client{
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

    resToSub(res) {
        const subtime = res['submissionDate'];
        const result = res['status']
        const contestid = null
        const title = res['problemId']
        const point = null
        const url = "http://judge.u-aizu.ac.jp/onlinejudge/review.jsp?rid=" + res['judgeId']
        const s = new aojsubmit(subtime, result, contestid, title, point, url)
        return s
    }

    toSubmissions(results) {
        const subs = new submissions()
        for(const res of results){
            subs.add(this.resToSub(res))
        }
        return subs
    }
}


export class yukicoderClient extends client{
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

    resToSub(res) {
        const subtime = new Date(res['Date']).getTime();
        const result = "AC"
        const contestid = null
        const title = res['Title']
        const point =  res['Level']
        const url  = "https://yukicoder.me/"
        const s = new ycsubmit(subtime, result, contestid, title, point, url)
        return s
    }

    toSubmissions(results) {
        const subs = new submissions()
        for(const res of results){
            subs.add(this.resToSub(res))
        }
        return subs
    }
}
