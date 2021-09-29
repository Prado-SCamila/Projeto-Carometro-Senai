import { Component } from 'react'
import React from 'react' // adicionei a biblioteca do react
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../../assets/css/style.css'
import buscar from '../../assets/img/buscar.svg'
import camera from '../../assets/img/camera.svg'
// import arrow from '../../assets/img/arrow.svg'
import camila from '../../assets/img/camila.png'
import carlos from '../../assets/img/carlos.png'
import editar from '../../assets/img/editar.svg'
import lixeira from '../../assets/img/lixeira.svg'
import apiFormData from './../../services/apiFormData';//importanto a api
import api from './../../services/api'//importanto a api

class Administrador extends Component {
    constructor(props) {
        super(props)
        this.state = {


            listaAlunos: [],
            listaTurmas: [],
            idAlunoAlterado: 0,
            idTurma: '',

            card: {   // nomeei a coleção de informações do aluno x. Será o card
                nome: '',
                email: '',
                telefone: '',
                foto: React.createRef(),

            }
        }
    }


    //função para listar turmas
    buscarTurmas = () => {
        fetch('http://localhost:5000/api/turmas', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status !== 200) {
                    throw Error()
                }
                return resposta.json()
            })
            .then(resposta => this.setState({ listaTurmas: resposta }))
            .catch(erro => console.log(erro))
    }

    //função para listar os alunos passando o id da turma
    buscarAlunosPorId = async event => {
        event.preventDefault()
        await fetch(
            'http://localhost:5000/api/alunos/listarporid/' + this.state.idTurma,
            {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
                }
            }
        )
            .then(resposta => {
                if (resposta.status !== 200) {
                    throw Error()
                }
                return resposta.json()
            })
            .then(resposta => this.setState({ listaAlunos: resposta }))

            .catch(erro => console.log(erro))
    }

    //função para cadastrar e atualizar os alunos
    cadastrarAlunos = event => {
        event.preventDefault()
        if (this.state.idAlunoAlterado !== 0) {
            fetch('http://localhost:5000/api/alunos/' + this.state.idAlunoAlterado, {
                method: 'PUT',
                body: JSON.stringify({
                    idTurma: this.state.idTurma,
                    nome: this.state.nome,
                    telefone: this.state.telefone,
                    email: this.state.email,
                    foto: btoa(this.state.foto)
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
                }
            })
                .then(resposta => {
                    if (resposta.status === 204) {
                    }
                })
                .then(this.limparCampos)

        } else {
            fetch('http://localhost:5000/api/alunos', {
                method: 'POST',
                body: JSON.stringify({
                    idTurma: this.state.idTurma,
                    nome: this.state.nome,
                    telefone: this.state.telefone,
                    email: this.state.email,
                    foto: btoa(this.state.foto)
                }),

                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
                }
            })
                .then(console.log('Aluno Cadastrado!'))
                .catch(erro => console.log(erro))
                .then(this.limparCampos)
        }
    }

    // // Função responsável por excluir uma sala
    // excluirAluno = aluno => {
    //   fetch('http://localhost:5000/api/alunos/' + aluno.idAluno, {
    //     method: 'DELETE',

    //     headers: {
    //       Authorization: 'Bearer ' + localStorage.getItem('usuario-login')
    //     }
    //   })
    //     .then(resposta => {
    //       if (resposta.status === 204) {
    //       }
    //     })
    //     .catch(erro => console.log(erro))
    // }

    // // função buscar sala pelo id
    // buscarAlunoPorId = aluno => {
    //   this.setState({
    //     idTurmaAlterada: aluno.idAluno,
    //     nome: aluno.nome,
    //     email: aluno.email,
    //     telefone: aluno.telefone,
    //     foto: aluno.foto
    //   })
    // }

    atualizaEstadoNome = async event => {
        await this.setState({ nome: event.target.value })
        console.log(this.state.nome)
    }
    atualizaEstadoEmail = async event => {
        await this.setState({ email: event.target.value })
        console.log(this.state.email)
    }
    atualizaEstadoTelefone = async event => {
        await this.setState({ telefone: event.target.value })
        console.log(this.state.telefone)
    }
    atualizaEstadoFoto = async event => {
        await this.setState({ foto: event.target.value })
        console.log(this.state.foto)
    }
    atualizaEstadoIdTurma = async event => {
        await this.setState({ idTurma: event.target.value })
        console.log(this.state.idTurma)
    }

    atualizaEstadoIdTurma2 = async event => {
        await this.setState({ idTurma: event.target.value })
        console.log(this.state.idTurma)
    }

    // // Reseta os states titulo e idTipoEventoAlterado
    // limparCampos = () => {
    //   this.setState({
    //     idTurma: 0,
    //     nome: '',
    //     email: '',
    //     telefone: '',
    //     foto: '',
    //     idAlunoAlterado: 0
    //   })
    //   console.log('Os states foram resetados!')
    // }

    // componentDidMount() {
    //   this.buscarAlunos()
    // }

    componentDidMount() {
        this.buscarTurmas()
    }

    //FUNÇÃO PARA BUSCAR IMAGENS NA API*********************************

    getFoto = () => {
        api.get('/Resources/Images')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ foto: response.data })
                }
            })
    }
    //************************************************************************** */

    render() {
        return (
            <div>
                <header id="header-administrador">
                    <h3 className="hello">Seja bem vindo, Administrador!</h3>
                    <Link to="/" className="Home-btn">
                        Sair
          </Link>
                </header>

                <div className="container-adm">
                    <div className="content-administrador">
                        <div className="new-student">
                            <h2>Cadastre um novo aluno</h2>
                            <form>
                                <div className="item">
                                    <input
                                        className="input-cadastro"
                                        id="input-nome"
                                        required
                                        type="text"
                                        value={this.state.nome}
                                        onChange={this.atualizaEstadoNome}
                                        placeholder="Nome"
                                    />
                                </div>
                                <div className="item">
                                    <input
                                        className="input-cadastro"
                                        id="input-email"
                                        required
                                        type="email"
                                        value={this.state.email}
                                        onChange={this.atualizaEstadoEmail}
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="item">
                                    <input
                                        className="input-cadastro"
                                        id="input-tel"
                                        type="tel"
                                        value={this.state.telefone}
                                        onChange={this.atualizaEstadoTelefone}
                                        placeholder="Telefone:(DDD)"
                                    />
                                </div>

                                <div>
                                    <select
                                        className="input-turma-colaborador"
                                        name="idTurma"
                                        id="Turma"
                                        value={this.state.idTurma}
                                        onChange={this.atualizaEstadoIdTurma}
                                        placeholder="Turma"
                                    >
                                        <option value="0">Selecione uma turma</option>
                                        {this.state.listaTurmas.map(turma => {
                                            return (
                                                <option key={turma.idTurma} value={turma.idTurma}>
                                                    {turma.nome}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </div>

                                <div className="input-cadastro">
                                    <input
                                        className="input-foto"
                                        // required
                                        type="file"
                                        value={this.state.foto}
                                        onChange={this.atualizaEstadoFoto}
                                        placeholder="Foto"
                                    />
                                </div>
                                {
                                    <div className="submit">
                                        <button
                                            className="btn-adm"
                                            id="btn-cadastrar"
                                            type="submit"
                                            disabled={this.state.nome === '' ? 'none' : ''}
                                        >
                                            {this.state.idAlunoAlterado === 0
                                                ? 'Cadastrar'
                                                : 'Atualizar'}
                                        </button>
                                        <button
                                            className="btn-adm"
                                            id="btn-cancelar"
                                            type="submit"
                                            onClick={this.limparCampos}
                                        >
                                            Cancelar
                    </button>
                                    </div>
                                }

                            </form>
                        </div>
                    </div>

                    <div className="box">
                        <form onSubmit={this.buscarAlunosPorId} id="form-box">
                            <div className="input-bar" id="turma-turma">
                                <select
                                    className="input-turma-administrador"
                                    name="idTurma2"
                                    id="Turma2"
                                    value={this.state.idTurma}
                                    onChange={this.atualizaEstadoIdTurma}
                                    placeholder="Turma"
                                >
                                    <option value="0">Selecione uma turma</option>
                                    {this.state.listaTurmas.map(turma => {
                                        return (
                                            <option key={turma.idTurma} value={turma.idTurma}>
                                                {turma.nome}
                                            </option>
                                        )
                                    })}
                                </select>
                                <button id="btn-busca" type="submit">
                                    <img
                                        src={buscar}
                                        className="search"
                                        alt="pesquisar"
                                    />
                                </button>
                            </div>
                        </form>

                        <div className="card-area">
                            {this.state.listaAlunos.map(aluno => {
                                return (
                                    <div className="card" key={aluno.idAluno}>
                                        <img className="foto" src={this.state.card.foto} />
                                        <div id="info-std">
                                            <p>{aluno.nome}</p>
                                            <p>{aluno.telefone}</p>
                                            <p>{aluno.email}</p>
                                        </div>
                                        <div id="icon-card">
                                            <button type="menu" className="btn-card">
                                                <img src={editar} alt="editar" />
                                            </button>
                                            <button type="menu" className="btn-card">
                                                <img src={lixeira} alt="excluir" />
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Administrador
r
