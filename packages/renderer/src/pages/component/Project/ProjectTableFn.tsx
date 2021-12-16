import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Select, Pagination } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { useSetState } from 'ahooks';
import Scrollbars from 'react-custom-scrollbars-2';

const { Option } = Select;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<Input>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  name: string;
  age: string;
  address: string;
}

interface EditableTableState {
  dataSource: DataType[];
  count: number;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

export default function EditableTable(props: EditableTableProps) {
  const tableWrapperRef: any = useRef(null);

  const [state, setState] = useSetState<EditableTableState>({
    dataSource: [
      {
        key: '0',
        name: 'Edward King 0',
        age: '32',
        address: 'London, Park Lane no. 0',
      },
      {
        key: '1',
        name: 'Edward King 1',
        age: '32',
        address: 'London, Park Lane no. 1',
      },
    ],
    count: 2,
  });

  /**
   * scrollY 表格垂直出现滚动的高度
   */
  const [scrollY, setScrollY] = useState(700);
  const [scrollX, setScrollX] = useState(700);

  // 根据页面高度动态设置表格垂直出现滚动的高度
  useEffect(() => {
    if (tableWrapperRef.current) {
      // 42 = 表格header高度
      setScrollY((preScrollY) => {
        const nextScrollY = tableWrapperRef.current.clientHeight - 42;
        // 5是误差范围内
        if (Math.abs(preScrollY - nextScrollY) > 5) {
          return nextScrollY;
        }
        return preScrollY;
      });
      // 42 = 表格header高度
      setScrollX((preScrollX) => {
        const nextScrollX = tableWrapperRef.current.clientWidth;
        // 5是误差范围内
        if (Math.abs(preScrollX - nextScrollX) > 5) {
          return nextScrollX;
        }
        return preScrollX;
      });
    }
  }, []);

  const handleDelete = (key: React.Key) => {
    const dataSource = [...state.dataSource];
    setState({ dataSource: dataSource.filter((item) => item.key !== key) });
  };

  const handleAdd = () => {
    const { count, dataSource } = state;
    const newData: DataType = {
      key: count,
      name: `Edward King ${count}`,
      age: '32',
      address: `London, Park Lane no. ${count}`,
    };
    setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };

  const handleSave = (row: DataType) => {
    console.log(2222, row);
    const newData = [...state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setState({ dataSource: newData });
  };

  const columns1: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: 'name',
      dataIndex: 'name',
      width: 200,
      editable: true,
      fixed: 'left',
    },
    {
      title: 'age',
      dataIndex: 'age',
      width: 100,
    },
    {
      title: 'address',
      dataIndex: 'address',
      width: 200,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      width: 200,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      render: (_, record: { key: React.Key }) =>
        state.dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = columns1.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    };
  });

  return (
    <div className="flex-1 h-full w-full flex flex-col border-t">
      <div className="pt-3 pl-3 pr-3 flex flex-row justify-between items-center">
        {/*<Button onClick={handleAdd} type="primary">*/}
        {/*  添加语句*/}
        {/*</Button>*/}
        <div className="pb-3 text-lg" onClick={handleAdd}>
          句子列表
        </div>
        <div>
          <Form className="flex flex-row justify-end">
            <Form.Item name="gender" initialValue="male">
              <Select style={{ width: 120, marginRight: 16 }}>
                <Option value="">all</Option>
                <Option value="male">male</Option>
                <Option value="female">female</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="name"
              initialValue="jack"
              rules={[{ required: true, message: 'name is required' }]}
            >
              <Input.Search placeholder="enter name" style={{ width: 240 }} />
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="flex-1 w-full flex flex-col justify-between" ref={tableWrapperRef}>
        <div className="flex-1">
          <Scrollbars autoHide>
            <Table
              sticky
              // style={{ height: scrollY, overflow: 'auto' }}
              components={components}
              rowClassName={() => 'editable-row'}
              // bordered
              tableLayout="auto"
              dataSource={state.dataSource}
              columns={columns as ColumnTypes}
              // scroll={{ x: 100 }
              pagination={false}
            />
          </Scrollbars>
        </div>
        <div className="flex flex-row justify-end items-center p-3 border-t">
          <Pagination defaultCurrent={6} total={500} />
        </div>
      </div>
    </div>
  );
}
