import React, { Component } from 'react'
import Main from '../templates/Main'
import axios from 'axios'

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle:'Cadastro de usuários: Incluir, Listar, Alterar, Excluir'
}

const baseUrl = 'http://localhost:3001/users'
const initialState = {
    user: {name: '', email: ''},
    list: []
}

export default class UserCrud extends Component {

    state = {...initialState}

    componentWillMount () {
        axios(baseUrl).then(resp => {
            this.setState({list: resp.data})
        })
    }

    clear (){
        this.setState({user: initialState.user})
    }

    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl

        axios[method](url, user)
        .then(resp => {
            const list = this.getUpdateList(resp.data)
            this.setState({user: initialState.user, list})
        })
    }

    getUpdateList (user, add = true) {
        const list = this.state.list.filter(u => u.id !== user.id)
        if(add) list.unshift(user)
        return list
    }

    updateField(event) {
        const user = {...this.state.user}
        user[event.target.name] = event.target.value
        this.setState( {user} )
    }

    renderForm() {
        return(
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" name="name" 
                            className='form-control' value={this.state.user.name} 
                            onChange={e => this.updateField(e)} placeholder="Enter Username..."/>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                    <div className="form-group">
                            <label>E-mail</label>
                            <input type="email" name="email" 
                            className='form-control' value={this.state.user.email} 
                            onChange={e => this.updateField(e)} placeholder="Enter user Email..."/>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={e=> this.save(e)}>
                            Save
                        </button>
                        <button className="btn btn-secondary ml-12" onClick={e=> this.clear(e)}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    } 

    load(user) {
        this.setState({ user })
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.getUpdateList(user,false)
            this.setState({list})
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>E-mail</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning" onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2" onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }
    render () {
        
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
} 