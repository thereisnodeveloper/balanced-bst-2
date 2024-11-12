// #region required-template
import './reset.css';
import './style.css';

export default class NodeBst {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}
