import glob from 'glob'

export const FileList = (input, ext, rootOnly = false) => {
  // 再帰的か直下のみか
  const target = rootOnly ? `${input}/[!_]*.${ext}` : `${input}/**/[!_]*.${ext}`

  const files = glob.sync(target)
  const reg1 = new RegExp(`${input}/`)
  const reg2 = new RegExp(`.${ext}$`)
  const entries = {}

  files.forEach((item) => {
    const key = item.replace(reg1, '').replace(reg2, '')
    entries[key] = item
  })

  return entries
}