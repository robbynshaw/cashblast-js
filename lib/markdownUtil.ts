import { markdownTable } from "markdown-table"
import yaml from "js-yaml"
import path from "path"
import { HasID } from "../models/HasID.js"
import { findFilesByType, readYamlFrontMatter } from "./fileUtil.js"
import { BalancedTransaction } from "../models/BalancedTransaction.js"
import moment from "moment"

export async function parseYamlFilesByType<T extends HasID>(
  rootDir: string,
  typeName: string
): Promise<T[]> {
  const files: string[] = await findFilesByType(rootDir, typeName)
  const models: T[] = await Promise.all(
    files.map(async (file) => {
      const yamlLines: string = await readYamlFrontMatter(file)
      const result = yaml.load(yamlLines) as T
      result.id = file
      return result
    })
  )

  return models
}

export function convertToAbsolutePath(
  fileId: string,
  refId: string | undefined
): string | undefined {
  if (!refId) {
    return undefined
  }
  return path.resolve(path.dirname(fileId), refId)
}

export const createMarkdownTable = (transactions: BalancedTransaction[]) => {
  const table: string = markdownTable([
    ["DATE", "NAME", "VALUE", "BALANCE"],
    ...transactions.map((t) => {
      const { balance, transaction } = t
      const { date, name, value } = transaction
      return [
        moment(date).toString(),
        name,
        value.toFixed(2),
        balance.toFixed(2),
      ]
    }),
  ])
}
