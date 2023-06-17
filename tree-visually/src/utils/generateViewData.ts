export interface LooseObject {
  [key: string]: any;
}

export const generateViewData = (ast: any[]) => {
  const viewData: LooseObject = {};

  ast.forEach((node) => {
    // the node could be of type 'comment'
    if (!node['id']) return;

    // create node instance inside viewData
    viewData[node['id']['value']] = node;
  });

  return viewData;
};
