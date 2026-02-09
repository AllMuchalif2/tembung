// Obfuscated words - encoded to prevent easy viewing in devtools
// Each word is shifted by 3 characters and base64 encoded

const ENCODED_WORDS =
  'DEDQJ,DGKHP,DJHQJ,DMQJ,DMULK,DQBDU,DVUHS,EDEDY,EDNDO,EDQBX,EDSDN,EDWLU,EDWXN,EHEHN,EHFLN,EHJDO,EHNWD,EHQGX,EHQHU,EHUDV,EREWR,ERGKR,EUDPD,EXEDY,EXUXK,EXWXK,FDJDN,FXNXS,GDKDU,GDODQ,GDPDU,GDPHO,GKHZ,GRQBD,GULML,HOLQJ,HPSXN,HBDQJ,JDEDK,JDJDK,JDODN,JDPDQ,JDUZD,JHGKH,JHJHU,JHOLV,JHQDK,JHUK,JHVLW,JHWLK,JROHN,JURK,JULBD,JXJXU,JXVWL,JXBRQ,LODQJ,LUXQJ,MDMDO,MDOHU,MDOXN,MDPDQ,MDQXU,MDUDQ,MDULN,MDZDK,MHMHJ,MXMXU,NDEDU,NDEHK,NDOLK,NDSDQ,NDWXW,NHEDN,NHERQ,NHOLU,NHULV,NHVHO,NHWDQ,NLGXO,NODSD,NURPR,NXORQ,NXPDW,NXWKD,NXZDW,ODUHU,ODPEH,ODULV,ODWDU,ODZDV,OHPEX,OHSHQ,OLZDW,OXQJD,OXULN,PDHVD,VHSXK,WHELK,WXULN,ZDGDQ,DGXK,ZDGXN,ZODOK,ZDOLN,ZDOXK,ZDVLK,ZDWXK,ZXWXK,BDNLQ,BDWUD,BHNWL,BXVZD'

// Decode function - shift back by 3
function decode(encoded: string): string[] {
  return encoded.split(',').map((word) => {
    return word
      .split('')
      .map((char) => {
        if (char >= 'A' && char <= 'Z') {
          const code = char.charCodeAt(0) - 3
          // Wrap around if needed
          return String.fromCharCode(code < 65 ? code + 26 : code)
        }
        return char
      })
      .join('')
  })
}

let cachedWords: string[] | null = null

export function getWords(): string[] {
  if (!cachedWords) {
    cachedWords = decode(ENCODED_WORDS)
  }
  return cachedWords
}

export function getRandomWord(): string {
  const words = getWords()
  return words[Math.floor(Math.random() * words.length)]
}

export function getDailyWord(): string {
  const words = getWords()
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const dayOfYear = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  return words[dayOfYear % words.length]
}
