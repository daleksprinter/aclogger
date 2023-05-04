import {SubmissionDateCondition} from "../modules/condition";
import {acsubmit} from "../modules/submit";

test("submission date condition", () => {
    const s = new acsubmit(1683188344 * 1000); //2023-05-04
    expect(new SubmissionDateCondition('2022-10-10', '2024-10-10').accept(s)).toBe(true)
    expect(new SubmissionDateCondition('2020-10-10', '2022-10-10').accept(s)).toBe(false)
    expect(new SubmissionDateCondition('2025-10-10', '2026-10-10').accept(s)).toBe(false)
})
