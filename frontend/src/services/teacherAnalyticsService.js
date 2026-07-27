import api from "../api/axios";

const teacherAnalyticsService = {

    getAnalytics() {
        return api.get("/teacher/analytics");
    },

    getRecentExams() {
        return api.get("/teacher/analytics/recent-exams");
    }

};

export default teacherAnalyticsService;