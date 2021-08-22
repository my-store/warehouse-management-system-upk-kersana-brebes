import React, { Component } from "react"
import ReactDOM from "react-dom"

// Style
import "../scss/index.scss"

// Produk
import { Produk, getProduk } from "./produk"

// Transaksi
import { Transaksi } from "./transaksi"

// Pemasukan
import { Pemasukan, getPemasukan } from "./pemasukan"

// Pengeluaran
import { Pengeluaran, getPengeluaran } from "./pengeluaran"

// Keuntungan
import { Keuntungan, getKeuntungan } from "./keuntungan"

// App container
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            produk: [],
            pemasukan: {/* Total hari, bulan & tahun */},
            keuntungan: {/* Total hari, bulan & tahun */},
            pengeluaran: {/* Total hari, bulan & tahun */},
        }
    }

    // Autoload
    async componentDidMount() {
        await this.loadProduct()
        await this.loadPemasukan()
        await this.loadKeuntungan()
        await this.loadPengeluaran()
    }

    // Produk
    loadProduct = async () => {
        const produk = await getProduk()
        this.setState({produk})
    }

    // Pemasukan
    loadPemasukan = async () => {
        const pemasukan = await getPemasukan()
        this.setState({pemasukan})
    }

    // Keuntungan
    loadKeuntungan = async () => {
        const keuntungan = await getKeuntungan()
        this.setState({keuntungan})
    }

    // Pengeluaran
    loadPengeluaran = async () => {
        const pengeluaran = await getPengeluaran()
        this.setState({pengeluaran})
    }

    // Render
    render() {
        return(
            <div className="pages">
                <div className="top-page">
                    <div className="office">
                        <div className="office-brand">
                            <div className="office-logo"></div>
                            <h1 className="office-name">Toko Cahaya Albany</h1>
                        </div>
                        <div className="office-detail">
                            <p>
                                Desa Kradenan kecamatan Kersana kabupaten Brebes Jawa tengah Indonesia.
                            </p>
                            <p>
                                (+62) 813-9355-2220
                            </p>
                        </div>
                    </div>
                    <Produk list={this.state.produk} reloadProduct={this.loadProduct} reloadPengeluaran={this.loadPengeluaran}/>
                </div>
                <div className="bottom-page">
                    <Transaksi list={this.state.transaksi} reloadKeuntungan={this.loadKeuntungan} reloadPemasukan={this.loadPemasukan} reloadPengeluaran={this.loadPengeluaran}/>
                    <Pemasukan list={this.state.pemasukan}/>
                    <Pengeluaran list={this.state.pengeluaran}/>
                    <Keuntungan list={this.state.keuntungan}/>
                </div>
            </div>
        )
    }
}

// Entry point
ReactDOM.render(<App />, document.getElementById("root"))