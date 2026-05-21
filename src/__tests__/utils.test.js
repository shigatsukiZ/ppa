import { describe, it, expect } from 'vitest'

const formatCount = (val) => {
  const n = typeof val === 'string' ? parseFloat(val.replace('k', '')) * 1000 : val
  if (n >= 10000) return (n / 10000).toFixed(1) + 'w'
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k'
  return String(n)
}

const parseCount = (val) => {
  if (typeof val === 'number') return val
  const s = val.toLowerCase()
  if (s.endsWith('w')) return parseFloat(s) * 10000
  if (s.endsWith('k')) return parseFloat(s) * 1000
  return parseInt(s) || 0
}

const paginate = (arr, page, pageSize) => {
  const start = (page - 1) * pageSize
  return arr.slice(start, start + pageSize)
}

describe('formatCount', () => {
  it('formats numbers less than 1000', () => {
    expect(formatCount(0)).toBe('0')
    expect(formatCount(500)).toBe('500')
    expect(formatCount(999)).toBe('999')
  })

  it('formats numbers between 1000 and 9999', () => {
    expect(formatCount(1000)).toBe('1.0k')
    expect(formatCount(3500)).toBe('3.5k')
    expect(formatCount(9999)).toBe('10.0k')
  })

  it('formats numbers 10000 and above', () => {
    expect(formatCount(10000)).toBe('1.0w')
    expect(formatCount(12300)).toBe('1.2w')
    expect(formatCount(99999)).toBe('10.0w')
  })

  it('handles string inputs with k suffix', () => {
    expect(formatCount('1.2k')).toBe('1.2k')
  })
})

describe('parseCount', () => {
  it('parses numbers as-is', () => {
    expect(parseCount(500)).toBe(500)
  })

  it('parses w suffix', () => {
    expect(parseCount('1.2w')).toBe(12000)
    expect(parseCount('8.6w')).toBe(86000)
  })

  it('parses k suffix', () => {
    expect(parseCount('3.5k')).toBe(3500)
  })

  it('parses plain number strings', () => {
    expect(parseCount('892')).toBe(892)
  })
})

describe('paginate', () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  it('returns first page', () => {
    expect(paginate(items, 1, 10)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })

  it('returns second page', () => {
    expect(paginate(items, 2, 10)).toEqual([11, 12])
  })

  it('returns empty for page beyond total', () => {
    expect(paginate(items, 3, 10)).toEqual([])
  })

  it('works with custom page size', () => {
    expect(paginate(items, 1, 5)).toEqual([1, 2, 3, 4, 5])
    expect(paginate(items, 3, 5)).toEqual([11, 12])
  })
})

describe('search filtering logic', () => {
  const posts = [
    { id: 1, nickname: '元宝麻麻', content: '今天元宝学会了握手' },
    { id: 2, nickname: '大白姐姐', content: '锦城公园落日太美了' },
    { id: 3, nickname: '泡芙麻麻', content: '泡芙布偶猫毛打理秘诀' },
  ]
  const users = [
    { name: '泡芙麻麻', desc: '布偶猫日常 | 养猫好物分享' },
    { name: '毛球麻麻', desc: '两只柯基的快乐生活' },
  ]

  it('filters posts by nickname', () => {
    const q = '元宝'
    const result = posts.filter(p =>
      p.content.toLowerCase().includes(q) || p.nickname.toLowerCase().includes(q)
    )
    expect(result).toHaveLength(1)
    expect(result[0].nickname).toBe('元宝麻麻')
  })

  it('filters posts by content', () => {
    const q = '公园'
    const result = posts.filter(p =>
      p.content.toLowerCase().includes(q) || p.nickname.toLowerCase().includes(q)
    )
    expect(result).toHaveLength(1)
    expect(result[0].nickname).toBe('大白姐姐')
  })

  it('returns empty for unmatched query', () => {
    const q = 'zzz'
    const result = users.filter(u =>
      u.name.toLowerCase().includes(q) || u.desc.toLowerCase().includes(q)
    )
    expect(result).toHaveLength(0)
  })

  it('matches multiple results', () => {
    const q = '麻麻'
    const result = posts.filter(p =>
      p.content.toLowerCase().includes(q) || p.nickname.toLowerCase().includes(q)
    )
    expect(result.length).toBeGreaterThanOrEqual(2)
  })
})
