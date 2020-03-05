import React from "react";
import "../Style/Dropdown-style.css";

class Dropdown extends React.Component {
  constructor() {
    super();
    this.state = {
      displayMenu: false,
      jenisKelamin: ""
    };

    this.showDropdown = this.showDropdown.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
  }
  showDropdown = e => {
    e.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener("click", this.hideDropdownMenu);
    });
  };
  hideDropdownMenu = () => {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener("click", this.hideDropdownMenu);
    });
  };

  render() {
    return (
      <div>
        <div className="button" onClick={this.showDropdown}>
          Jenis Kelamin
        </div>
        {this.state.displayMenu ? (
          <ul>
            <li />
          </ul>
        ) : null}
      </div>
    );
  }
}
export default Dropdown;
