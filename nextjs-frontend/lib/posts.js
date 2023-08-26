// import fs from 'fs';
import fetch from 'node-fetch'; // Import fetch for making API requests
// import { useAuth } from '../contexts/AuthContext';

const API_URL = 'https://api-managewhistle.com/app/blog/get/';

export async function getAllPostsData() {
    const response = await fetch(API_URL);
    const allPostsData = await response.json();
    return allPostsData;
}