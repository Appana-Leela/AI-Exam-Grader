import api from "../api/axios";

const dashboardService = {

    getTeacherDashboard() {

        return api.get(
            "/dashboard/teacher"
        );

    }

};

export default dashboardService;