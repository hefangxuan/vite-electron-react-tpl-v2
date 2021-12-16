import React from 'react';
import { Button, Form, Input } from 'antd';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

interface IProps {
  apiHook: any;
}

export default function CreateOrUpdateCategoryForm(props: IProps) {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log(values);
    props.apiHook.run(values).then((r: any) => {
      if (r?.code === 1) {
        onReset();
      }
    });
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div style={{ width: 300, height: 160 }}>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item name="name" label="类型名称" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <div className="flex flex-row justify-center space-x-4">
          <Button type="primary" htmlType="submit" loading={props.apiHook.loading}>
            提交
          </Button>
          <Button htmlType="button" onClick={onReset}>
            重置
          </Button>
        </div>
      </Form>
    </div>
  );
}
