import {statusfactory} from "../status";
import {Submissions, yukicoderSubmit} from "../submit";

interface Client {
}

export class yukicoderClient implements Client {
  user: String;
  url: string;
  constructor(user: String) {
    this.user = user;
    this.url = `https://yukicoder.me/api/v1/solved/name/${this.user}`;
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

  resToSub(res: any) {
    const subtime = new Date(res["Date"]).getTime();
    const result = statusfactory.Accept();
    const contestid = null;
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
