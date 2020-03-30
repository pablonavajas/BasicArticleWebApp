import React from 'react';
import { Button } from 'antd';

import axios from 'axios';

//const FormItem = Form.Item;

class CustomForm extends React.Component {

    handleFormSubmit = (event, requestType, articleID) => {
        //event.preventDefault();
        const title = event.target.elements.title.value;
        const content = event.target.elements.content.value;

        console.log(title, content);

        switch ( requestType ) {
            case 'post': 
                axios.post('http://127.0.0.1:8000/api/', {
                    title: title,
                    content: content
                })
                .then(res => console.log(res))
                .catch(error => console.err(error));
                break;

            case 'put':
                axios.put(`http://127.0.0.1:8000/api/${articleID}/`, {
                    title: title,
                    content: content
                })
                .then(res => console.log(res))
                .catch(error => console.err(error));
                break;
        }
    }

    render() {
        return (
            <div>
                <br />
                <form onSubmit={(event) => this.handleFormSubmit(
                    event,
                    this.props.requestType,
                    this.props.articleID 
                    )}>
                    TITLE: . . . . . . .
                    <input name="title" placeholder="Enter the title here." />
                    <br />
                    CONTENT: . . .
                    <input name="content" placeholder="Enter content here..." />
                    <br />
                    <Button type="primary" htmlType="submit">{this.props.btnText}</Button>
                </form>
            </div>
        );
    }
}

export default CustomForm;