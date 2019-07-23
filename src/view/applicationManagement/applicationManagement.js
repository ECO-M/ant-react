import React, {Component} from 'react';
import {Table, Input, InputNumber, Popconfirm, Form} from 'antd';
import '../../assets/table.css'

const data = [];
for (let i = 0; i < 50; i++) {
  data.push({
    key: i + 1,
    name: `Edrward ${i + 1}`,
    age: 32,
    address: `London Park no. ${i + 1}`,
  });
}
const EditableContext = React.createContext();

class EditableCell extends Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber/>;
    }
    return <Input/>;
  };
  
  renderCell = ({getFieldDecorator}) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{margin: 0}}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  
  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}

class EditableTable extends Component {
  constructor(props) {
    super(props);
    this.state = {data, editingKey: ''};
    this.columns = [
      {
        title: 'name',
        dataIndex: 'name',
        width: '25%',
        editable: true,
      },
      {
        title: 'age',
        dataIndex: 'age',
        width: '15%',
        editable: true,
      },
      {
        title: 'address',
        dataIndex: 'address',
        width: '40%',
        editable: true,
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          const {editingKey} = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span className="curr_span">
              <EditableContext.Consumer>
                {form => (
                  <span className="span_button" onClick={() => this.save(form, record.key)}
                        style={{marginRight: 8}}>Save</span>
                )}
              </EditableContext.Consumer>
              <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                <span className="span_button">Cancel</span>
              </Popconfirm>
            </span>
          ) : (
            <div className="curr_span span_button" disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
              Edit
            </div>
          );
        },
      },
    ];
  }
  
  isEditing = record => record.key === this.state.editingKey;
  
  cancel = () => {
    this.setState({editingKey: ''});
  };
  
  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      console.log(row, key);
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({data: newData, editingKey: ''});
      } else {
        newData.push(row);
        this.setState({data: newData, editingKey: ''});
      }
    });
  }
  
  edit(key) {
    this.setState({editingKey: key});
  }
  
  render() {
    const components = {
      body: {
        cell: EditableCell,
      },
    };
    
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });
    
    return (
      <EditableContext.Provider value={this.props.form}>
        <Table components={components} dataSource={this.state.data} columns={columns}
               rowClassName="editable-row"
               pagination={{
                 onChange: this.cancel, pageSize: 15, pageSizeOptions: ['15', '20', '30'], showSizeChanger: true,
               }}/>
      </EditableContext.Provider>
    );
  }
}

const applicationManagement = Form.create()(EditableTable);

export default applicationManagement;
