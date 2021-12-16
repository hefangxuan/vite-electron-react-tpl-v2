import React, { useState } from 'react';
import Title from '/@/components/Title';
import PageHeader from '/@/components/PageHeader';
import List from '/@/components/List';
import { Button, Input, Popover } from 'antd';
import SynonymTableFn, { DataType } from '/@/pages/component/synonym/SynonymTableFn';
import CreateOrUpdateCategoryForm from '/@/pages/component/synonym/CreateOrUpdateCategoryForm';

import useSynonymHook from '/@/hooks/useSynonymHook';

const { TextArea } = Input;

const Index = () => {
  // const textareaRef: any = useRef(null);
  // const size = useSize(textareaRef);
  // console.log(size);
  const [value, setValue] = useState('');
  const {
    findSignListFn,
    selectState,
    signSelectFn,
    createOrUpdateSignFn,
    findSynonymListFn,
    createOrUpdateSynonymFn,
    delSynonymFn,
  } = useSynonymHook();

  const renderItem = (item: any) => {
    return (
      <div
        key={item.id}
        className={`flex flex-row justify-center items-center p-4 border-b hover:bg-gray-50 cursor-pointer ${
          selectState.signId === item.id ? 'bg-gray-100' : ''
        }`}
        onClick={() => {
          if (selectState.signId !== item.id) {
            signSelectFn(item.id);
          }
        }}
      >
        {item.name}
      </div>
    );
  };

  // 删除同义词
  const handleDelete = (id: number) => {
    console.log(44, id);
    delSynonymFn.run({ id }).then();
  };

  // 修改同义词
  const handleSave = (row: DataType) => {
    // 查询一下列表中是否存在 row 的 text , 如果有证明没有做修改
    const obj = (findSynonymListFn?.data || []).find((d: any) => d.id === row.id);
    if (obj?.text === row.text) {
      console.log('项目未修改');
      return;
    }
    const { id, text, ySignId } = row;
    createOrUpdateSynonymFn.run({ id, text, ySignId }).then();
  };

  // 添加同义词
  const addSynonym = () => {
    console.log(value);
    createOrUpdateSynonymFn.run({ ySignId: selectState.signId, text: value }).then();
  };

  return (
    <div className="h-full w-full flex flex-col justify-between">
      <PageHeader title="同义词管理" doc="同义词管理功能">
        <div className="h-full w-full flex flex-row justify-between">
          <div className="h-full border-r flex flex-col" style={{ width: 230 }}>
            <Title title="同义词模板类型" />
            <List
              loading={findSignListFn.loading}
              dataSource={findSignListFn.data || []}
              searchConfig={{ searchKeys: [''], placeholder: '输入项目名称搜索' }}
              createBtn={
                <div className="flex flex-row justify-center items-center pr-2 border-b">
                  <Popover
                    placement="right"
                    title="添加章节"
                    content={<CreateOrUpdateCategoryForm apiHook={createOrUpdateSignFn} />}
                    trigger="click"
                  >
                    <Button type="link">添加一条</Button>
                  </Popover>
                </div>
              }
              renderItem={renderItem}
            />
          </div>
          <div className="flex-1 h-full border-r flex flex-col justify-between">
            <div className="flex-1 flex flex-row justify-between">
              <div className="flex-1 flex flex-col border-r">
                <div>
                  <Title
                    title="同义词编辑"
                    rightNode={
                      <div className="flex flex-row space-x-4">
                        <Button type="dashed">数据导入</Button>
                        <Button type="primary" onClick={addSynonym}>
                          保存数据
                        </Button>
                      </div>
                    }
                  />
                </div>
                <div className="flex-1 p-4">
                  <TextArea
                    id="juZuText"
                    value={value}
                    style={{
                      height: '100%',
                      overflow: 'auto',
                      wordBreak: 'break-all',
                      fontSize: 16,
                    }}
                    onChange={(e: any) => setValue(e.target.value)}
                    // autoSize={{ minRows: 3, maxRows: 5 }}
                    placeholder="在这里编辑同义词, 可以完成批量编辑, 每行一个"
                  />
                </div>
              </div>
            </div>
            <SynonymTableFn
              loading={findSynonymListFn.loading}
              dataSource={findSynonymListFn?.data?.list || []}
              handleDelete={handleDelete}
              handleSave={handleSave}
              pagination={{
                total: findSynonymListFn?.data?.pageInfo?.total || 0,
                pageSize: findSynonymListFn?.data?.pageInfo?.pageSize || 0,
                current: findSynonymListFn?.data?.pageInfo?.current || 0,
                onChange: (page, pageSize) => {
                  console.log(page, pageSize);
                  findSynonymListFn.run({ ySignId: selectState.signId, page, pageSize }).then();
                },
              }}
            />
          </div>
        </div>
      </PageHeader>
    </div>
  );
};

export default Index;
