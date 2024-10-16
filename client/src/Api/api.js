import axios from "axios";

const insertApi = "http://localhost:5072/api/Data/InsertData";
const fetchApi = "http://localhost:5072/api/Data/FetchData";
const getDataById = "http://localhost:5072/api/Data/FetchDataById";
const updateDataApi = "http://localhost:5072/api/Data/UpdateData";
const deleteDataApi = "http://localhost:5072/api/Data/DeleteData";

const Api = {
    insertData: (fData) => {
        axios({
            method: "POST",
            url: insertApi,
            data: fData,
            headers: {
                "Accept": "multipart/form-data",
            }
        }).then((res) => {
            console.log("Data Insert");
        }).catch((err) => {
            console.log("Error in Inserting Data");
        })
    },

    fetchData: () => {
        return axios({
            method: "GET",
            url: fetchApi,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },

    dataById: (id) => {
        return axios({
            method: "GET",
            url: `${getDataById}?id=${id}`,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    },

    updateData: (id, uData) => {
        axios({
            method: "POST",
            url: `${updateDataApi}/${id}`,
            data: uData,
            headers: {
                "Accept": "multipart/form-data",
            }
        }).then((res) => {
            console.log("Data Update", res);
        }).catch((err) => {
            console.log("Error in Updateing Data", err);
        })
    },

    deleteData: (id) => { 
        return axios({
            method:"DELETE",
            url:`${deleteDataApi}?id=${id}`
        })
    }

};

export default Api;
