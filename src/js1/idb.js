window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"};
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if (navigator.storage && navigator.storage.persist) {
    navigator.storage.persist().then((persistent) => {
      if (persistent) {
        console.log("Storage will not be cleared except by explicit user action");
      } else {
        console.log("Storage may be cleared by the UA under storage pressure.");
      }
    });
};

class Idb {
    constructor(){
        var request = indexedDB.open("motf");
        request.onerror = (event) => {
            console.log("IndexedDB initialization failed!");
        };
        request.onsuccess = (event) => {
            console.log("IndexedDB initialized.");
            this.db =event.target.result;
        };
        request.onupgradeneeded = (event) => {
            event.target.result.createObjectStore("store", { keyPath: "key" });
        };        
    }
    put (obj) {
        var store = this.db.transaction("store", "readwrite").objectStore("store");
        store.put(obj).onsuccess=(e)=>console.log("Data added to indexedDB.");
    }
    get (key, success=()=>{}) {
        var store = this.db.transaction("store", "readwrite").objectStore("store");
        store.get(key).onsuccess=(e)=>{ 
            success(e.target.result.value); // return undefined if no match found
        };
    }
    del (key, success=()=>{}) {
        var store = this.db.transaction("store", "readwrite").objectStore("store");
        store.delete(key).onsuccess=(e)=>{ 
            success(e.target.result);
        }
    }
    getAll (success=()=>{}){
        var store = this.db.transaction("store", "readwrite").objectStore("store");
        store.getAll().onsuccess=(e)=>{ 
            success(e.target.result.value);
        }        
    }
    getSampleURL (){
        var store = this.db.transaction("store", "readwrite").objectStore("store");
        store.get("Samples").onsuccess = function (event) {
            var data = event.target.result.value[0];
            console.log("Got it: ", data);
        
            // Get window.URL object
            var URL = window.URL || window.webkitURL;
        
            // Create and revoke ObjectURL
            var theURL = URL.createObjectURL(data.blob);
            
            console.log(theURL);

            // Revoking ObjectURL
          //  URL.revokeObjectURL(blob);
        };    
    }

}

var db = new Idb();



//console.log(idb.get('2'));
