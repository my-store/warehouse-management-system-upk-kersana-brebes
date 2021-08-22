import React, { Component } from "react"

// Style
import "../../scss/transaksi/jual.scss"

// Product method
import { searchProduk, oneProduk } from "../produk"

// Transaksi method
import { insertTransaksi } from "./"

// Entry point
export default class Penjualan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            produk: [],
            _openSearchProduct: false,
            _transaction: {
                products: [],
                total: 0
            },
        }
    }

    searchProduct = async _key => {
        if(_key != "") {
            const produk = await searchProduk(_key)
            this.setState({produk, _openSearchProduct: true})
        }
        else {
            this.setState({produk: [], _openSearchProduct: false})
        }
    }

    prepareTransaction = async _id => {
        const searchProductInput = document.getElementById("search-product-input")
        searchProductInput.value = null

        // Get selected product data
        let product = await oneProduk(_id)
        product = Object.assign({}, product, {beli: 1}) // Push 1 to order-amount as default

        // Push selected product as first element
        const products = this.state._transaction.products.concat(product).reverse()

        // Order amount
        const total = parseInt(product.harga.jual) + this.state._transaction.total

        // Change state
        this.setState({produk: [], _openSearchProduct: false, _transaction: {products, total}})
    }
    getTransaction = async () => {
        const { products } = this.state._transaction

        if(products.length > 0) {
            let total = 0
            let keuntungan = 0

            let detailTransaksi = "Penjualan produk "

            for(let x=0; x < products.length; x++) 
            {
                const jumlahBeli = parseInt(products[x].beli)
                const hargaJual = parseInt(products[x].harga.jual)
                const hargaPokok = parseInt(products[x].harga.pokok)

                // Keuntungan
                keuntungan += (hargaJual - hargaPokok)
                keuntungan *= jumlahBeli

                // Total transaksi
                total += (hargaJual * jumlahBeli)

                // Detail transaksi
                const splitPerProduk = products[x].nama +" "+ products[x].beli +" "+ products[x].satuan
                if(products.length > 1) {
                    if(x < products.length) {
                        detailTransaksi += `${splitPerProduk}, ` // Tambahkan koma
                    }
                    else {
                        detailTransaksi += `${splitPerProduk}.` // Tambahkan titik
                    }
                }
                else {
                    detailTransaksi += `${splitPerProduk}.` // Tambahkan titik
                }
            }

            // Prepare data
            const data = {
                total,
                keuntungan,
                detail: detailTransaksi,
                timestamp: await Helper.Time(),
                tipe: "Penjualan",
            }

            // Insert transaction data
            await insertTransaksi(data)

            // Reload keuntungan
            await this.props.reloadKeuntungan()

            // Reload pemasukan
            await this.props.reloadPemasukan()

            // Reset transaction data
            this.cancelTransaction()
        }
    }
    deleteTransaction = async _id => {
        let { products, total } = this.state._transaction
        if(products.length > 1) {
            const {harga: {jual}} = await oneProduk(_id)
            total -= parseInt(jual)
            products = products.map(dt => dt._id !== _id)
        }
        else {
            products = []
            total = 0
        }
        this.setState({_transaction: {products, total}})
    }
    cancelTransaction = () => {
        this.setState({
            produk: [], 
            _openSearchProduct: false, 
            _transaction: {products: [], total: 0},
        })
    }

    removeSearchBox = () => {
        document.getElementById("search-product-input").value = null
        this.setState({produk: [], _openSearchProduct: false})
    }

    increaseAmount = _id => {
        let { products, total } = this.state._transaction
        products = products.map(dt => {
            let prd = dt
            if(dt._id === _id) {
                if(parseInt(prd.beli) <= (parseInt(prd.stok) -1)) {
                    prd.beli += 1
                    total += parseInt(prd.harga.jual)
                }
            }
            return prd
        })
        this.setState({_transaction: {products, total}})
    }
    decreaseAmount = _id => {
        let { products, total } = this.state._transaction
        products = products.map(dt => {
            let prd = dt
            if(dt._id === _id) {
                if(parseInt(prd.beli) > 1) {
                    prd.beli -= 1
                    total -= parseInt(prd.harga.jual)
                }
            }
            return prd
        })
        this.setState({_transaction: {products, total}})
    }

    render() {
        return(
            <div className="trs-jual-form">
                <div className="form-group">
                    <input id="search-product-input" placeholder="Cari produk" onChange={async ({ target: {value} }) => await this.searchProduct(value)}/>
                    <div className={this.state._openSearchProduct ? "search-product-container search-product-container-active" : "search-product-container"}>
                        {
                            this.state.produk.length > 0 ? 
                                this.state.produk.map((data, index) => <p key={index + 1} onClick={() => this.prepareTransaction(data._id)}>{data.nama}</p>)
                            : <p className="empty-result">Tidak ditemukan</p>
                        }
                    </div>
                    {this.state._openSearchProduct ? <div className="search-product-close" title="Tutup" onClick={() => this.removeSearchBox()}></div> : null}
                </div>

                <div className="form-group">
                    <div className="trs-detail">
                        <div className="trs-detail-product">
                            {
                                this.state._transaction.products.length > 0 ?
                                    this.state._transaction.products.map((data, index) => {
                                        return(
                                            <div key={index} className="trs-items">
                                                <div className="trs-items-detail">
                                                    <p className="nama">{data.nama}</p>
                                                    <p className="harga">Rp{Helper.String.numberFormat(data.harga.jual)} <strong>x{Helper.String.numberFormat(data.beli)}</strong></p>
                                                </div>
                                                <div className="trs-action-btn-container">
                                                    <div className="trs-action-decrease-btn" onClick={() => this.decreaseAmount(data._id)}></div>
                                                    <div className="trs-action-increase-btn" onClick={() => this.increaseAmount(data._id)}></div>
                                                    <div className="trs-action-remove-btn" onClick={() => this.deleteTransaction(data._id)}></div>
                                                </div>
                                            </div>
                                        )
                                    })
                                : <p className="empty-text">Masih kosong.</p>
                            }
                        </div>
                        <div className="trs-detail-line"></div>
                        <div className="trs-detail-total">
                            <p>Total</p>
                            <h1>Rp{Helper.String.numberFormat(this.state._transaction.total)}</h1>
                        </div>
                    </div>
                </div>

                <div className="form-group form-btns">
                    <button className="checkout-y-btn" type="button" onClick={this.getTransaction}>Checkout</button>
                    <button className="checkout-n-btn" type="button" onClick={this.cancelTransaction}>Batal</button>
                </div>
            </div>
        )
    }
}