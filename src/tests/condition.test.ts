import {
    AizuOnlineJudgeCondition,
    AtCoderCondition,
    CodeforcesCondition, Conditions, conditionsDTO,
    SubmissionDateCondition,
    yukiconderCondition
} from "../modules/condition";
import {AtCoderSubmit, AOJSubmit, CodeforcesSubmit, yukicoderSubmit} from "../modules/submit";
import {statusfactory} from "../modules/status";

test("submission date condition", () => {
    const s = new AtCoderSubmit(1683188344 * 1000, statusfactory.Accept(), null, "", null, ""); //2023-05-04
    expect(new SubmissionDateCondition(1683188343 * 1000, 1683188345 * 1000).accept(s)).toBe(true)
    expect(new SubmissionDateCondition(0, 0).accept(s)).toBe(false)
    expect(new SubmissionDateCondition(0, 0).accept(s)).toBe(false)
})

test("atcoder condition", () => {
    const s = new AtCoderSubmit(1683188344 * 1000, statusfactory.Accept(), "", "", 500, ""); //2023-05-04
    expect(new AtCoderCondition(0, 1000, []).acceptPoint(s)).toBe(true)
    expect(new AtCoderCondition(0, 100, []).acceptPoint(s)).toBe(false)
    expect(new AtCoderCondition(1000, 2000, []).acceptPoint(s)).toBe(false)

    expect(new AtCoderCondition(0, 0, [statusfactory.Accept()]).acceptStatus(s)).toBe(true)
})

test("codeforces condition", () => {
    const s = new CodeforcesSubmit(1683188344 * 1000, statusfactory.Accept(), "", "", 500, ""); //2023-05-04
    expect(new CodeforcesCondition(0, 1000, []).acceptPoint(s)).toBe(true)
    expect(new CodeforcesCondition(0, 100, []).acceptPoint(s)).toBe(false)
    expect(new CodeforcesCondition(1000, 2000, []).acceptPoint(s)).toBe(false)


    expect(new CodeforcesCondition(0, 0, [statusfactory.Accept()]).acceptStatus(s)).toBe(true)
})

test("aoj condition", () => {
    const s = new AOJSubmit(1683188344 * 1000, statusfactory.Accept(), "", "", null, ""); //2023-05-04
    expect(new AizuOnlineJudgeCondition([statusfactory.Accept()]).acceptStatus(s)).toBe(true)
})

test("yukicoder condition", () => {
    const s = new yukicoderSubmit(1683188344 * 1000, statusfactory.Accept(), "", "", 3, ""); //2023-05-04
    expect(new yukiconderCondition(1, 6).accept(s)).toBe(true)
    expect(new yukiconderCondition(1, 2).accept(s)).toBe(false)
    expect(new yukiconderCondition(5, 6).accept(s)).toBe(false)
})

test("conditions", () => {
    let s = new CodeforcesSubmit(1683188344 * 1000, statusfactory.Accept(), "", "", 500, ""); //2023-05-04
    let conddto = new conditionsDTO(1683188343 * 1000, 1683188345 * 1000, 0, 1000, [], 0, 1000, [statusfactory.Accept()], [], 1, 6)
    let conds = new Conditions(conddto)
    expect(conds.accept(s)).toBe(true)


    s = new CodeforcesSubmit(1683188344 * 1000, statusfactory.Accept(), "", "", 500, ""); //2023-05-04
    conddto = new conditionsDTO(0, 0, 0, 0, [], 0, 1000, [statusfactory.Accept()], [], 1, 6)
    conds = new Conditions(conddto)
    expect(conds.accept(s)).toBe(false)

    s = new CodeforcesSubmit(1683188344 * 1000, statusfactory.Accept(), "", "", 500, ""); //2023-05-04
    conddto = new conditionsDTO(0, 0, 0, 1000, [], 600, 1000, [statusfactory.Accept()], [], 1, 6)
    conds = new Conditions(conddto)
    expect(conds.accept(s)).toBe(false)
})
