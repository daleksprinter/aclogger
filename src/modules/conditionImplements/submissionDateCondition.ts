import { Submit } from "../submit";
import { Condition } from "../condition";

export class SubmissionDateCondition implements Condition {
  submit_from: any;
  submit_to: any;
  constructor(from: number, to: number) {
    if (!this.isvalid(from, to)) throw Error("date condition is not invalid");
    this.submit_from = new Date(from);
    this.submit_to = new Date(to);
  }

  isvalid(from: number, to: number) {
    // TODO implement
    return true;
  }
  accept(sub: Submit) {
    return (
      this.submit_from.getTime() < sub.timestamp &&
      sub.timestamp <= this.submit_to.getTime()
    );
  }
}
