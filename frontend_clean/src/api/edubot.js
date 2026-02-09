import API from "./axios";

const edubotAPI = {
    sendMessage: async (text, context) => {
        try {
            const response = await API.post("/edubot/chat", { text, context });
            return response.data;
        } catch (error) {
            console.error("[EduBot API] Error sending message:", error);
            throw error;
        }
    },

    getHistory: async () => {
        try {
            const response = await API.get("/edubot/history");
            return response.data;
        } catch (error) {
            console.error("[EduBot API] Error fetching history:", error);
            throw error;
        }
    },

    clearHistory: async () => {
        try {
            const response = await API.delete("/edubot/history");
            return response.data;
        } catch (error) {
            console.error("[EduBot API] Error clearing history:", error);
            throw error;
        }
    }
};

export default edubotAPI;
