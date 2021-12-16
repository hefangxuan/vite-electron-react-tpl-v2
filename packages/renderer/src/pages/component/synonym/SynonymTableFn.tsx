import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Input, Pagination, Popconfirm, Select, Table } from 'antd';
import { FormInstance } from 'antd/lib/form';
import Scrollbars from 'react-custom-scrollbars-2';
import { TableProps } from 'antd/lib/table/Table';
import { PaginationProps } from 'antd/lib/pagination/Pagination';

const { Option } = Select;

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  id: number;
  ySignId: number;
  text: string;
  remarks: string;
  createDate: string;
  updateDate: string;
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

interface IProps extends TableProps<any> {
  handleSave?: (row: DataType) => void;
  handleDelete?: (id: number) => void;
  pagination?: PaginationProps;
}

export interface DataType {
  id: number;
  ySignId: number;
  text: string;
  remarks: string;
  createDate: string;
  updateDate: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

export default function SynonymTableFn(props: IProps) {
  const handleDelete = (key: number) => {
    if (props?.handleDelete) {
      props.handleDelete(key);
    }
  };

  const handleSave = (row: DataType) => {
    if (props?.handleSave) {
      props.handleSave(row);
    }
  };

  const columns1: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 100,
      fixed: 'left',
    },
    {
      title: '同义词',
      dataIndex: 'text',
      editable: true,
      // width: 100,
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      // width: 200,
    },
    {
      title: '更新时间',
      dataIndex: 'updateDate',
      // width: 200,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width: 100,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      render: (_, record: { id: number }) => (
        <Popconfirm title="您确定要删除吗?" onConfirm={() => handleDelete(record.id)}>
          <Button type="link">删除</Button>
        </Popconfirm>
      ),
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
        <div className="pb-3 text-lg">同义词列表</div>
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
      <div className="flex-1 w-full flex flex-col justify-between">
        <div className="flex-1">
          <Scrollbars autoHide>
            <Table
              loading={props.loading}
              sticky
              // style={{ height: scrollY, overflow: 'auto' }}
              components={components}
              rowClassName={() => 'editable-row'}
              bordered
              // tableLayout="auto"
              dataSource={props.dataSource}
              columns={columns as ColumnTypes}
              // scroll={{ x: 100 }
              pagination={false}
              rowKey="id"
            />
          </Scrollbars>
        </div>
        <div className="flex flex-row justify-end items-center p-3 border-t">
          <Pagination {...(props?.pagination || {})} />
        </div>
      </div>
    </div>
  );
}
