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
