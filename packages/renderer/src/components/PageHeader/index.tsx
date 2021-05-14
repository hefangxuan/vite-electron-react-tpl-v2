import React, { ReactNode } from 'react';

import './style/index.less';

export interface IProps {
  children?: ReactNode;
  title: string | ReactNode;
  doc?: string;
  rightNode?: ReactNode[];
}
const PageHeader = React.memo((props: IProps) => {
  return (
    <div className="w-100 h-100 d-flex flex-column flex-between hefx-page-header">
      {(props.title || props.rightNode) && (
        <div className="border-bottom-d p-10 w-100 d-flex flex-between">
          <div className="flex-item d-flex flex-row flex-middle">
            <div className="f-20 fw-700 ml-6 mr-6">{props.title}</div>
            <div className="text-sm text-gray-sm">{props.doc}</div>
          </div>
          <div className="flex-item d-flex flex-row flex-right">
            <div className="right-node">
              {props.rightNode &&
                props.rightNode.map((item) => {
                  return item;
                })}
            </div>
          </div>
        </div>
      )}
      {props.children}
    </div>
  );
});

export default PageHeader;
