import { Submit } from "../submit";
import { Status } from "../status";
import { Condition } from "../condition";

export class AtCoderCondition implements Condition {
  statuses: Status[];
  atcoder_lower_point: number;
  atcoder_upper_point: number;
  constructor(lower: number, upper: number, statuses: Status[]) {
    this.statuses = statuses;
    this.atcoder_lower_point = lower;
    this.atcoder_upper_point = upper;
  }

  acceptStatus(s: Submit) {
    return this.statuses
      .map((s) => s.status)
      .includes(s.result.status);
  }

  acceptPoint(s: Submit) {
    const p = s.getPoint();
    if (p === null) return false;
    return this.atcoder_lower_point <= p && p <= this.atcoder_upper_point;
  }

  accept(s: Submit) {
    return this.acceptPoint(s) && this.acceptStatus(s);
  }
}
