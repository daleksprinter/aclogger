import {AtCoderSubmit, Submissions} from "../modules/submit";
import {conditionsDTO, Conditions} from "../modules/condition";
import {sitefactory as sf} from "../modules/site";
import {statusfactory} from "../modules/status";

test("submissions add", () => {
    const s = new AtCoderSubmit(1683188344 * 1000, statusfactory.Accept(), "", "", 500, ""); //2023-05-04
    const submiss = new Submissions(null);
    submiss.add(s)
    expect(submiss.count(null)).toBe(1)
})

test("submissions count", () => {
    const s = new AtCoderSubmit(1683188344 * 1000, statusfactory.Accept(), "", "", 500, ""); //2023-05-04
    const submiss = new Submissions([s]);
    expect(submiss.count(sf.AtCoder())).toBe(1)
    expect(submiss.count(sf.Codeforces())).toBe(0)
})

test("submissions merge", () => {
    const s = new AtCoderSubmit(1683188344 * 1000, statusfactory.Accept(), "", "", 500, ""); //2023-05-04
    const submiss1 = new Submissions([s]);
    const submiss2 = new Submissions([s]);
    submiss1.merge(submiss2)
    expect(submiss1.count(sf.AtCoder())).toBe(2)
})

test("submissions filter", () => {
    const s = new AtCoderSubmit(1683188344 * 1000, statusfactory.Accept(), "", "", 500, ""); //2023-05-04
    const submiss = new Submissions([s]);

    const conddto = new conditionsDTO(1683188343 * 1000, 1683188345 * 1000, 0, 1000, [statusfactory.Accept()], 0, 1000, [], [], 1, 6, [])
    const conds = new Conditions(conddto)

    expect(submiss.filter(conds).length).toBe(1)

    const conddto2 = new conditionsDTO(0, 0, 0, 0, [], 0, 1000, [], [], 1, 6, [])
    const conds2 = new Conditions(conddto2)

    expect(submiss.filter(conds2).length).toBe(0)
})
