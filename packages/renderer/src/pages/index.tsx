import React, { useCallback, useRef, useState } from 'react';
import Title from '/@/components/Title';
import PageHeader from '/@/components/PageHeader';
import List from '/@/components/List';
import ProjectTable from './component/Project/ProjectTableFn';
import { Button, Input, Table } from 'antd';
import { useSize } from 'ahooks';
import Scrollbars from 'react-custom-scrollbars-2';

const { TextArea } = Input;

// 获取光标位置
const getPositionForTextArea = (ctrl: any) => {
  const CaretPos = {
    start: 0,
    end: 0,
  };
  if (ctrl) {
    if (ctrl.selectionStart) {
      // Firefox support
      CaretPos.start = ctrl.selectionStart;
    }
    if (ctrl.selectionEnd) {
      CaretPos.end = ctrl.selectionEnd;
    }
  }
  return CaretPos;
};

const Index = () => {
  // const textareaRef: any = useRef(null);
  // const size = useSize(textareaRef);
  // console.log(size);
  const [value, setValue] = useState('');

  // 设置光标位置
  const setCursorPosition = useCallback((ctrl: any, pos: number) => {
    ctrl.focus();
    ctrl.setSelectionRange(pos, pos);
  }, []);

  // 插入文本
  const joinText = useCallback((msg = '') => {
    const textInput: any = document.getElementById('juZuText');
    // 获取光标位置
    const position = getPositionForTextArea(textInput);
    const { length } = msg;
    setValue(
      textInput.value.substr(0, position.start) + msg + textInput.value.substr(position.start),
    );
    // 不加延时器就会发生光标还没插入文字呢 就已经把光标插入后的位置提前定位
    setTimeout(() => {
      setCursorPosition(textInput, position.start + length);
    }, 20);
  }, []);

  return (
    <div className="h-full w-full flex flex-col justify-between">
      <PageHeader title="项目管理" doc="项目管理功能">
        <div className="h-full w-full flex flex-row justify-between">
          <div className="h-full border-r flex flex-col" style={{ width: 230 }}>
            <Title title="项目" />
            <List
              dataSource={[]}
              searchConfig={{ searchKeys: [''], placeholder: '输入项目名称搜索' }}
              footer={<div>s</div>}
            />
          </div>
          <div className="h-full border-r flex flex-col" style={{ width: 230 }}>
            <Title title="类型" />
            <List
              dataSource={[]}
              searchConfig={{ searchKeys: [''], placeholder: '输入章节名称搜索' }}
              footer={<div>s</div>}
            />
          </div>
          <div className="flex-1 h-full border-r flex flex-col justify-between">
            <div className="flex-1 flex flex-row justify-between">
              <div className="flex-1 flex flex-col border-r">
                <div>
                  <Title
                    title="语句编辑"
                    rightNode={
                      <div className="flex flex-row space-x-4">
                        <Button type="dashed">数据导入</Button>
                        <Button type="primary">保存数据</Button>
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
                    placeholder="在这里编辑语句, 可以完成批量编辑, 必须保证每一行都是一个完整的句子"
                  />
                </div>
              </div>
              <div style={{ width: 400 }} className="flex flex-col justify-between">
                <Title title="同义词关键词" />
                <div className="flex-1">
                  <Scrollbars autoHide>
                    <div className="p-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div
                          className="rounded bg-gray-300 flex flex-row justify-center items-center p-2 cursor-pointer hover:bg-gray-400"
                          onClick={() => joinText('@产地@')}
                        >
                          产地
                        </div>
                        <div className="rounded bg-gray-300 flex flex-row justify-center items-center p-2 cursor-pointer hover:bg-gray-400">
                          asdasd
                        </div>
                        <div className="rounded bg-gray-300 flex flex-row justify-center items-center p-2 cursor-pointer hover:bg-gray-400">
                          asdasd
                        </div>
                        <div className="rounded bg-gray-300 flex flex-row justify-center items-center p-2 cursor-pointer hover:bg-gray-400">
                          asdasd
                        </div>
                        <div className="rounded bg-gray-300 flex flex-row justify-center items-center p-2 cursor-pointer hover:bg-gray-400">
                          asdasd
                        </div>
                        <div className="rounded bg-gray-300 flex flex-row justify-center items-center p-2 cursor-pointer hover:bg-gray-400">
                          asdasd
                        </div>
                        <div className="rounded bg-gray-300 flex flex-row justify-center items-center p-2 cursor-pointer hover:bg-gray-400">
                          asdasd
                        </div>
                        <div className="rounded bg-gray-300 flex flex-row justify-center items-center p-2 cursor-pointer hover:bg-gray-400">
                          asdasd
                        </div>
                        <div className="rounded bg-gray-300 flex flex-row justify-center items-center p-2 cursor-pointer hover:bg-gray-400">
                          asdasd
                        </div>
                        <div className="rounded bg-gray-300 flex flex-row justify-center items-center p-2 cursor-pointer hover:bg-gray-400">
                          asdasd
                        </div>
                        <div className="rounded bg-gray-300 flex flex-row justify-center items-center p-2 cursor-pointer hover:bg-gray-400">
                          asdasd
                        </div>
                        <div className="rounded bg-gray-300 flex flex-row justify-center items-center p-2 cursor-pointer hover:bg-gray-400">
                          asdasd
                        </div>
                        <div className="rounded bg-gray-300 flex flex-row justify-center items-center p-2 cursor-pointer hover:bg-gray-400">
                          asdasd
                        </div>
                        <div className="rounded bg-gray-300 flex flex-row justify-center items-center p-2 cursor-pointer hover:bg-gray-400">
                          asdasd
                        </div>
                        <div className="rounded bg-gray-300 flex flex-row justify-center items-center p-2 cursor-pointer hover:bg-gray-400">
                          asdasd
                        </div>
                        <div className="rounded bg-gray-300 flex flex-row justify-center items-center p-2 cursor-pointer hover:bg-gray-400">
                          asdasd
                        </div>
                        <div className="rounded bg-gray-300 flex flex-row justify-center items-center p-2 cursor-pointer hover:bg-gray-400">
                          asdasd
                        </div>
                        <div className="rounded bg-gray-300 flex flex-row justify-center items-center p-2 cursor-pointer hover:bg-gray-400">
                          asdasd
                        </div>
                        <div className="rounded bg-gray-300 flex flex-row justify-center items-center p-2 cursor-pointer hover:bg-gray-400">
                          asdasd
                        </div>
                        <div className="rounded bg-gray-300 flex flex-row justify-center items-center p-2 cursor-pointer hover:bg-gray-400">
                          asdasd
                        </div>
                        <div className="rounded bg-gray-300 flex flex-row justify-center items-center p-2 cursor-pointer hover:bg-gray-400">
                          asdasd
                        </div>
                        <div className="rounded bg-gray-300 flex flex-row justify-center items-center p-2 cursor-pointer hover:bg-gray-400">
                          asdasd
                        </div>
                        <div className="rounded bg-gray-300 flex flex-row justify-center items-center p-2 cursor-pointer hover:bg-gray-400">
                          asdasd
                        </div>
                        <div className="rounded bg-gray-300 flex flex-row justify-center items-center p-2 cursor-pointer hover:bg-gray-400">
                          asdasd
                        </div>
                        <div className="rounded bg-gray-300 flex flex-row justify-center items-center p-2 cursor-pointer hover:bg-gray-400">
                          asdasd
                        </div>
                        <div className="rounded bg-gray-300 flex flex-row justify-center items-center p-2 cursor-pointer hover:bg-gray-400">
                          asdasd
                        </div>
                        <div className="rounded bg-gray-300 flex flex-row justify-center items-center p-2 cursor-pointer hover:bg-gray-400">
                          asdasd
                        </div>
                        <div className="rounded bg-gray-300 flex flex-row justify-center items-center p-2 cursor-pointer hover:bg-gray-400">
                          asdasd
                        </div>
                        <div className="rounded bg-gray-300 flex flex-row justify-center items-center p-2 cursor-pointer hover:bg-gray-400">
                          asdasd
                        </div>
                      </div>
                    </div>
                  </Scrollbars>
                </div>
              </div>
            </div>
            <ProjectTable />
          </div>
        </div>
      </PageHeader>
    </div>
  );
};

export default Index;
