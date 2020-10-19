export default function getRandomInt(min, max) {
  // 随机返回min ~ max 中的一个整数
  return Math.floor(Math.random() * (max - min) + min);
}