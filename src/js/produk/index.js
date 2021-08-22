import React, { Component } from "react"
import Daftar from "./daftar"
import Baru from "./baru"

// Pengeluaran method
import { removePengeluaran } from "../pengeluaran"

// Get all products
export const getProduk = async () => await Database.getall({db: "Produk"})

// Insert product
export const insertProduk = async data => await Database.insert({db: "Produk", data})

// Get one product
export const oneProduk = async _id => await Database.getone({db: "Produk", data: {_id}})

// Search products
export const searchProduk = async _key => 
{
    const KEY = new RegExp(await Helper.String.upperCase(_key), "gi")
    return await Database.getwhere({db: "Produk", data: {nama: {$regex: KEY}}})
}

// Remove product
export const removeProduk = async ({ _id, reloadPengeluaran }) => 
{
    // Delete product
    await Database.remove({db: "Produk", data: {_id}})

    // Delete pengeluaran if exists
    const deletedPengeluaran = await removePengeluaran(_id)
    if(deletedPengeluaran == 1) {
        await reloadPengeluaran()
    }
}

// Entry point
export class Produk extends Component {
    constructor(props) {
        super(props)
        this.state = {
            _openNewForm: false,
        }
    }
    render() {
        return(
            <>
                <Baru opened={this.state._openNewForm} reloadPengeluaran={this.props.reloadPengeluaran} removeNewProduct={() => this.setState({_openNewForm: false})} reloadProduct={async () => {await this.props.reloadProduct(); this.setState({_openNewForm: false})}}/>
                <Daftar openNewProduct={() => this.setState({_openNewForm: true})} list={this.props.list} remove={async _id => {await removeProduk({_id, reloadPengeluaran: this.props.reloadPengeluaran}); this.props.reloadProduct()}}/>
            </>
        )
    }
}