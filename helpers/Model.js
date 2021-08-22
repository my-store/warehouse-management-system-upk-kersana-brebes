const { AsyncNedb } = require("nedb-async")
const path = require("path")

const Produk = new AsyncNedb({filename: path.join(__dirname, "../databases", "Produk.db"), autoload: true, timestampData: true})
const Kategori = new AsyncNedb({filename: path.join(__dirname, "../databases", "Kategori.db"), autoload: true, timestampData: true})
const Transaksi = new AsyncNedb({filename: path.join(__dirname, "../databases", "Transaksi.db"), autoload: true, timestampData: true})
// const Pemasukan = new AsyncNedb({filename: path.join(__dirname, "../databases", "Pemasukan.db"), autoload: true, timestampData: true})
// const Keuntungan = new AsyncNedb({filename: path.join(__dirname, "../databases", "Keuntungan.db"), autoload: true, timestampData: true})
const Pengeluaran = new AsyncNedb({filename: path.join(__dirname, "../databases", "Pengeluaran.db"), autoload: true, timestampData: true})

const Model = {
    insert: async ({db, data}) => await eval(db).asyncInsert(data),
    getall: async ({ db }) => await eval(db).asyncFind({}, [
        ["limit", 100], 
        ["sort", {createdAt: -1}],
    ]),
    getwhere: async ({ db, data }) => await eval(db).asyncFind(data, [
        ["limit", 100], 
        ["sort", {createdAt: -1}],
    ]),
    getone: async ({db, data}) => await eval(db).asyncFindOne(data),
    update: async ({db, id, data}) => await eval(db).asyncUpdate({_id: id}, data),
    remove: async ({db, data}) => await eval(db).asyncRemove(data, [
        ["multi", true]
    ]),
}

module.exports = { Model }