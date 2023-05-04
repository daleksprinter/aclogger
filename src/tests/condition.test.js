import {SubmissionDateCondition} from "../modules/condition";
import {acsubmit} from "../modules/submit";

test("submission date condition", () => {
    const s = new acsubmit();
    expect(new SubmissionDateCondition('2022-10-10', '2023-10-10').accept(s)).toBe(true)
})
