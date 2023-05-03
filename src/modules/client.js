import {submissions} from "./submit";

class client{}
export class acclient extends client{
    constructor(user) {
        super();
        this.user = user
        this.url = "https://kenkoooo.com/atcoder/atcoder-api/results?user=" + user
    }
    fetch() {
        return fetch(this.url).then((res) => {
            return res.json()
        })
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

export class cfclient extends client {
    constructor(user) {
        super();
        this.user = user
        this.url = "https://codeforces.com/api/user.status?handle=" + this.user + "&from=1&count=1000"
    }

    fetch() {
        return fetch(this.url).then((res) => {
            return res.json()
        })
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
