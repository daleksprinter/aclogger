import {Condition} from "../condition";
import {Submit} from "../submit";

export class yukiconderCondition implements Condition {
  yukicoder_lower_point: number;
  yukicoder_upper_point: number;

  constructor(lower: number, upper: number) {
    this.yukicoder_lower_point = lower;
    this.yukicoder_upper_point = upper;
  }

  acceptPoint(s: Submit): boolean {
    const p = s.getPoint();
    if (p === null) return false;
    return this.yukicoder_lower_point <= p && p <= this.yukicoder_upper_point;
  }

  accept(s: Submit) {
    return this.acceptPoint(s);
  }
}
