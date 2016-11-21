/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-11-20
 * @author Liang <liang@maichong.it>
 */

export default function generateId() {
  return Date.now() + Math.random().toString().substr(2, 3);
}
