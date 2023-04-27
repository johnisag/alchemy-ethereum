class Tree {
  constructor() {
    this.root = null;
  }

  addNodeToParent(parent, child) {
    // left
    if (child.data < parent.data) {
      if (parent.left == null) {
        parent.left = child;
      } else {
        this.addNodeToParent(parent.left, child);
      }
    }
    //right
    else {
      if (parent.right == null) {
        parent.right = child;
      } else {
        this.addNodeToParent(parent.right, child);
      }
    }
  }

  addNode(node) {
    if (this.root == null) {
      this.root = node;
    } else {
      this.addNodeToParent(this.root, node);
    }
  }

  searchTarget(current, targetData) {
    if (current == null) {
      return false;
    } else if (targetData == null) {
      return false;
    } else if (current.data == targetData) {
      return true;
    } else if (current.data > targetData) {
      return this.searchTarget(current.left, targetData);
    } else if (current.data < targetData) {
      return this.searchTarget(current.right, targetData);
    }

    return true;
  }

  hasNode(targetData) {
    return this.searchTarget(this.root, targetData);
  }
}

module.exports = Tree;
