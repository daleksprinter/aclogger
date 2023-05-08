const Accept = "AC"
const WrongAnswer = "WA"
const TimeLimitExceeded = "TLE"
const MemoryLimitEceeded = "MLE"
const OutputLimitEceeded = "OLE"
const RuntimeError = "RE"
const CompileError = "CE"
const InternalError = "IE"
class Status {
    constructor(status) {
        this.status = status
    }

    getStatus() {
        return this.status
    }

    isSame(status) {
        return this.getStatus() === status.getStatus()
    }
}

class StatusFactory {
    Accept() {return new Status(Accept)}
    WrongAnswer() {return new Status(WrongAnswer)}
    TimeLimitEceeded() {return new Status(TimeLimitExceeded)}
    MemoryLimitEceeded() {return new Status(MemoryLimitEceeded)}
    OutputLimitEceeded() {return new Status(OutputLimitEceeded)}
    RuntimeError() {return new Status(RuntimeError)}
    CompileError() {return new Status(CompileError)}
    InternalError() {return new Status(InternalError)}
    Null() {return new Status("")}
}

export const statusfactory = new StatusFactory()
