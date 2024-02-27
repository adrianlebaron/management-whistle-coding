import axios from "axios";

const API_URL = "https://api-managewhistle.com";

export async function getDrywallDomains() {
    try {
        const response = await axios.get(`${API_URL}/app/domain/get-drywall-domains/`);

        if (response.status !== 200) {
            throw new Error("Failed to fetch data");
        }

        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch data");
    }
}

export async function getFamilyDomains() {
    try {
        const response = await axios.get(`${API_URL}/app/domain/get-family-domains/`);

        if (response.status !== 200) {
            throw new Error("Failed to fetch data");
        }

        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch data");
    }
}

export async function getCommunityDomains() {
    try {
        const response = await axios.get(`${API_URL}/app/domain/get-community-domains/`);

        if (response.status !== 200) {
            throw new Error("Failed to fetch data");
        }

        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch data");
    }
}

export async function getOtherDomains() {
    try {
        const response = await axios.get(`${API_URL}/app/domain/get-other-domains/`);

        if (response.status !== 200) {
            throw new Error("Failed to fetch data");
        }

        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch data");
    }
}