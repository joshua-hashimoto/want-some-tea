import { Form as AntdForm, FormProps as AntdFormProps } from "antd";

type FormProps = AntdFormProps & {
  children: React.ReactNode;
};

const _Form: React.FC<FormProps> = ({ ...props }) => (
  <AntdForm
    css={{ width: "100%", display: "flex", justifyContent: "center" }}
    {...props}
  />
);

const Form = _Form as React.FC<FormProps> & {
  useForm: typeof AntdForm.useForm;
  Item: typeof AntdForm.Item;
  List: typeof AntdForm.List;
  ErrorList: typeof AntdForm.ErrorList;
  Provider: typeof AntdForm.Provider;
};

Form.useForm = AntdForm.useForm;
Form.Item = AntdForm.Item;
Form.List = AntdForm.List;
Form.ErrorList = AntdForm.ErrorList;
Form.Provider = AntdForm.Provider;

export default Form;
