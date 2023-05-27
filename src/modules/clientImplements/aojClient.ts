import { Client } from "../client";
import { statusfactory } from "../status";
import { AOJSubmit, Submissions } from "../submit";

export class AizuOnlineJudgeClient implements Client {
  user: String;
  url: string;
  constructor(user: String) {
    this.user = user;
    this.url = `https://judgeapi.u-aizu.ac.jp/submission_records/users/${this.user}?page=0&size=10000`;
  }
  fetch() {
    if (this.user !== "" && this.user !== undefined) {
      return fetch(this.url).then((res) => {
        return res.json();
      });
    } else {
      return Promise.resolve([]);
    }
  }

  getAllSubmissions() {
    return this.fetch().then((json) => {
      const subs = this.toSubmissions(json);
      return Promise.resolve(subs);
    });
  }

  parseResult = (res: number) => {
    if (res === 4) return statusfactory.Accept();
    else if (res === 1) return statusfactory.WrongAnswer();
    else if (res === 7) return statusfactory.RuntimeError();
    else if (res === 0) return statusfactory.CompileError();
    else if (res === 2) return statusfactory.TimeLimitEceeded();
    else if (res === 3) return statusfactory.MemoryLimitEceeded();
    else return statusfactory.Null();
  };
  resToSub(res: any) {
    const subtime = res["submissionDate"];
    const result = this.parseResult(res["status"]);
    const contestid = null;
    const title = res["problemId"];
    const point = null;
    const url = `http://judge.u-aizu.ac.jp/onlinejudge/review.jsp?rid=${res["judgeId"]}`;
    const s = new AOJSubmit(subtime, result, contestid, title, point, url);
    return s;
  }

  toSubmissions(results: any) {
    const subs = new Submissions(null);
    for (const res of results) {
      subs.add(this.resToSub(res));
    }
    return subs;
  }
}
