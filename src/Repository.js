import dayjs from "dayjs";

const {API_URL} = require("./constants");


class Repository {

    async fetchServices() {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            mode: "cors"
        };

        const services = await fetch(API_URL + "/api/services/all", requestOptions)
            .then(response => response.json())
        return services
    }

    async fetchBranches() {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            mode: "cors"
        };

        const branches = await fetch(API_URL + "/api/branch/all", requestOptions)
            .then(response => response.json())
        return branches
    }

    async fetchAvailableHours(branchId, date) {

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        var isoString = date.toISOString()
        var yyyymmddFormat = isoString.split("T")[0]

        return await fetch(API_URL + `/api/branch/${branchId}/free_hours?date=${yyyymmddFormat}`, requestOptions)
            .then(response => response.json())
            .catch(error => console.log('error', error))
    }

    async fetchAvailableHoursBulk(branches, date) {
        var branchData = {}
        await Promise.all(
            branches.map(async (branch) => {
                const availableHours = await this.fetchAvailableHours(branch.id, date)
                branchData[branch.id] = availableHours
            })
        )
        return branchData

    }

    async createAppointment(branchId, date) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        //"2023-01-13T17:15:17.433Z"
        var dateObj = dayjs(date)
        const dateString = dateObj.format("YYYY-MM-DD HH:mm:ss")
        console.log(dateString)
        var raw = JSON.stringify({
            "customer": "6cea57c2fb6cbc2a40411135005760f241fffc3e5e67ab99882726431037f908",
            "dog": "1",
            "branch": branchId,
            "start": dateString

        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const result = await fetch("http://localhost:8000/api/appointment", requestOptions)
            .then(response => response.json())
        return result
    }

}

export default Repository