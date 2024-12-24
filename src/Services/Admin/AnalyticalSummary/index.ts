import apiInstance from "../../apiservice/apiInstance";

// Function to get candidate distribution
export const candidatedistributionapicall = async () => {
    const response: any | null = await apiInstance.get("/analytical/candidate-distribution");
    return response.data;
};

// Function to get work experience analysis
export const workexperienceanalysisapicall = async () => {
    const response: any | null = await apiInstance.get("/analytical/work-experience-analysis");
    return response.data;
};

// Function to get current CTC analysis
export const currentctcanalysisapicall = async () => {
    const response: any | null = await apiInstance.get("/analytical/current-ctc-analysis");
    return response.data;
};

// Function to get geographical distribution
export const geographicaldistributionapicall = async () => {
    const response: any | null = await apiInstance.get("/analytical/geographical-distribution");
    return response.data;
};

// Function to get education level analysis
export const educationlevelanalysisapicall = async () => {
    const response: any | null = await apiInstance.get("/analytical/education-level-analysis");
    return response.data;
};

// Function to get reasons for leaving analysis
export const reasonsforleavinganalysisapicall = async () => {
    const response: any | null = await apiInstance.get("/analytical/reasons-for-leaving-analysis");
    return response.data;
};

// Function to get client analysis
export const clientanalysisapicall = async () => {
    const response: any | null = await apiInstance.get("/analytical/client-analysis");
    return response.data;
};

// Function to get tag analysis
export const taganalysisapicall = async () => {
    const response: any | null = await apiInstance.get("/analytical/tag-analysis");
    return response.data;
};

// Function to get candidate age distribution
export const candidateagedistributionapicall = async () => {
    const response: any | null = await apiInstance.get("/analytical/candidate-age-distribution");
    return response.data;
};


// Function to get common answer combinations
export const getCommonAnswerdemographics = async () => {
    const response: any | null = await apiInstance.get("/analytical/answers/demographics");
    return response.data;
};

// Function to get answer trends
export const getAnswerTrends = async () => {
    const response: any | null = await apiInstance.get("/analytical/answers/trends");
    return response.data;
};

// Function to get candidate stats per answer
export const getCandidateStatsPerAnswer = async () => {
    const response: any | null = await apiInstance.get("/analytical/answers/candidate-stats");
    return response.data;
};

// Function to get answers by experience
export const getAnswersByExperience = async () => {
    const response: any | null = await apiInstance.get("/analytical/answers/by-experience");
    return response.data;
};