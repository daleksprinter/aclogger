import {Client} from "../client";
import {statusfactory} from "../status";
import {CodeforcesSubmit, Submissions} from "../submit";

export class CodeForcesClient implements Client {
  user: String;
  url: string;
  constructor(user: String) {
    this.user = user;
    this.url = `https://codeforces.com/api/user.status?handle=${this.user}&from=1&count=1000`;
  }

  fetch() {
    if (this.user !== "" && this.user !== undefined) {
      return fetch(this.url).then((res) => {
        return res.json();
      });
    } else {
      return Promise.resolve({ result: [] });
    }
  }

  getAllSubmissions() {
    return this.fetch().then((json) => {
      const subs = this.toSubmissions(json["result"]);
      return Promise.resolve(subs);
    });
  }

  parseResult = (res: string) => {
    if (res === "OK") return statusfactory.Accept();
    else if (res === "WRONG_ANSWER") return statusfactory.WrongAnswer();
    else if (res === "RUNTIME_ERROR") return statusfactory.RuntimeError();
    else if (res === "COMPILATION_ERROR") return statusfactory.CompileError();
    else if (res === "TIME_LIMIT_EXCEEDED")
      return statusfactory.TimeLimitEceeded();
    else if (res === "MEMORY_LIMIT_EXCEEDED")
      return statusfactory.MemoryLimitEceeded();
    else return statusfactory.Null();
  };

  resToSub(res: any) {
    const subtime = res["creationTimeSeconds"] * 1000;
    const result = this.parseResult(res["verdict"]);
    const contestid = res["problem"]["contestId"];
    const title = res["problem"]["index"] + ". " + res["problem"]["name"];
    const point = res["problem"]["rating"];
    const url = `https://codeforces.com/contest/${res["problem"]["contestId"]}/submission/${res["id"]}`;
    const sub = new CodeforcesSubmit(
      subtime,
      result,
      contestid,
      title,
      point,
      url
    );
    return sub;
  }

  toSubmissions(results: any) {
    const subs = new Submissions(null);
    for (const res of results) {
      subs.add(this.resToSub(res));
    }
    return subs;
  }
}
