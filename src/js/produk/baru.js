import React, { Component } from "react"

// Style
import "../../scss/produk/baru.scss"

// Pengeluaran method
import { insertPengeluaran } from "../pengeluaran"

// Produk method
import { insertProduk } from "./"

// Entry point
export default class ProdukBaru extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _satuan: null,
            _openSatuan: false,
        }
    }

    changeSatuan = _satuan => this.setState({_satuan, _openSatuan: false})

    removeNewProductBox = () => 
    {
        // Reset form
        const newProductForm = document.getElementsByClassName("new-product-form")[0]
        newProductForm.reset()

        this.setState({_satuan: null})
        this.props.removeNewProduct()
    }

    saveNewData = async () => {
        const time = await Helper.Time()

        const data = {
            nama: document.getElementById("nama").value,
            harga: {
                pokok: document.getElementById("harga-pokok").value,
                jual: document.getElementById("harga-jual").value,
            },
            stok: document.getElementById("stok").value,
            satuan: this.state._satuan,
        }
        if(
            data.nama != "" 
            && 
            data.harga.pokok != ""
            && 
            data.harga.jual != ""
            && 
            data.stok != ""
            && 
            data.satuan != null
        ) {
            // Disable save button
            const formSaveBtn = document.getElementsByClassName("new-product-save-btn")[0]
            formSaveBtn.setAttribute("onclick", null)

            // Insert product
            const insertedProduct = await insertProduk({
                nama: await Helper.String.upperCase(data.nama),
                harga: data.harga,
                stok: data.stok,
                terjual: 0,
                satuan: data.satuan,
                timestamp: time,
            })

            // Insert spending
            const spendingCheck = document.getElementById("check-as-spending")
            if(spendingCheck.checked) 
            {
                await insertPengeluaran({
                    _id: insertedProduct._id, // ID yang sama dengan produk
                    detail: "Pembelian produk " + await Helper.String.upperCase(data.nama) +" sebanyak "+ data.stok +" "+ data.satuan,
                    total: (data.harga.pokok * data.stok),
                    timestamp: time,
                })

                // Reload pengeluaran data
                await this.props.reloadPengeluaran()
            }

            // Remove new-product-form and form value
            await this.removeNewProductBox()

            // Reload data
            this.props.reloadProduct()
        }
        else return false
    }
    render() {
        return(
            <div className={this.props.opened ? "new-product-page new-product-page-active" : "new-product-page"}>
                <form className="new-product-form">
                    <h1>Produk Baru</h1>
                    <div className="form-group">
                        <label>Nama</label>
                        <input id="nama"/>
                    </div>
                    <div className="form-group">
                        <label>Harga Pokok</label>
                        <input type="number" id="harga-pokok"/>
                    </div>
                    <div className="form-group">
                        <label>Harga Jual</label>
                        <input type="number" id="harga-jual"/>
                    </div>
                    <div className="form-group">
                        <label>Stok</label>
                        <input type="number" id="stok"/>
                    </div>
                    <div className="form-group">
                        <label>Satuan</label>
                        <div className="satuan-btn" onClick={() => this.setState({_openSatuan: !this.state._openSatuan})}>
                            <p className="satuan-label">{this.state._satuan == null ? "Pilih satuan" : this.state._satuan}</p>
                            <p className={this.state._openSatuan ? "satuan-icon satuan-icon-active" : "satuan-icon"}></p>
                        </div>
                        <div className={this.state._openSatuan ? "satuan-items satuan-items-active" : "satuan-items"}>
                            <p onClick={() => this.changeSatuan("Kilo")}>Kilo</p>
                            <p onClick={() => this.changeSatuan("Meter")}>Meter</p>
                            <p onClick={() => this.changeSatuan("Bungkus")}>Bungkus</p>
                            <p onClick={() => this.changeSatuan("Centimeter")}>Centimeter</p>
                        </div>
                    </div>
                    <div className="form-group form-btns" style={{justifyContent: "unset"}}>
                        <input type="checkbox" id="check-as-spending"/>
                        <label>Masukkan sebagain pengeluaran?</label>
                    </div>
                    <div className="form-group form-btns">
                        <button className="new-product-save-btn" type="button" onClick={this.saveNewData}>Simpan</button>
                        <button className="new-product-cancel-btn" type="button" onClick={this.removeNewProductBox}>Batal</button>
                    </div>
                </form>
            </div>
        )
    }
}