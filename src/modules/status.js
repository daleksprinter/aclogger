const Accept = "Accept"
const WrongAnswer = "WrongAnswer"
const TimeLimitExceeded = "TimeLImitEcceded"
const MemoryLimitEceeded = "MemoryLimitEceeded"
const OutputLimitEceeded = "OutputLimitEceeded"
const RuntimeError = "RuntimeError"
const CompileError = "CompileError"
const InternalError = "InternalError"
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
}

export const statusfactory = new StatusFactory()
