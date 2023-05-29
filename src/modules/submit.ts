import { getdate } from "./utils";
import { Status } from "./status";
import { Conditions } from "./condition";
import {AOJ, AtCoder, Codeforces, Site, Unknown, yukicoder} from "./site";

export abstract class Submit {
  timestamp: number;
  result: Status;
  contest: String ;
  title: String;
  point: number;
  url: string;
  site: Site;
  constructor(
    timestamp: number,
    result: Status,
    contest: String,
    title: String,
    point: number,
    url: string
  ) {
    this.timestamp = timestamp;
    this.result = result;
    this.contest = contest;
    this.title = title;
    this.point = point;
    this.url = url;
    this.site = new Unknown();
  }

  getDateString() {
    return getdate(this.timestamp);
  }
}

export class AtCoderSubmit extends Submit {
  site = new AtCoder();
}
export class CodeforcesSubmit extends Submit {
  site = new Codeforces();
}
export class AOJSubmit extends Submit {
  site = new AOJ();
}
export class yukicoderSubmit extends Submit {
  site = new yukicoder();
}

export class Submissions {
  subs: Submit[];
  constructor(subs: Submit[] | null) {
    this.subs = subs ? subs : [];
  }

  add(submission: Submit) {
    this.subs.push(submission);
  }

  count(site: Site | null) {
    if (site)
      return this.getAll().filter((sub) => sub.site.site == site.site).length;
    return this.getAll().length;
  }

  getAll() {
    return this.subs;
  }

  merge(submissions: Submissions) {
    submissions.getAll().map((sub) => {
      this.add(sub);
    });
    return this;
  }

  filter(conditions: Conditions) {
    return this.getAll().filter((sub) => {
      return conditions.accept(sub);
    });
  }
}
