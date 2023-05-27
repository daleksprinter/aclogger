import {
  Submissions,
} from "./submit";

export interface Client {
  getAllSubmissions(): Promise<Submissions>
}
export class Clients {
  clients : Client[]
  constructor() {
    this.clients = [];
  }

  add(c: Client) {
    this.clients.push(c)
  }

  fetch() {
    return Promise.all(this.clients.map(c => c.getAllSubmissions()))
      .then((res) => {
        return res.reduce(
          (accum, subs) => accum.merge(subs),
          new Submissions(null)
        );
      });
  }
}
