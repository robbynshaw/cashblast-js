import yaml from "js-yaml"
import path from "path"
import { HasID } from "../models/HasID"
import { findFilesByType, readYamlFrontMatter } from "./fileUtil"

export async function parseYamlFilesByType<T extends HasID>(
  rootDir: string,
  typeName: string
): Promise<T[]> {
  const files: string[] = await findFilesByType(rootDir, typeName)
  const models: T[] = await Promise.all(
    files.map(async (file) => {
      const yamlLines: string = await readYamlFrontMatter(file)
      const result = yaml.load(yamlLines) as T
      result.id = path.relative(rootDir, file)
      return result
    })
  )

  return models
}
