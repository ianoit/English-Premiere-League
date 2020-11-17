// membuka database epl_database dan membuatkan jika belum ada
let dbPromised = idb.open("epl_database", 1, function(upgradedDb) {
	if (!upgradedDb.objectStoreNames.contains('teams')) {
        upgradedDb.createObjectStore("teams", {keyPath: "id"});
    }
});

// Menambahkan Operasi Simpan Artikel
const dbInsert = team => {
	dbPromised
	.then(function(db) {
		let tx = db.transaction("teams", "readwrite");
		let store = tx.objectStore("teams");
		console.log(team);
		store.put(team);
		return tx.complete;
	})
	.then(function() {
		console.log("Data berhasil di simpan.");
	});
}

// mengambil seluruh data dari Indexed DB
const dbGetAll = () => {
	return new Promise(function(resolve, reject) {
		dbPromised
		.then(function(db) {
			let tx = db.transaction("teams", "readonly");
			let store = tx.objectStore("teams");
			return store.getAll();
		})
		.then(function(articles) {
			resolve(articles);
		});
	});
}


const dbGetById = teamId => {
    return new Promise(function(resolve, reject) {
        dbPromised
        .then(function(db) {
            let tx = db.transaction("teams", "readonly");
            let store = tx.objectStore("teams");
            return store.get(teamId);
        })
        .then(function(team) {
            resolve(team);
        });
    });
}

const dbDelete = teamId => {
    return new Promise(function(resolve, reject) {
        dbPromised
        .then(function(db) {
            let tx = db.transaction("teams", "readwrite");
            tx.objectStore("teams").delete(teamId);
            return tx;
        })
        .then(function(team) {
            resolve(team);
        });
    });
}