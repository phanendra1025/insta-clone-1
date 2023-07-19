import {Component} from 'react'
import {FiSearch} from 'react-icons/fi'
import './index.css'

class NavBar extends Component {
  render() {
    return (
      <nav className="nav-bar-container">
        <div className="nav-bar-logo-container">
          <img
            src="https://res.cloudinary.com/dytmw4swo/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1689749750/Insta%20Clone/Group_t5f0gl.jpg?_s=public-apps"
            alt="navbar logo"
            className="navbar-website-logo"
          />
          <h1 className="navbar-app-name">Insta Share</h1>
        </div>
        <div className="nav-items-container">
          <div className="search-bar-container">
            <input
              type="search"
              className="search-bar"
              placeholder="Search Caption"
            />
            <div className="search-icon-container">
              <FiSearch size={10} color="#989898" />
            </div>
          </div>
          <ul className="nav-items-list">
            <li className="nav-item">Home</li>
            <li className="nav-item">Profile</li>
            <li>
              <button type="button" className="logout-button">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default NavBar
