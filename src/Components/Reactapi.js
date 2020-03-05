import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";

import "../Style/main.css";

class Reactapi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataAPI: [],
      dataPost: {
        id: 0,
        nama_karyawan: "",
        jabatan: "",
        jk: "",
        startDate: null
      }
    };

    this.handleRemove = this.handleRemove.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }
  inputChange(e, date) {
    let newDataPost = { ...this.state.dataPost };
    newDataPost["id"] = new Date().getTime();
    newDataPost[e.target.name] = e.target.value;

    this.setState(
      {
        dataPost: newDataPost,
        startDate: date
      },
      () => console.log(this.state.dataPost)
    );
  }
  onSubmitForm() {
    axios
      .post(`http://localhost:3004/data-karyawan`, this.state.dataPost)
      .then(() => {
        this.reloadData();
      });
  }
  handleRemove(e) {
    console.log(e.target.value);
    fetch(`http://localhost:3004/data-karyawan/${e.target.value}`, {
      method: "DELETE"
    }).then(res => this.reloadData());
  }

  reloadData() {
    axios.get("http://localhost:3004/data-karyawan").then(res => {
      this.setState({
        dataAPI: res.data
      });
    });
  }

  componentDidMount() {
    this.reloadData();
  }

  render() {
    return (
      <div>
        <div className="flex mb-4">
          <input
            className="appearance-none block bg-grey-lighter mx-2 text-grey-darker border border-red rounded py-3 px-4 mb-3"
            id="grid-first-name"
            type="text"
            name="nama_karyawan"
            placeholder="Masukan Nama"
            onChange={this.inputChange}
          />
          <input
            className="appearance-none block bg-grey-lighter mx-6 text-grey-darker border border-red rounded py-3 px-4 mb-3"
            id="grid-first-jabatan"
            type="text"
            name="jabatan"
            placeholder="Masukan Jabatan"
            onChange={this.inputChange}
          />
          <select
            className="appearance-none block bg-white mx-6 text-grey-darker border border-red rounded py-3 px-4 mb-3"
            name="jenis_kelamin"
            placeholder="Gender"
            value={this.state.jk}
            onChange={this.inputChange}
          >
            <option value="Laki-Laki">Laki-laki</option>
            <option value="perempuan">Perempuan</option>
          </select>

          <DatePicker
            selected={this.state.startDate}
            onChange={this.inputChange}
          />

          <button
            className="py-1 bg-blue-300 hover:bg-blue-400 text-white font-bold py-2 px-2 border-b-4 border-red-700 hover:border-red-500 rounded"
            type="submit"
            onClick={this.onSubmitForm}
          >
            Add Data
          </button>
        </div>
        {/*Table*/}
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
          <thead>
            <tr className="border-b">
              <td className="text-left p-3 px-5">ID</td>
              <td className="text-left p-3 px-5">Nama Karyawan</td>
              <td className="text-left p-3 px-5">Jabatan</td>
              <td className="text-left p-3 px-5">Jenis Kelamin</td>
              <td className="text-left p-3 px-5"> Tanggal Lahir</td>
            </tr>
          </thead>
          <tbody>
            {this.state.dataAPI.map((dat, index) => {
              return (
                <tr
                  className="border-b hover:bg-orange-100 bg-gray-100"
                  key={index}
                >
                  <td className="p-3 px-5">{dat.id}</td>
                  <td className="p-3 px-5">{dat.nama_karyawan}</td>
                  <td className="p-3 px-5">{dat.jabatan}</td>
                  <td className="p-3 px-5">{dat.jenis_kelamin}</td>
                  <td className="p-3 px-5">{dat.tanggal_lahir}</td>
                  <td>
                    <button
                      className="py-3 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                      value={dat.id}
                      onClick={this.handleRemove}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Reactapi;
