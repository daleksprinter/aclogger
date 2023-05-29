import { Condition } from "../condition";
import { Status } from "../status";
import { Submit } from "../submit";

export class AizuOnlineJudgeCondition implements Condition {
  statuses: Status[];
  constructor(statuses: Status[]) {
    this.statuses = statuses;
  }

  acceptStatus(s: Submit) {
    return this.statuses
      .map((s) => s.status)
      .includes(s.getResult().status);
  }

  accept(s: Submit) {
    return this.acceptStatus(s);
  }
}
