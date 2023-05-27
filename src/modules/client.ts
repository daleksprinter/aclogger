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

  fetch(callback: any) {
    return Promise.all(this.clients.map(c => c.getAllSubmissions()))
      .then((res) => {
        const s = res.reduce(
          (accum, subs) => accum.merge(subs),
          new Submissions(null)
        );
        callback(s);
      });
  }
}
