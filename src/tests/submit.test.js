import {acsubmit, submissions} from "../modules/submit";
import {conditionsDTO, Conditions} from "../modules/condition";

test("submissions add", () => {
    const s = new acsubmit(1683188344 * 1000, "", "", "", 500, ""); //2023-05-04
    const submiss = new submissions();
    submiss.add(s)
    expect(submiss.count()).toBe(1)
})

test("submissions count", () => {
    const s = new acsubmit(1683188344 * 1000, "", "", "", 500, ""); //2023-05-04
    const submiss = new submissions([s]);
    expect(submiss.count("AtCoder")).toBe(1)
    expect(submiss.count("Codeforces")).toBe(0)
})

test("submissions merge", () => {
    const s = new acsubmit(1683188344 * 1000, "", "", "", 500, ""); //2023-05-04
    const submiss1 = new submissions([s]);
    const submiss2 = new submissions([s]);
    submiss1.merge(submiss2)
    expect(submiss1.count("AtCoder")).toBe(2)
})

test("submissions filter", () => {
    const s = new acsubmit(1683188344 * 1000, "", "", "", 500, ""); //2023-05-04
    const submiss = new submissions([s]);

    const conddto = new conditionsDTO('2023-01-01', '2024-01-01', 0, 1000, [], 0, 1000, [], [], 1, 6, [])
    const conds = new Conditions(conddto)

    expect(submiss.filter(conds).length).toBe(1)

    const conddto2 = new conditionsDTO('2023-01-01', '2024-01-01', 0, 0, [], 0, 1000, [], [], 1, 6, [])
    const conds2 = new Conditions(conddto2)

    expect(submiss.filter(conds2).length).toBe(0)
})
