import { Account } from "../../models/Account"
import { AccountRepo } from "../AccountRepo"

export class MarkdownAccountRepo implements AccountRepo {
  public getAll(): Account[] {
    return []
  }
}
