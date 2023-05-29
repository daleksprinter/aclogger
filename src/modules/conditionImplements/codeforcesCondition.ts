import { Condition } from "../condition";
import { Status } from "../status";
import { Submit } from "../submit";

export class CodeforcesCondition implements Condition {
  statuses: Status[];
  codeforces_lower_point: number;
  codeforces_upper_point: number;

  constructor(lower: number, upper: number, statuses: Status[]) {
    this.statuses = statuses;
    this.codeforces_lower_point = lower;
    this.codeforces_upper_point = upper;
  }
  acceptStatus(s: Submit) {
    return this.statuses
      .map((s) => s.status)
      .includes(s.result.status);
  }
  acceptPoint(s: Submit): boolean {
    const p = s.getPoint();
    if (p === null) return false;
    return this.codeforces_lower_point <= p && p <= this.codeforces_upper_point;
  }

  accept(s: Submit) {
    return this.acceptPoint(s) && this.acceptStatus(s);
  }
}
