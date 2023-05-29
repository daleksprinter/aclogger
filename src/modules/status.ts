export interface Status {
  status: string;
}

export class Accept implements Status {
  status: string = "AC";
}

export class WrongAnswer implements Status {
  status: string = "WA";
}

export class TimeLimitExceeded implements Status {
  status: string = "TLE";
}

export class MemoryLimitExceeded implements Status {
  status: string = "MLE";
}
export class OutputLimitExceeded implements Status {
  status: string = "OLE";
}

export class RuntimeError implements Status {
  status: string = "RE";
}

export class CompileError implements Status {
  status: string = "CE";
}

export class InternalError implements Status {
  status: string = "IE";
}

export class Unknown implements Status {
  status: string = "Unknown";
}

export function StatusFactory(status: string): Status {
  switch (status) {
    case "AC":
      return new Accept();
    case "WA":
      return new WrongAnswer();
    case "TLE":
      return new TimeLimitExceeded();
    case "MLE":
      return new MemoryLimitExceeded();
    case "OLE":
      return new OutputLimitExceeded();
    case "RE":
      return new RuntimeError();
    case "CE":
      return new CompileError();
    case "IE":
      return new InternalError();
    default:
      return new Unknown();
  }
}
