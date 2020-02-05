import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as FavoriteActions from '../../store/actions/favorites';
import PropTypes from 'prop-types';

class Main extends Component {

    // eslint-disable-next-line react/no-typos
    static propTYpes = {
        addFavoriteRequest: PropTypes.func.isRequired,
        favorites: PropTypes.shape({
            loading: PropTypes.bool,
            data: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.number,
                description: PropTypes.string,
                url: PropTypes.string,
            })),
            error: PropTypes.oneOfType([null, PropTypes.string]),

        }).isRequired,
    }
    
    state = {
        repositoryInput: '',
    };

    handleAddRepository = (event) => {
        event.preventDefault();
        this.props.addFavoriteRequest(this.state.repositoryInput);

        this.setState({ repositoryInput: '' })
    }
    
    
    render(){
        return(
            <Fragment>
                <form onSubmit={this.handleAddRepository}>
                    <input 
                        placeholder="usuário/repositório" 
                        value={this.state.repositoryInput}
                        onChange={ e => this.setState({ repositoryInput: e.target.value })  } 
                    />
                    <button type="submitr">Adicionar</button>

                    { this.props.favorites.loading && <span>Carregando</span> }
                    { !! this.props.favorites.error && <span style={{color: '#F00'}}>{this.props.favorites.error}</span> }
                </form>

                <ul>
                    { this.props.favorites.data.map(favorite => (
                        <li key={favorite.id}>
                            <p>
                                <strong>{favorite.name}</strong>({favorite.description})
                            </p>
                            <a href={favorite.url}>Acessar</a>
                        </li>
                    ))}
                </ul>                
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    favorites: state.favorites,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(FavoriteActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main)
