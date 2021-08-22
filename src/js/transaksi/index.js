import React, { Component } from "react"
import Jual from "./jual"
import Beli from "./beli"

// Style
import "../../scss/transaksi/index.scss"

// Data fetcher | All
export const getTransaksi = async () => {
    const all = await Database.getall({db: "Transaksi"})
    let penjualan = {hari: [], bulan: [], tahun: []}
    let pembelian = {hari: [], bulan: [], tahun: []}

    // Get helper
    const { tahun, bulan, hari } = await Helper.Time()

    // Pemisahan
    if(all.length > 0) {
        for(let x=0; x < all.length; x++) 
        {
            // Tahun ini
            if(all[x].timestamp.tahun === tahun) 
            {
                // Bulan ini
                if(all[x].timestamp.bulan === bulan)
                {
                    // Hari ini
                    if(all[x].timestamp.hari === hari)
                    {
                        // Penjualan | Dalam 1 hari
                        if(all[x].tipe === "Penjualan") {
                            penjualan.hari.push(all[x])
                        }
                        // Pembelian | Dalam 1 hari
                        else {
                            pembelian.hari.push(all[x])
                        }
                    }

                    // Penjualan | Dalam 1 bulan
                    if(all[x].tipe === "Penjualan") {
                        penjualan.bulan.push(all[x])
                    }
                    // Pembelian | Dalam 1 bulan
                    else {
                        pembelian.bulan.push(all[x])
                    }
                }

                // Penjualan | Dalam 1 tahun
                if(all[x].tipe === "Penjualan") {
                    penjualan.tahun.push(all[x])
                }
                // Pembelian | Dalam 1 tahun
                else {
                    pembelian.tahun.push(all[x])
                }
            }
        }
    }

    // Return data as object
    return {penjualan, pembelian}
}

// Insert Data
export const insertTransaksi = async data => await Database.insert({db: "Transaksi", data})

// Entry point
export class Transaksi extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _defaultForm: true
        }
    }

    switchForm = () => this.setState({_defaultForm: !this.state._defaultForm})

    render() {
        return(
            <div className="transaction-page">
                <div className="transaction-table">
                    <h1>Transaksi {this.state._defaultForm ? "Penjualan" : "Pembelian"}<span className={this.state._defaultForm ? "switch-trs-form" : "switch-trs-form switch-trs-form-active"} title={this.state._defaultForm ? "Ubah ke form pembelian" : "Ubah ke form penjualan"} onClick={() => this.switchForm()}></span></h1>
                    {
                        this.state._defaultForm ? <Jual {...this.props}/> : <Beli {...this.props}/>
                    }
                </div>
            </div>
        )
    }
}