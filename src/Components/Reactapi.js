import React, { Component } from "react";
import axios from "axios";
import "../Style/main.css";

class Reactapi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataAPI: [],
      edit: false,
      dataPost: {
        id: 0,
        nama_karyawan: "",
        jabatan: "",
        jenis_kelamin: "laki-laki",
        tanggal_lahir: new Date()
      }
    };

    this.handleRemove = this.handleRemove.bind(this);
    this.inputChange = this.inputChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.getDataID = this.getDataID.bind(this);
    this.clearData = this.clearData.bind(this);
  }
  inputChange(e) {
    let newDataPost = { ...this.state.dataPost };
    if (this.state.edit === false) {
      newDataPost["id"] = new Date().getTime();
    }
    newDataPost[e.target.name] = e.target.value;

    this.setState(
      {
        dataPost: newDataPost
      },
      () => console.log(this.state.dataPost)
    );
  }
  onSubmitForm() {
    if (this.state.edit === false) {
      axios
        .post(`http://localhost:3004/data-karyawan`, this.state.dataPost)
        .then(() => {
          this.reloadData();
          this.clearData();
        });
    } else {
      axios
        .put(
          `http://localhost:3004/data-karyawan/${this.state.dataPost.id}`,
          this.state.dataPost
        )
        .then(() => {
          this.reloadData();
          this.clearData();
        });
    }
  }
  handleRemove(e) {
    console.log(e.target.value);
    fetch(`http://localhost:3004/data-karyawan/${e.target.value}`, {
      method: "DELETE"
    }).then(res => this.reloadData());
  }
  getDataID(e) {
    axios
      .get(`http://localhost:3004/data-karyawan/${e.target.value}`)
      .then(res => {
        this.setState({
          dataPost: res.data,
          edit: true
        });
      });
  }
  clearData() {
    let newDataPost = { ...this.state.dataPost };
    newDataPost["id"] = "";
    newDataPost["nama_karyawan"] = "";
    newDataPost["jabatan"] = "";
    newDataPost["jenis_kelamin"] = "laki-laki, Perempuan";
    newDataPost["tanggal"] = "";

    this.setState({
      dataPost: newDataPost
    });
  }

  reloadData() {
    axios.get("http://localhost:3004/data-karyawan").then(res => {
      this.setState({
        dataAPI: res.data,
        edit: false
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
            value={this.state.dataPost.nama_karyawan}
            onChange={this.inputChange}
          />
          <input
            className="appearance-none block bg-grey-lighter mx-6 text-grey-darker border border-red rounded py-3 px-4 mb-3"
            id="grid-first-jabatan"
            type="text"
            name="jabatan"
            placeholder="Masukan Jabatan"
            value={this.state.dataPost.jabatan}
            onChange={this.inputChange}
          />
          <select
            className="appearance-none block bg-white mx-6 text-grey-darker border border-red rounded py-3 px-4 mb-3"
            name="jenis_kelamin"
            placeholder="Gender"
            value={this.state.dataPost.jenis_kelamin}
            onChange={this.inputChange}
          >
            <option value="Laki-Laki">Laki-laki</option>
            <option value="perempuan">Perempuan</option>
          </select>
          <input
            className="appearance-none block bg-grey-lighter mx-6 text-grey-darker border border-red rounded py-3 px-4 mb-3"
            type="date"
            name="tanggal_lahir"
            value={this.state.dataPost.tanggal_lahir}
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
                  <td>
                    <button
                      className="py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded"
                      value={dat.id}
                      onClick={this.getDataID}
                    >
                      Edit
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
