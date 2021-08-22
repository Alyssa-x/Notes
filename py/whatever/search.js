// 深度 递归 前序
let deepSearch = (node, nodeList = []) => {
  if (node !== null) {
    nodeList.push(node);
    let children = node.children || [];
    if (children.length) {
      for (let i = 0; i < children.length; i++) {
        deepSearch(children[i], nodeList);
      }
    }
  }
  return nodeList;
};
// 二叉树 先序遍历
var preOrder = function (node) {
  if (node) {
    console.log(node.value);
    preOrder(node.left);
    preOrder(node.right);
  }
}
// 深度 非递归
let depth2 = (node) => {
  let stack = []
  let nodes = []
  if (node) {
      stack.push(node)
      while (stack.length) {
        //每次取最后一个
          let item = stack.pop()
          let children = item.children || []
          nodes.push(item)
          //判断children的长度
          for (let i = children.length - 1; i >= 0; i--) {
              stack.push(children[i])
          }
      }
  }
  return nodes
}

// 广度优先 非递归
let breadth = (node) => {
  let nodes = []
  let stack = []
  if (node) {
      stack.push(node)
      while (stack.length) {
        //取第一个
          let item = stack.shift()
          let children = item.children || []
          nodes.push(item)
          for (let i = 0; i < children.length; i++) {
              stack.push(children[i])
          }
      }
  }
  return nodes
}



const list = [
  {
    name: "1",
    children: [
      {
        name: "1.1",
      },
      {
        name: "1.2",
      },
    ],
  },
  {
    name: "2",
    children: [
      {
        name: "2.1",
      },
      {
        name: "2.2",
      },
    ],
  },
];
let obj = {};
obj.children = list;



// obj
let obj1 = {
  children: [
    {
      index: 0,
      children: [
        {
          index: 1,
          children: [
            {
              index: 3,
            },
          ],
        },
      ],
    },
    {
      index: 4,
    },
    {
      index: 5,
      children: [
        {
          index: 7,
          children: [
            {
              index: 8,
            },
          ],
        },
      ],
    },
    {
      index: 6,
    },
  ],
};
console.log(deepSearch(obj1),[])
// function fn(node,list = []) {
//   let list = [];
//   if(node != null) {
//     list.push(node);
//     let children = node.children || [];
//     if(children.length !== 0) {
//       for(let i = 0;i < children.length;i ++) {
//         fn(children[i],list)
//       }
//     }
//   }
//   return list;
// }