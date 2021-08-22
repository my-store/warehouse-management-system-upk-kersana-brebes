import React, { Component } from "react"

// Style
import "../../scss/keuntungan/index.scss"

// Transaksi method
import { getTransaksi } from "../transaksi"

// Data fetcher | All
export const getKeuntungan = async () => 
{
    let _totalBulan = 0 // default/ if empty
    let _totalHari = 0 // default/ if empty
    let _totalTahun = 0 // default/ if empty

    // Get helper
    const { numberFormat } = await Helper.String

    // Get transaction data
    const { penjualan } = await getTransaksi()
    const { tahun, bulan, hari } = penjualan

    // Dalam 1 tahun
    if(tahun.length > 0) {
        for(let x=0; x < tahun.length; x++) {
            _totalTahun += parseInt(tahun[x].keuntungan)
        }
    }

    // Dalam 1 bulan
    if(bulan.length > 0) {
        for(let x=0; x < bulan.length; x++) {
            _totalBulan += parseInt(bulan[x].keuntungan)
        }
    }

    // Dalam 1 hari
    if(hari.length > 0) {
        for(let x=0; x < hari.length; x++) {
            _totalHari += parseInt(hari[x].keuntungan)
        }
    }

    // Number formating
    _totalHari = numberFormat(_totalHari)
    _totalBulan = numberFormat(_totalBulan)
    _totalTahun = numberFormat(_totalTahun)

    // Retrun data
    return {_totalHari, _totalBulan, _totalTahun}
}

// Entry point
export class Keuntungan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _openList: false
        }
    }
    render() {
        return(
            <div className="margin-page">
                <div className="margin-table">
                    <h1>Keuntungan <span title="Lihat daftar" onClick={() => this.setState({_openList: !this.state._openList})} className={this.state._openList ? "margin-btn margin-btn-active" : "margin-btn"}></span></h1>
                    <div className="margin-detail">
                        <p>Hari ini</p>
                        <h3>Rp{this.props.list._totalHari}</h3>
                        <div className="spacer"></div>
                        <p>Bulan ini</p>
                        <h3>Rp{this.props.list._totalBulan}</h3>
                        <div className="spacer"></div>
                        <p>Tahun ini</p>
                        <h3>Rp{this.props.list._totalTahun}</h3>
                    </div>
                    <div className={this.state._openList ? "margin-list margin-list-active" : "margin-list"}>
                        <p>List 1</p>
                        <p>List 2</p>
                        <p>List 3</p>
                        <p>List 4</p>
                        <p>List 5</p>
                    </div>
                </div>
            </div>
        )
    }
}