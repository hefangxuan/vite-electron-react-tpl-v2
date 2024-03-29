import React, { ReactNode, useCallback, useRef, useState } from 'react';
import { Empty, Spin, Input } from 'antd';
import Scrollbars from 'react-custom-scrollbars-2';

const { Search } = Input;

interface PageInfo {
  pageNo: number;
  pageSize: number;
}

export interface SearchConfigType {
  searchKeys: string[];
  placeholder?: string;
}

interface IProps {
  dataSource: any[];
  footer?: ReactNode;
  header?: ReactNode;
  loading?: boolean;
  loadMore?: ReactNode;
  renderItem?: (item: any) => ReactNode;
  rowKey?: string;
  locale?: string;
  onLoadMore?: (pageInfo: PageInfo) => Promise<boolean>;
  searchConfig?: SearchConfigType;
  createBtn?: ReactNode;
}
const List = React.memo((props: IProps) => {
  // 是否已加载完成
  const [isMore, setIsMore] = useState(false);

  // 存储搜索框输入值
  const [searchValue, setSearchValue] = useState('');

  // 存储 搜索结果
  const [searchRes, setSearchRes] = useState<any[]>([]);

  const pageNo = useRef(1);
  const pageSize = useRef(10);

  const {
    dataSource,
    loading = false,
    locale,
    footer,
    header,
    loadMore,
    renderItem,
    rowKey = 'id',
    onLoadMore = () => false,
    searchConfig,
    createBtn,
  } = props;

  const renderDOM = useCallback(
    (data: any[]) => {
      return (
        data &&
        data.map((item: any, index) => {
          return renderItem ? (
            renderItem(item)
          ) : (
            <div key={rowKey ? item[rowKey] : index}>{JSON.stringify(item)}</div>
          );
        })
      );
    },
    [renderItem],
  );

  const search = useCallback(
    (data: any[], v: string) => {
      if (data?.length > 0 && searchConfig?.searchKeys) {
        setSearchRes(
          data.filter((item: any) => {
            let isRes = false;
            for (let i = 0; i < searchConfig.searchKeys.length; i++) {
              const k = searchConfig.searchKeys[i];
              isRes = item[k].indexOf(v) !== -1;
              if (isRes) break;
            }
            return isRes;
          }),
        );
      }
    },
    [searchConfig, setSearchRes],
  );

  return (
    <div className="flex-1 flex flex-col">
      <div>{header}</div>
      {searchConfig && (
        <div className="p-2 border-b">
          <Search
            addonAfter
            placeholder={searchConfig?.placeholder || '昵称|ID|手机号|模糊搜索'}
            onChange={(e) => {
              search(dataSource, e.target.value);
              setSearchValue(e.target.value);
            }}
            style={{ width: '100%' }}
          />
        </div>
      )}
      {createBtn}
      <div className="flex-1">
        {dataSource?.length > 0 ? (
          <Scrollbars autoHide>
            <Spin spinning={loading}>
              {renderDOM(searchValue ? searchRes : dataSource)}
              {isMore ? (
                <div className="p-3 w-full flex flex-row justify-center items-center">没有更多</div>
              ) : (
                <div
                  onClick={async () => {
                    pageNo.current += 1;
                    const hasMore = await onLoadMore({
                      pageNo: pageNo.current,
                      pageSize: pageSize.current,
                    });
                    setIsMore(hasMore);
                  }}
                >
                  {loadMore}
                </div>
              )}
            </Spin>
          </Scrollbars>
        ) : (
          <Spin spinning={loading}>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={locale || '缺少数据'} />
          </Spin>
        )}
      </div>
      <div>{footer}</div>
    </div>
  );
});

export default List;
