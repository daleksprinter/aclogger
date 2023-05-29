import { getdate } from "./utils";
import { Status } from "./status";
import { Conditions } from "./condition";
import {AOJ, AtCoder, Codeforces, Site, yukicoder} from "./site";

export abstract class Submit {
  timestamp: number;
  result: Status;
  contest: String | null;
  title: String;
  point: number | null;
  url: string;
  constructor(
    timestamp: number,
    result: Status,
    contest: String | null,
    title: String,
    point: number | null,
    url: string
  ) {
    this.timestamp = timestamp;
    this.result = result;
    this.contest = contest;
    this.title = title;
    this.point = point;
    this.url = url;
  }

  getPoint() {
    return this.point;
  }

  getDateString() {
    return getdate(this.timestamp);
  }

  getDate() {
    return new Date(this.timestamp);
  }

  abstract getSite(): Site;
}

export class AtCoderSubmit extends Submit {
  getSite() {
    return new AtCoder();
  }
}
export class CodeforcesSubmit extends Submit {
  getSite() {
    return new Codeforces();
  }
}
export class AOJSubmit extends Submit {
  getSite() {
    return new AOJ();
  }
}
export class yukicoderSubmit extends Submit {
  getSite() {
    return new yukicoder();
  }
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
      return this.getAll().filter((sub) => sub.getSite().site == site.site).length;
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
