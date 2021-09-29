import { Component } from 'react'
import { Link } from 'react-router-dom'
import '../../assets/css/style.css'
import buscar from '../../assets/img/buscar.svg'
import camila from '../../assets/img/camila.png'
import carlos from '../../assets/img/carlos.png'
import apiFormData from './../../services/apiFormData';//importanto a api
import api from '../../services/api'//importanto a api

class Colaborador extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listaAlunos: [],
            listaTurmas: []
        }
    }


    atualizaEstadoIdTurma = async event => {
        await this.setState({ idTurma: event.target.value })
        console.log(this.state.idTurma)
    }

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
            'http://localhost:5000/api/alunos/ListarPorId/' + this.state.idTurma,
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

    componentDidMount() {
        this.buscarTurmas()
    }

    render() {
        return (
            <div>
                <header id="header-colaborador">
                    <h2 className="hello">Área para colaboradores</h2>
                    <Link to="/" className="Home-btn">
                        Sair
          </Link>
                </header>
                <div className="content-colaborador">
                    <div className="box-colaborador">
                        <form onSubmit={this.buscarAlunosPorId}>
                            <div className="input-bar-colaborador">
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
                                <button id="btn-busca" type="submit">
                                    <img
                                        id="icon-busca"
                                        src={buscar}
                                        className="search"
                                        alt="pesquisar"
                                    />
                                </button>
                            </div>
                        </form>

                        <div className="card-area-colaborador">
                            {this.state.listaAlunos.map(aluno => {
                                return (
                                    <div className="card-colaborador" key={aluno.idAluno}>
                                        <img className="foto" src={carlos} />
                                        <div id="info-std">
                                            <p>{aluno.nome}</p>
                                            <p>{aluno.telefone}</p>
                                            <p>{aluno.email}</p>
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

export default Colaborador
r