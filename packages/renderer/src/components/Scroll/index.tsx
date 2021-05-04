import React from 'react';
import FreeScrollBar, { Props } from 'react-free-scrollbar';

interface IProps extends Props {
  /**
   * children
   */
  children: any;
}
const Scroll = React.memo((props: IProps) => {
  const { children, ...prop } = props;
  return (
    <FreeScrollBar autohide className="example" {...prop}>
      {props.children}
    </FreeScrollBar>
  );
});

export default Scroll;
