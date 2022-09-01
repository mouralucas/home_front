import React from 'react';
import '../../Assets/Core/Errors.css';
import error_404 from '../../Assets/Core/Images/error/404.png'

class Error404 extends React.Component {
    render() {
        return (
            <div className='app'>
                <div className="error-404">
                    <div className='error-404-img'>
                        <img src={error_404} alt="Não encontrado"/>
                    </div>
                    <div className="error-404_text">
                        <h2 className='error-404'> Ops!</h2>
                        <p className='error-404-title'>Não conseguimos encontrar a página que você está tentando acessar :(</p>
                        <p className='error-404-specification'>Erro 404.</p>
                    </div>
                </div>
                <div class="bt-back-error404">
                    <a href="#" class="bt-back-error404" onclick="window.history.go(-1);">Voltar</a>
                </div>
            </div>
        );
    }
}

export default Error404;