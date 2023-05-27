import { statusfactory } from "../status";
import { AtCoderSubmit, Submissions } from "../submit";
import { Client } from "../client";

export class AtCoderClient implements Client {
  user: String;
  url: string;
  constructor(user: String) {
    this.user = user;
    this.url = `https://kenkoooo.com/atcoder/atcoder-api/results?user=${user}`;
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

  parseResult = (res: string) => {
    if (res === "AC") return statusfactory.Accept();
    else if (res === "WA") return statusfactory.WrongAnswer();
    else if (res === "RE") return statusfactory.RuntimeError();
    else if (res === "CE") return statusfactory.CompileError();
    else if (res === "IE") return statusfactory.InternalError();
    else if (res === "TLE") return statusfactory.TimeLimitEceeded();
    else if (res === "MLE") return statusfactory.MemoryLimitEceeded();
    else if (res === "OLE") return statusfactory.OutputLimitEceeded();
    else return statusfactory.Null();
  };

  resToSub(res: any) {
    const subtime = res["epoch_second"] * 1000;
    const result = this.parseResult(res["result"]);
    const contestid = res["contest_id"].toUpperCase();
    const title = res["problem_id"];
    const point = res["point"];
    const url = `https://atcoder.jp/contests/${res["contest_id"]}/submissions/${res["id"]}`;

    const s = new AtCoderSubmit(subtime, result, contestid, title, point, url);
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
