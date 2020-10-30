export default function calcNeedCoin(lv) {
  return Math.round((lv * lv * 2 + lv * 200) / 100) * 100
}