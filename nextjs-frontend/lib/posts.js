import fs from 'fs';
import fetch from 'node-fetch'; // Import fetch for making API requests
// import { useAuth } from '../contexts/AuthContext';

const API_URL = 'http://127.0.0.1:8000/app/blog/get/';


export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);

    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ''),
            },
        };
    });
}

export async function getAllPostsData() {
    const response = await fetch(API_URL);
    const allPostsData = await response.json();
    return allPostsData;
}