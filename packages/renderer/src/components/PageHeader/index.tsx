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
    <div className="w-full h-full flex flex-col justify-between hefx-page-header">
      {(props.title || props.rightNode) && (
        <div className="border-b p-2 w-full flex flex-row justify-between">
          <div className="flex-item flex flex-row items-center">
            <div className="f-20 fw-700 ml-6 mr-6">{props.title}</div>
            <div className="text-sm text-gray-sm">{props.doc}</div>
          </div>
          <div className="flex-item flex flex-row flex-right">
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
