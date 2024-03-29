import { Submit } from "./submit";
import { Status } from "./status";
import { SubmissionDateCondition } from "./conditionImplements/submissionDateCondition";
import { AtCoderCondition } from "./conditionImplements/atcoderCondition";
import { CodeforcesCondition } from "./conditionImplements/codeforcesCondition";
import { AizuOnlineJudgeCondition } from "./conditionImplements/aojCondition";
import { yukiconderCondition } from "./conditionImplements/yukicoderCondition";
import { AOJ, AtCoder, Codeforces, yukicoder } from "./site";

export class conditionsDTO {
  from_date: number;
  to_date: number;
  atcoder_lower_point: number;
  atcoder_upper_point: number;
  atcoder_status: Status[];
  codeforces_lower_point: number;
  codeforces_upper_point: number;
  codeforces_status: Status[];
  aoj_status: Status[];
  yukicoder_lower_point: number;
  yukiconder_upper_point: number;

  constructor(
    from_date: number,
    to_date: number,
    atocder_lower_point: number,
    atcoder_upper_point: number,
    atcoder_status: Status[],
    codeforces_lower_point: number,
    codeforces_upper_point: number,
    codeforces_status: Status[],
    aoj_status: Status[],
    yukicoder_lower_point: number,
    yukiconder_upper_point: number
  ) {
    this.from_date = from_date;
    this.to_date = to_date;
    this.atcoder_lower_point = atocder_lower_point;
    this.atcoder_upper_point = atcoder_upper_point;
    this.atcoder_status = atcoder_status;
    this.codeforces_lower_point = codeforces_lower_point;
    this.codeforces_upper_point = codeforces_upper_point;
    this.codeforces_status = codeforces_status;
    this.aoj_status = aoj_status;
    this.yukicoder_lower_point = yukicoder_lower_point;
    this.yukiconder_upper_point = yukiconder_upper_point;
  }
}

export class Conditions {
  baseConditions: Condition[];
  accond: Condition;
  cfcond: Condition;
  aojcond: Condition;
  ycond: Condition;
  constructor(conddto: conditionsDTO) {
    this.baseConditions = [
      new SubmissionDateCondition(conddto.from_date, conddto.to_date),
    ];
    this.accond = new AtCoderCondition(
      conddto.atcoder_lower_point,
      conddto.atcoder_upper_point,
      conddto.atcoder_status
    );
    this.cfcond = new CodeforcesCondition(
      conddto.codeforces_lower_point,
      conddto.codeforces_upper_point,
      conddto.codeforces_status
    );
    this.aojcond = new AizuOnlineJudgeCondition(conddto.aoj_status);
    this.ycond = new yukiconderCondition(
      conddto.yukicoder_lower_point,
      conddto.yukiconder_upper_point
    );
  }

  accept(submission: Submit) {
    for (const c of this.baseConditions)
      if (!c.accept(submission)) return false;
    if (submission.site.site === new AtCoder().site)
      return this.accond.accept(submission);
    if (submission.site.site === new Codeforces().site)
      return this.cfcond.accept(submission);
    if (submission.site.site === new AOJ().site)
      return this.aojcond.accept(submission);
    if (submission.site.site === new yukicoder().site)
      return this.ycond.accept(submission);
    return false;
  }
}

export interface Condition {
  accept(sub: Submit): boolean;
}
