
import React from "react";
import MainSlider from './MainSlider';
import Background from '../img/bg.jpg';

const urls = {
    'updateList': 'https://www.techjuice.com.pl/todolist/api/updateList',
    'deleteItemFromList': 'https://www.techjuice.com.pl/todolist/api/deleteItemFromList',
    'addToList': 'https://www.techjuice.com.pl/todolist/api/addToList',
    'getList': 'https://www.techjuice.com.pl/todolist/api/getList'

}
class Todolist extends React.Component {
    constructor(props) {
        super(props);
        this.addToList = this.addToList.bind(this);
        this.inputText = this.inputText.bind(this);
        let result = localStorage.getItem('token');
        let token = JSON.parse(result).access_token;
        this.state = {
            token: token,
            lists: [],
            text: ''
        }
    }
    componentDidMount() {
        this.api(urls['getList'], null, 'GET');
    }

    handleChange(e) {
        let body = JSON.stringify({
            'id': e.id,
            'isDone': Number(!e.idDone)
        })
        this.api(urls['updateList'], body, 'POST');

    }
    deteltItem(e) {
        let body = JSON.stringify({
            'id': e.id,
        })
        this.api(urls['deleteItemFromList'], body, 'POST');
    }
    inputText(e) {

        this.setState({ text: e.target.value });
    }
    addToList() {
        if (this.state.text.length >=1) {
            let body = JSON.stringify({
                'text': this.state.text,
            })
            this.api(urls['addToList'], body, 'PUT');
            this.setState({text:""});
        } else {
            console.log("It is empty")
        }
    }
    api(url, body, method) {
        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.token
            },
            body
        }).then((response) => {
            response.json().then((jsonData) => {
                if (jsonData) {
                    this.setState({ lists: jsonData })
                }
            });
        })
    }
    render() {
        return (
            <div>
                <MainSlider Background={Background} title={'To Do List'} />
                <div className="container" style={{ paddingTop: 50 }}>
                    <div className="page-content page-container" id="page-content">
                        <div className="padding">
                            <div className="row container d-flex justify-content-center">
                                <div className="col-lg-12">
                                    <div className="card px-3">
                                        <div className="card-body">
                                            <div className="add-items d-flex">
                                                <input
                                                    type="text"
                                                    className="form-control todo-list-input"
                                                    placeholder="What do you need to do today?"
                                                    v-model="text"
                                                    value={this.state.text}
                                                    onChange={this.inputText}
                                                />
                                                <button className="add btn btn-primary font-weight-bold todo-list-add-btn"
                                                    onClick={this.addToList}>Dodaj</button>
                                            </div>
                                            <div className="list-wrapper">
                                                <ul className="d-flex flex-column-reverse todo-list">
                                                    {/* <square></square> */}
                                                    {this.state.lists.map((item, index) => (
                                                        <li key={index}>
                                                            <div className="form-check">
                                                                <label className="form-check-label">
                                                                    <input
                                                                        defaultChecked={item.isDone}
                                                                        className="checkbox"
                                                                        type="checkbox"
                                                                        onChange={() => this.handleChange(item)} />{item.text}<i className="input-helper"></i>
                                                                </label>
                                                            </div>

                                                            <i className="remove"
                                                                onClick={() => this.deteltItem(item)}>
                                                                <svg
                                                                    className="bi bi-x"
                                                                    width="1em"
                                                                    height="1em"
                                                                    viewBox="0 0 16 16"
                                                                    fill="currentColor"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z"

                                                                    />
                                                                    <path
                                                                        d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z"

                                                                    />
                                                                </svg>
                                                            </i>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </div >
        );
    }

}

export default Todolist;