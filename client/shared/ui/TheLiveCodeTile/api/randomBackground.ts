export function randomBackground() {
  function invertHex(hex: string) {
    return `#${(Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase()}`
  }

  const letters = '0123456789ABCDEF'
  const color = '#'
  let colorText = ''
  for (let i = 0; i < 6; i++) {
    colorText += letters[Math.floor(Math.random() * 16)]
  }
  const oppositeColor = invertHex(colorText)
  return [color + colorText, oppositeColor]
}
