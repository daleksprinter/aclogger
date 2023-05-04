import {
    AizuOnlineJudgeCondition,
    AtCoderCondition,
    CodeforcesCondition, Conditions, conditionsDTO,
    SubmissionDateCondition,
    yukiconderCondition
} from "../modules/condition";
import {acsubmit, aojsubmit, cfsubmit, ycsubmit} from "../modules/submit";

test("submission date condition", () => {
    const s = new acsubmit(1683188344 * 1000); //2023-05-04
    expect(new SubmissionDateCondition('2022-10-10', '2024-10-10').accept(s)).toBe(true)
    expect(new SubmissionDateCondition('2020-10-10', '2022-10-10').accept(s)).toBe(false)
    expect(new SubmissionDateCondition('2025-10-10', '2026-10-10').accept(s)).toBe(false)
})

test("atcoder condition", () => {
    const s = new acsubmit(1683188344 * 1000, "", "", "", 500, ""); //2023-05-04
    expect(new AtCoderCondition(0, 1000, []).accept(s)).toBe(true)
    expect(new AtCoderCondition(0, 100, []).accept(s)).toBe(false)
    expect(new AtCoderCondition(1000, 2000, []).accept(s)).toBe(false)
})

test("codeforces condition", () => {
    const s = new cfsubmit(1683188344 * 1000, "", "", "", 500, ""); //2023-05-04
    expect(new CodeforcesCondition(0, 1000, []).accept(s)).toBe(true)
    expect(new CodeforcesCondition(0, 100, []).accept(s)).toBe(false)
    expect(new CodeforcesCondition(1000, 2000, []).accept(s)).toBe(false)
})

test("aoj condition", () => {
    const s = new aojsubmit(1683188344 * 1000, "", "", "", null, ""); //2023-05-04
    expect(new AizuOnlineJudgeCondition([]).accept(s)).toBe(true)
})

test("yukicoder condition", () => {
    const s = new ycsubmit(1683188344 * 1000, "", "", "", 3, ""); //2023-05-04
    expect(new yukiconderCondition(1, 6, []).accept(s)).toBe(true)
    expect(new yukiconderCondition(1, 2, []).accept(s)).toBe(false)
    expect(new yukiconderCondition(5, 6, []).accept(s)).toBe(false)
})

test("conditions", () => {
    let s = new cfsubmit(1683188344 * 1000, "", "", "", 500, ""); //2023-05-04
    let conddto = new conditionsDTO('2023-01-01', '2024-01-01', 0, 1000, [], 0, 1000, [], [], 1, 6, [])
    let conds = new Conditions(conddto)
    expect(conds.accept(s)).toBe(true)


    s = new cfsubmit(1683188344 * 1000, "", "", "", 500, ""); //2023-05-04
    conddto = new conditionsDTO('2023-12-01', '2024-01-01', 0, 1000, [], 0, 1000, [], [], 1, 6, [])
    conds = new Conditions(conddto)
    expect(conds.accept(s)).toBe(false)

    s = new cfsubmit(1683188344 * 1000, "", "", "", 500, ""); //2023-05-04
    conddto = new conditionsDTO('2023-12-01', '2024-01-01', 0, 1000, [], 600, 1000, [], [], 1, 6, [])
    conds = new Conditions(conddto)
    expect(conds.accept(s)).toBe(false)
})
