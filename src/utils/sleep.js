/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-11-21
 * @author Liang <liang@maichong.it>
 */

export default function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
