import { Component } from 'react';
import { MenuData } from '../data/admin';
import '../css/navbar.css';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

class Navbar extends Component {
  state = { clicked: false };
  handleClick = () => {
    this.setState({
      clicked: !this.state.clicked,
    });
  };

  logout = () => {
    const { setAuth } = useAuth();
    setAuth({ login: false });
    window.location.reload();
  };

  render() {
    return (
      <nav className="NavbarItems">
        <h1 className="title-logo">
          Los crakos <i className="fab fa-react"></i>
        </h1>
        <div className="menu-icons" onClick={this.handleClick}>
          <i
            className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}
          ></i>
        </div>
        <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
          {MenuData.map((item, index) => {
            return item.uri === '/logout' ? (
              <button onClick={this.logout}>
                <Link key={index} to={item.uri} className={item.cName}>
                  <i className={item.icon}></i>
                  {item.title}
                </Link>
              </button>
            ) : (
              <Link key={index} to={item.uri} className={item.cName}>
                <i className={item.icon}></i>
                {item.title}
              </Link>
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default Navbar;
