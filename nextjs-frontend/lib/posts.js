// import fs from 'fs';
import axios from "axios"; // Import fetch for making API requests
// import { useAuth } from '../contexts/AuthContext';

const API_URL = "https://api-managewhistle.com";

export async function getDomains() {
    try {
        const response = await axios.get(`${API_URL}/api/get-domains/`);

        if (response.status !== 200) {
            throw new Error("Failed to fetch data");
        }

        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch data");
    }
}

export async function getAllPostsData() {
    try {
        const response = await axios.get(`${API_URL}/app/blog/get/`);

        if (response.status !== 200) {
            throw new Error("Failed to fetch data");
        }

        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch data");
    }
}