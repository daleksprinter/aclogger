import { Client } from "../client";
import { statusfactory } from "../status";
import { CodeforcesSubmit, Submissions } from "../submit";

export class CodeForcesClient implements Client {
  user: String;
  url: string;
  parser: codeforcesResponseParser;
  constructor(user: String) {
    this.user = user;
    // @see https://codeforces.com/apiHelp/methods#user.status
    this.url = `https://codeforces.com/api/user.status?handle=${this.user}&from=1&count=1000`;
    this.parser = new codeforcesResponseParser();
  }

  private fetch() {
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
      const subs = this.parser.toSubmissions(json["result"]);
      return Promise.resolve(subs);
    });
  }
}

/* Response Sample
{
  "status": "OK",
  "result": [
    {
      "id": 53189999,
      "contestId": 1155,
      "creationTimeSeconds": 1556022214,
      "relativeTimeSeconds": 2147483647,
      "problem": {
        "contestId": 1155,
        "index": "C",
        "name": "Alarm Clocks Everywhere",
        "type": "PROGRAMMING",
        "rating": 1300,
        "tags": [
          "math",
          "number theory"
        ]
      },
      "author": {
        "contestId": 1155,
        "members": [
          {
            "handle": "b1015120"
          }
        ],
        "participantType": "PRACTICE",
        "ghost": false,
        "startTimeSeconds": 1555943700
      },
      "programmingLanguage": "GNU C++17",
      "verdict": "WRONG_ANSWER",
      "testset": "TESTS",
      "passedTestCount": 0,
      "timeConsumedMillis": 0,
      "memoryConsumedBytes": 0
    },
    {
      "id": 53189920,
      "contestId": 1155,
      "creationTimeSeconds": 1556022097,
      "relativeTimeSeconds": 2147483647,
      "problem": {
        "contestId": 1155,
        "index": "C",
        "name": "Alarm Clocks Everywhere",
        "type": "PROGRAMMING",
        "rating": 1300,
        "tags": [
          "math",
          "number theory"
        ]
      },
      "author": {
        "contestId": 1155,
        "members": [
          {
            "handle": "b1015120"
          }
        ],
        "participantType": "PRACTICE",
        "ghost": false,
        "startTimeSeconds": 1555943700
      },
      "programmingLanguage": "GNU C++17",
      "verdict": "WRONG_ANSWER",
      "testset": "TESTS",
      "passedTestCount": 0,
      "timeConsumedMillis": 15,
      "memoryConsumedBytes": 0
    },
    {
      "id": 53189873,
      "contestId": 1155,
      "creationTimeSeconds": 1556022023,
      "relativeTimeSeconds": 2147483647,
      "problem": {
        "contestId": 1155,
        "index": "C",
        "name": "Alarm Clocks Everywhere",
        "type": "PROGRAMMING",
        "rating": 1300,
        "tags": [
          "math",
          "number theory"
        ]
      },
      "author": {
        "contestId": 1155,
        "members": [
          {
            "handle": "b1015120"
          }
        ],
        "participantType": "PRACTICE",
        "ghost": false,
        "startTimeSeconds": 1555943700
      },
      "programmingLanguage": "GNU C++14",
      "verdict": "WRONG_ANSWER",
      "testset": "TESTS",
      "passedTestCount": 0,
      "timeConsumedMillis": 15,
      "memoryConsumedBytes": 0
    }
  ]
}
*/

class codeforcesResponseParser {
  private parseResult = (res: string) => {
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

  private resToSub(res: any) {
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
