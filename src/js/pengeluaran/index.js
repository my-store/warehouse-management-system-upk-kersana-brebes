import React, { Component } from "react"

// Style
import "../../scss/pengeluaran/index.scss"

// Insert
export const insertPengeluaran = async data => await Database.insert({db: "Pengeluaran", data})

// Delete
export const removePengeluaran = async _id => await Database.remove({db: "Pengeluaran", data: {_id}})

// Get all pengeluaran
export const getPengeluaran = async () => 
{
    let _totalBulan = 0 // default/ if empty
    let _totalHari = 0 // default/ if empty
    let _totalTahun = 0 // default/ if empty

    // Get time from API
    let { tahun, bulan, hari } = await Helper.Time()

    // Get helper
    const { numberFormat } = await Helper.String

    // Get data from database
    const data = await Database.getwhere({db: "Pengeluaran", data: {"timestamp.tahun": tahun}})

    if(data.length > 0) {
        for(let x=0; x < data.length; x++) 
        {
            // Selama 1 bulan
            if(data[x].timestamp.bulan === bulan) 
            {
                _totalBulan += parseInt(data[x].total)

                // Selama 1 hari
                if(data[x].timestamp.hari === hari) {
                    _totalHari += parseInt(data[x].total)
                }
            }

            // Selama 1 tahun
            _totalTahun += parseInt(data[x].total)
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
export class Pengeluaran extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _openList: false
        }
    }
    render() {
        return(
            <div className="spending-page">
                <div className="spending-table">
                    <h1>Pengeluaran <span title="Lihat daftar" onClick={() => this.setState({_openList: !this.state._openList})} className={this.state._openList ? "spending-btn spending-btn-active" : "spending-btn"}></span></h1>
                    <div className="spending-detail">                        
                        <p>Hari ini</p>
                        <h3>Rp{this.props.list._totalHari}</h3>
                        <div className="spacer"></div>
                        <p>Bulan ini</p>
                        <h3>Rp{this.props.list._totalBulan}</h3>
                        <div className="spacer"></div>
                        <p>Tahun ini</p>
                        <h3>Rp{this.props.list._totalTahun}</h3>
                    </div>
                    <div className={this.state._openList ? "spending-list spending-list-active" : "spending-list"}>
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