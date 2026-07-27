import api from "../api/axios";

const studentDashboardService = {

    getDashboard() {
        return api.get("/student/dashboard");
    }

};

export default studentDashboardService;