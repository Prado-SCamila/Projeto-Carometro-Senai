import React, { Component, useState } from 'react'
import axios from 'axios'
import { parseJwt, usuarioAutenticado } from '../../services/auth'
import { Link } from 'react-router-dom'
import '../../assets/css/style.css'
import fotobackground from '../../assets/img/alunos.jpg'
import instagram from '../../assets/img/instacinza.png'
import twitter from '../../assets/img/twittercinza.png'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      senha: '',
      erroMensagem: '',
      isLoading: false
    }
  }

  login = event => {
    event.preventDefault()
    this.setState({ erroMensagem: '', isLoading: true })

    axios
      .post('http://localhost:5000/api/login', {
        email: this.state.email,
        senha: this.state.senha
      })

      .then(resposta => {
        if (resposta.status === 200) {
          localStorage.setItem('usuario-login', resposta.data.token)
          console.log('usuario logado')
          this.setState({ isLoading: false })
          let base64 = localStorage.getItem('usuario-login').split('.')[1]
          switch (parseJwt().role) {
            case '1':
              this.props.history.push('/administrador')
              break
            case '2':
              this.props.history.push('/colaborador')
              break
            default:
              this.props.history.push('/')
              break
          }
        }
      })
      .catch(() => {
        this.setState({
          erroMensagem: 'E-mail ou senha inválidos! Tente novamente.',
          isLoading: false
        })
      })
  }
  atualizaStateCampo = campo => {
    this.setState({ [campo.target.name]: campo.target.value })
  }

  render() {
    return (
      <div className="container">
        <div className="content-home">
          <div className="sobre">
            <Link to="/">
              <img
                id="img-home"
                src={fotobackground}                
                alt="imagem-de-escola"
              />
            </Link>
          </div>

          <hr></hr>

          <div className="login">
            <h1>Entre com seu Login.</h1>
            <form onSubmit={this.login}
             id="form-login"
            >
              <div class="item">
                <input
                  className="input__login"
                  id="email-login"
                  required
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.atualizaStateCampo}
                  placeholder="Email"
                />
              </div>
              <div class="item">
                <input
                  class="input__login"
                  id="pwd-login"
                  required
                  type="password"
                  name="senha"
                  value={this.state.senha}
                  onChange={this.atualizaStateCampo}
                  placeholder="Senha"
                />
              </div>
              {
                this.state.isLoading === true &&  
                <div class="item">
                  <button
                   class="input__login"
                   id="btn-login"
                   type="submit"
                   >
                    Aguarde
                  </button>
                </div>
              }
              {
                this.state.isLoading === false &&  
                <div class="item">
                  <button
                    class="input__login"
                    id="btn-login"
                    type="submit"
                    disabled={this.state.email === '' || this.state.senha === '' ? 'none' : ''}
                    >
                    Entrar
                  </button>
                </div>
              }

            </form>

            <div className="social">
              <a href="https://www.instagram.com/">
                <img src={instagram} className="logo-insta" alt="instagram" />
              </a>
              <a href="https://twitter.com/login?lang=pt">
                <img src={twitter} className="logo-twitter" alt="twitter" />
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Login
