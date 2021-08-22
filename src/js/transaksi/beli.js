import React, { Component } from "react"

// Style
import "../../scss/transaksi/beli.scss"

// Transaksi method
import { insertTransaksi } from "./"

// Pengeluaran method
import { insertPengeluaran } from "../pengeluaran"

// Entry point
export default class Pembelian extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {}

    getTransaction = async () => {
        const total = document.getElementById("trs-beli-amount").value
        const detail = document.getElementById("trs-beli-detail").value

        // Get time
        const time = await Helper.Time()

        if(total != "" && detail != "")
        {
            // Data transaksi
            const dataTransaksi = {
                total,
                detail,
                keuntungan: 0,
                timestamp: time,
                tipe: "Pembelian",
            }

            // Data pengeluaran
            const dataPengeluaran = {
                total,
                detail,
                timestamp: time,
            }

            // Reset form
            await this.resetForm()

            // Insert transaction data
            await insertTransaksi(dataTransaksi)

            // Insert pengeluaran
            await insertPengeluaran(dataPengeluaran)

            // Reload pengeluaran
            this.props.reloadPengeluaran()
        }
    }

    resetForm = () => {
        const beliForm = document.getElementsByClassName("trs-beli-form")[0]
        beliForm.reset()
    }

    render() {
        return(
            <form className="trs-beli-form" onSubmit={e => e.preventDefault()}>
                <div className="form-group">
                    <input type="number" id="trs-beli-amount" placeholder="Jumlah"/>
                </div>
                <div className="form-group">
                    <textarea id="trs-beli-detail" placeholder="Pembelian untuk?"></textarea>
                </div>
                <div className="form-group form-btns">
                    <button className="checkout-y-btn" type="button" onClick={this.getTransaction}>Checkout</button>
                    <button className="checkout-n-btn" type="button" onClick={this.resetForm}>Batal</button>
                </div>
            </form>
        )
    }
}