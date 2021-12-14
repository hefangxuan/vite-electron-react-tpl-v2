import type { ReactElement } from 'react';
import React from 'react';

export interface ITitleProps {
  /**
   * 标题组件名称
   * @default ''
   */
  title: string | ReactElement;
  /**
   * 右侧dom的点击回调函数
   * @default () => void
   */
  onRightClick?: () => void;
  /**
   * 右侧 内容
   */
  rightNode?: ReactElement;
  /**
   * 组件高度
   */
  height?: number;
  /**
   * loading
   */
  loading?: boolean;
}

const Title = React.memo(
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ({ title, onRightClick = () => {}, rightNode, height, loading }: ITitleProps) => {
    return (
      <div
        className="w-full pl-2 pr-2  flex flex-row items-center justify-between border-b"
        style={{
          minHeight: height || 36,
        }}
      >
        <div className="w-full font-bold text-gray-500">{title}</div>
        {rightNode && <div onClick={onRightClick}>{rightNode}</div>}
      </div>
    );
  },
);

export default Title;
