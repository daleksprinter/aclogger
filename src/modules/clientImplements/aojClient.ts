import { Client } from "../client";
import { AOJSubmit, Submissions } from "../submit";
import {
  Accept,
  CompileError,
  RuntimeError,
  Unknown,
  WrongAnswer,
  TimeLimitExceeded,
  MemoryLimitExceeded,
} from "../status";

export class AizuOnlineJudgeClient implements Client {
  user: String;
  url: string;
  parser: aojResponseParser;
  constructor(user: String) {
    this.user = user;
    // @see http://developers.u-aizu.ac.jp/api?key=judgeapi%2Fsubmission_records%2Fusers%2F%7Buser_id%7D%3Fpage%3D%7Bpage%7D%26size%3D%7Bsize%7D_GET
    this.url = `https://judgeapi.u-aizu.ac.jp/submission_records/users/${this.user}?page=0&size=10000`;
    this.parser = new aojResponseParser();
  }
  private fetch() {
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
      const subs = this.parser.toSubmissions(json);
      return Promise.resolve(subs);
    });
  }
}

/* Response Sample
[
  {
    "judgeId": 3457091,
    "judgeType": 1,
    "userId": "daleksprinter",
    "problemId": "GRL_6_A",
    "submissionDate": 1554323123921,
    "language": "C++14",
    "status": 4,
    "cpuTime": 2,
    "memory": 3244,
    "codeSize": 3276,
    "accuracy": "40/40",
    "judgeDate": 1554323125391,
    "score": 100,
    "problemTitle": null,
    "token": null
  },
  {
    "judgeId": 3420430,
    "judgeType": 1,
    "userId": "daleksprinter",
    "problemId": "0598",
    "submissionDate": 1552207207112,
    "language": "C++14",
    "status": 4,
    "cpuTime": 5,
    "memory": 4220,
    "codeSize": 4681,
    "accuracy": "53/53",
    "judgeDate": 1552207209275,
    "score": 0,
    "problemTitle": null,
    "token": null
  },
  {
    "judgeId": 3420427,
    "judgeType": 1,
    "userId": "daleksprinter",
    "problemId": "0598",
    "submissionDate": 1552206962165,
    "language": "C++14",
    "status": 1,
    "cpuTime": 0,
    "memory": 3256,
    "codeSize": 4681,
    "accuracy": "5/53",
    "judgeDate": 1552206963114,
    "score": 0,
    "problemTitle": null,
    "token": null
  }
]
*/

class aojResponseParser {
  private parseResult = (res: number) => {
    if (res === 4) return new Accept();
    else if (res === 1) return new WrongAnswer();
    else if (res === 7) return new RuntimeError();
    else if (res === 0) return new CompileError();
    else if (res === 2) return new TimeLimitExceeded();
    else if (res === 3) return new MemoryLimitExceeded();
    else return new Unknown();
  };
  private resToSub(res: any) {
    const subtime = res["submissionDate"];
    const result = this.parseResult(res["status"]);
    const contestid = "";
    const title = res["problemId"];
    const point = 0;
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
