import React, { useState } from "react"

// Style
import "../../scss/produk/daftar.scss"

// Entry point
export default function Daftar({ list, openNewProduct, remove })
{
    const [state, setState] = useState({
        actionBox: false,
        product: null
    })
    const openActionBox = async _id => {
        const data = await Database.getone({
            db: "Produk",
            data: {_id}
        })
        setState({actionBox: true, product: await data})
    }
    const removeActionBox = () => setState({actionBox: false, product: null})

    return(
        <div className="product-page">
            <div className="page-head">
                <h1 className="page-title">Produk <span>{list.length} data</span></h1>
                <div className="page-option">
                    <p onClick={() => openNewProduct()}>Tambahkan</p>
                </div>
            </div>
            <div className="table-head">
                <div className="table-row">
                    <div className="table-data nomor">
                        <p>No</p>
                    </div>
                    <div className="table-data nama">
                        <p>Nama</p>
                    </div>
                    <div className="table-data satuan">
                        <p>Satuan</p>
                    </div>
                    <div className="table-data harga-pokok">
                        <p>Harga Pokok</p>
                    </div>
                    <div className="table-data harga-jual">
                        <p>Harga Jual</p>
                    </div>
                    <div className="table-data stok">
                        <p>Stok</p>
                    </div>
                    <div className="table-data terjual">
                        <p>Terjual</p>
                    </div>
                    <div className="table-data tanggal">
                        <p>Masuk Pada</p>
                    </div>
                </div>
            </div>
            <div className="product-table">
                <div className={state.actionBox ? "product-action product-action-active" : "product-action"}>
                    <div className="box">
                        {
                            state.product != null ? 
                                <>
                                    <h1>{state.product.nama}</h1>
                                    <p>
                                        <span>Pokok</span>: Rp{Helper.String.numberFormat(state.product.harga.pokok)}
                                        <span className="spacer"></span>
                                        <span>Jual</span>: Rp{Helper.String.numberFormat(state.product.harga.jual)}
                                        <span className="spacer"></span>
                                        <span>Terjual</span>: {Helper.String.numberFormat(state.product.terjual)} {state.product.satuan}
                                    </p>
                                    <div className="buttons">
                                        <button className="action-update-btn">Ubah</button>
                                        <button className="action-delete-btn" onClick={async () => {await remove(state.product._id); removeActionBox()}}>Hapus</button>
                                        <button className="action-cancel-btn" onClick={() => removeActionBox()}>Batal</button>
                                    </div>
                                </>
                            : null
                        }
                    </div>
                </div>
                {
                    list.length > 0 ?
                        list.map((data, index) =>
                        {
                            return(
                                <div key={index} className="table-row" onClick={() => openActionBox(data._id)}>
                                    <div className="table-data nomor">
                                        <p>{index + 1}</p>
                                    </div>
                                    <div className="table-data nama">
                                        <p>{data.nama}</p>
                                    </div>
                                    <div className="table-data satuan">
                                        <p>{data.satuan}</p>
                                    </div>
                                    <div className="table-data harga-pokok">
                                        <p>Rp{Helper.String.numberFormat(data.harga.pokok)}</p>
                                    </div>
                                    <div className="table-data harga-jual">
                                        <p>Rp{Helper.String.numberFormat(data.harga.jual)}</p>
                                    </div>
                                    <div className="table-data stok">
                                        <p>{data.stok}</p>
                                    </div>
                                    <div className="table-data terjual">
                                        <p>{data.terjual}</p>
                                    </div>
                                    <div className="table-data tanggal">
                                        <p>
                                            {
                                                data.timestamp.hari 
                                                +" "+ 
                                                data.timestamp.tanggal 
                                                +" "+ 
                                                data.timestamp.tahun
                                                +" - "+ 
                                                data.timestamp.jam
                                                +":"+ 
                                                data.timestamp.menit
                                                +":"+ 
                                                data.timestamp.detik
                                                +" "+ 
                                                data.timestamp.format
                                            }
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                    : <p className="empty-table">Masih kosong</p>
                }
            </div>
        </div>
    )
}