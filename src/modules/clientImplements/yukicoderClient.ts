import { Submissions, yukicoderSubmit } from "../submit";
import { Client } from "../client";
import {Accept} from "../status";

export class yukicoderClient implements Client {
  user: String;
  url: string;
  parser: yukicoderResponseParser;
  constructor(user: String) {
    this.user = user;
    // @see https://petstore.swagger.io/?url=https://yukicoder.me/api/swagger.yaml#/user/get_v1_solved__param___user_
    this.url = `https://yukicoder.me/api/v1/solved/name/${this.user}`;
    this.parser = new yukicoderResponseParser();
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
    "No": 1,
    "ProblemId": 17,
    "Title": "道のショートカット",
    "AuthorId": 10,
    "TesterIds": "",
    "Level": 3,
    "ProblemType": 0,
    "Tags": "動的計画法",
    "Date": "2018-09-20T13:51:28+09:00"
  },
  {
    "No": 3,
    "ProblemId": 11,
    "Title": "ビットすごろく",
    "AuthorId": 10,
    "TesterIds": "",
    "Level": 2,
    "ProblemType": 0,
    "Tags": "幅優先探索",
    "Date": "2018-08-12T09:44:19+09:00"
  },
  {
    "No": 4,
    "ProblemId": 19,
    "Title": "おもりと天秤",
    "AuthorId": 10,
    "TesterIds": "",
    "Level": 2.5,
    "ProblemType": 0,
    "Tags": "動的計画法",
    "Date": "2018-09-02T00:56:10+09:00"
  }
]
*/

class yukicoderResponseParser {
  private resToSub(res: any) {
    const subtime = new Date(res["Date"]).getTime();
    const result = new Accept();
    const contestid = "";
    const title = res["Title"];
    const point = res["Level"];
    const url = `https://yukicoder.me/`;
    const s = new yukicoderSubmit(
      subtime,
      result,
      contestid,
      title,
      point,
      url
    );
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
