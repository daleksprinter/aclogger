import {acsubmit, submissions} from "../modules/submit";

test("submissions add", () => {
    const s = new acsubmit(1683188344 * 1000, "", "", "", 500, ""); //2023-05-04
    const submiss = new submissions(); //2023-05-04
    submiss.add(s)
    expect(submiss.count()).toBe(1)
})

test("submissions count", () => {
    const s = new acsubmit(1683188344 * 1000, "", "", "", 500, ""); //2023-05-04
    const submiss = new submissions(); //2023-05-04
    submiss.add(s)
    expect(submiss.count("AtCoder")).toBe(1)
    expect(submiss.count("Codeforces")).toBe(0)
})
