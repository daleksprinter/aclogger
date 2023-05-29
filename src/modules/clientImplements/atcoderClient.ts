import { AtCoderSubmit, Submissions } from "../submit";
import { Client } from "../client";
import {
  Accept,
  CompileError,
  InternalError,
  MemoryLimitExceeded,
  OutputLimitExceeded, RuntimeError,
  TimeLimitExceeded,
  Unknown, WrongAnswer
} from "../status";

export class AtCoderClient implements Client {
  user: String;
  url: string;
  parser: atcoderResponseParser;
  constructor(user: String) {
    this.user = user;
    // @see https://github.com/kenkoooo/AtCoderProblems/blob/master/doc/api.md#deprecated-user-submissions
    this.url = `https://kenkoooo.com/atcoder/atcoder-api/results?user=${user}`;
    this.parser = new atcoderResponseParser();
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
    "id": 4000770,
    "epoch_second": 1547381417,
    "problem_id": "keyence2019_b",
    "contest_id": "keyence2019",
    "user_id": "daleksprinter",
    "language": "C++14 (GCC 5.4.1)",
    "point": 0,
    "length": 2373,
    "result": "WA",
    "execution_time": 2
  },
  {
    "id": 2754160,
    "epoch_second": 1530203077,
    "problem_id": "abc064_b",
    "contest_id": "abc064",
    "user_id": "daleksprinter",
    "language": "Python2 (2.7.6)",
    "point": 200,
    "length": 79,
    "result": "AC",
    "execution_time": 10
  },
  {
    "id": 3015581,
    "epoch_second": 1534403523,
    "problem_id": "agc003_b",
    "contest_id": "agc003",
    "user_id": "daleksprinter",
    "language": "Python2 (2.7.6)",
    "point": 400,
    "length": 229,
    "result": "AC",
    "execution_time": 754
  }
]
*/

class atcoderResponseParser {
  private parseResult = (res: string) => {
    if (res === "AC") return new Accept();
    else if (res === "WA") return new WrongAnswer();
    else if (res === "RE") return new RuntimeError();
    else if (res === "CE") return new CompileError();
    else if (res === "IE") return new InternalError();
    else if (res === "TLE") return new TimeLimitExceeded();
    else if (res === "MLE") return new MemoryLimitExceeded();
    else if (res === "OLE") return new OutputLimitExceeded();
    else return new Unknown();
  };

  private resToSub(res: any) {
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
