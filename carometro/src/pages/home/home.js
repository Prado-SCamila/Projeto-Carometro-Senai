import { Link } from 'react-router-dom'
import '../../assets/css/style.css'
import ilustracao from '../../assets/img/ilustracao.jpeg';
import img1 from '../../assets/img/img1.jpeg';

function Home() {
    return (
        <div className="App">
            <div id="header-dtekta">
                <h1 className="home-header">D </h1>
                <p id="ponto">.</p>
                <h1 className="home-header">TEKTA</h1>
                <p id="pto1">.</p>
                <p id="pto2">.</p>
                <p id="pto3">.</p>
            </div>
            <div className="content-body">
                <img src={ilustracao} alt="ilustração-homem-usando-computador"></img>
            </div>
            <div className="cover">
                <div className="purple-text">
                    <p>
                        Facilite o gerenciamento dos alunos de sua instituição de ensino com o nosso sistema, nele você poderá cadastrar,atualizar cadastro,excluir e pesquisar os alunos pelas turmas, além de identificar cada aluno por sua foto de perfil.
             <p className="dtekta"> D.TEKTA.</p>
                    </p>
                </div>
                <div className="content-purple-button-login">
                    <Link to="/login" className="content-button-login">
                        Login
            </Link>
                </div>
            </div>
        </div>
    )
}

export default Home
