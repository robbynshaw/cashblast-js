import { createReadStream } from "fs"
import { readdir, writeFile } from "fs/promises"
import { dump } from "js-yaml"
import { resolve } from "path"
import { createInterface } from "readline"

interface FileResult {
  path: string
  type: string
}

export const findFilesByType = async (
  root: string,
  type: string
): Promise<string[]> => {
  const lowerType = type.toLowerCase()
  const files: string[] = await getFilesRecursive(root)
  const results: FileResult[] = await Promise.all(
    files.map(async (file) => ({
      path: file,
      type: await readFileType(file),
    }))
  )

  return results
    .filter(({ path, type }) => type.toLowerCase() === lowerType)
    .map((result) => result.path)
}

export const readFileType = async (path: string): Promise<string> => {
  let markersCount: number = 0
  let linesCount: number = 0
  let result: string = "NONE"

  const rl = createInterface({
    input: createReadStream(path),
    crlfDelay: Infinity,
  })

  for await (const line of rl) {
    linesCount++
    if (line === "---") {
      markersCount++
    } else if (markersCount === 1 && line.startsWith("data_type:")) {
      result = line.substring("data_type:".length).trim() || "NONE"
    }
    if (markersCount === 2) {
      break
    }
    if (markersCount === 0 && linesCount > 5) {
      break
    }
  }

  return result
}

export const readYamlFrontMatter = async (path: string): Promise<string> => {
  let markersCount: number = 0
  const results: string[] = []
  const rl = createInterface({
    input: createReadStream(path),
    crlfDelay: Infinity,
  })

  for await (const line of rl) {
    if (line === "---") {
      markersCount++
    } else if (markersCount === 1) {
      results.push(line)
    }
    if (markersCount === 2) {
      break
    }
  }

  return results.join("\n")
}

export const writeAsYamlFrontMatter = async (
  obj: any,
  path: string
): Promise<void> => {
  const result: string = `---
${dump(obj)}
---`
  await writeFile(path, result)
}

const getFilesRecursive = async (dir: string): Promise<string[]> => {
  const dirents = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = resolve(dir, dirent.name)
      return dirent.isDirectory() ? getFilesRecursive(res) : [res]
    })
  )
  return files.flat()
}
