// import React, { useState } from 'react';
// import Layout from '../../../component/Layout/Layout';
// import Chart from 'react-apexcharts';
// import {candidateagedistributionapicall,taganalysisapicall,clientanalysisapicall,reasonsforleavinganalysisapicall,educationlevelanalysisapicall,geographicaldistributionapicall,currentctcanalysisapicall,workexperienceanalysisapicall,candidatedistributionapicall} from "../../../Services/Admin/AnalyticalSummary";


// const Analytical: React.FC = () => {
//     const [candidateAgeDistribution, setCandidateAgeDistribution] = useState<any>();
//     const [tagAnalysis, setTagAnalysis] = useState<any>();
//     const [clientAnalysis, setClientAnalysis] = useState<any>();
//     const [reasonsForLeavingAnalysis, setReasonsForLeavingAnalysis] = useState<any>();
//     const [educationLevelAnalysis, setEducationLevelAnalysis] = useState<any>();
//     const [geographicalDistribution, setGeographicalDistribution] = useState<any>();
//     const [currentCTCAnalysis, setCurrentCTCAnalysis] = useState<any>();
//     const [workExperienceAnalysis, setWorkExperienceAnalysis] = useState<any>();
//     const [candidateDistribution, setCandidateDistribution] = useState<any>();
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string>('');
    
//     const fetchCandidateAgeDistribution = async () => {
//         try {
//             const data = await candidateagedistributionapicall();
//             setCandidateAgeDistribution(data);
//         } catch (error) {
//             setError('Failed to fetch data');
//         }
//     };
//     const fetchTagAnalysis = async () => {
//         try {
//             const data = await taganalysisapicall();
//             setTagAnalysis(data);
//         } catch (error) {
//             setError('Failed to fetch data');
//         }
//     };
//     const fetchClientAnalysis = async () => {
//         try {
//             const data = await clientanalysisapicall();
//             setClientAnalysis(data);
//         } catch (error) {
//             setError('Failed to fetch data');
//         }
//     };
//     const fetchReasonsForLeavingAnalysis = async () => {
//         try {
//             const data = await reasonsforleavinganalysisapicall();
//             setReasonsForLeavingAnalysis(data);
//         } catch (error) {
//             setError('Failed to fetch data');
//         }
//     };
//     const fetchEducationLevelAnalysis = async () => {
//         try {
//             const data = await educationlevelanalysisapicall();
//             setEducationLevelAnalysis(data);
//         } catch (error) {
//             setError('Failed to fetch data');
//         }
//     };
//     const fetchGeographicalDistribution = async () => {
//         try {
//             const data = await geographicaldistributionapicall();
//             setGeographicalDistribution(data);
//         } catch (error) {
//             setError('Failed to fetch data');
//         }
//     };
//     const fetchCurrentCTCAnalysis = async () => {
//         try {
//             const data = await currentctcanalysisapicall();
//             setCurrentCTCAnalysis(data);
//         } catch (error) {
//             setError('Failed to fetch data');
//         }
//     };
//     const fetchWorkExperienceAnalysis = async () => {
//         try {
//             const data = await workexperienceanalysisapicall();
//             setWorkExperienceAnalysis(data);
//         } catch (error) {
//             setError('Failed to fetch data');
//         }
//     };
//     const fetchCandidateDistribution = async () => {
//         try {
//             const data = await candidatedistributionapicall();
//             setCandidateDistribution(data);
//         } catch (error) {
//             setError('Failed to fetch data');
//         }
//     }
//     React.useEffect(() => {
//         fetchCandidateAgeDistribution();
//         fetchTagAnalysis();
//         fetchClientAnalysis();
//         fetchReasonsForLeavingAnalysis();
//         fetchEducationLevelAnalysis();
//         fetchGeographicalDistribution();
//         fetchCurrentCTCAnalysis();
//         fetchWorkExperienceAnalysis();
//         fetchCandidateDistribution();
        
        
//     }, []);
//     const CandidateAgeDistibutionOptions = {

//         options: {

//             chart: {

//                 id: 'reasons-chart',

//             },

//             labels: candidateAgeDistribution?.labels,

//             title: {

//                 text: 'Candidate Age Distribution',

//             },

//         },

//         series: candidateAgeDistribution?.series,

//     };

//     return (

//         <Layout>

//             <div className="flex flex-col w-full justify-center px-3 gap-10 relative block overflow-y-scroll">

//                 <h1 className="text-2xl font-bold mb-5">Analytical</h1>
//                 <Chart

//                             options={CandidateAgeDistibutionOptions.options}

//                             series={CandidateAgeDistibutionOptions.series}

//                             type="pie"

//                             height={350}

//                         />
            

//             </div>
        
//         </Layout>

//     );

// };


// export default Analytical;



import React, { useState, useEffect } from 'react';
import Layout from '../../../component/Layout/Layout';
import Chart from 'react-apexcharts';
import {candidateagedistributionapicall,taganalysisapicall,clientanalysisapicall,reasonsforleavinganalysisapicall,educationlevelanalysisapicall,geographicaldistributionapicall,currentctcanalysisapicall,workexperienceanalysisapicall,candidatedistributionapicall} from "../../../Services/Admin/AnalyticalSummary";

const Analytical: React.FC = () => {
    const [candidateAgeDistribution, setCandidateAgeDistribution] = useState<any>();
    const [tagAnalysis, setTagAnalysis] = useState<any>();
    const [educationLevelAnalysis, setEducationLevelAnalysis] = useState<any>();
    const [clientAnalysis, setClientAnalysis] = useState<any>();
    const [geographicalDistribution, setGeographicalDistribution] = useState<any>();
    const [currentCTCAnalysis, setCurrentCTCAnalysis] = useState<any>();
    const [workExperienceAnalysis, setWorkExperienceAnalysis] = useState<any>();
    const [candidateDistribution, setCandidateDistribution] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    
    const fetchCandidateAgeDistribution = async () => {
        try {
            const data = await candidateagedistributionapicall();
            // Transform the data into the desired format
            const ageData = data[0]; // Assuming data is in the form of an array with a single object
            const labels = Object.keys(ageData); // Extract labels (age groups)
            const series = Object.values(ageData).map(value => parseInt(value as string)); // Convert values to integers
            setCandidateAgeDistribution({ labels, series });
        } catch (error) {
            setError('Failed to fetch data');
        }
    };
    const fetchTagAnalysis = async () => {
        try {
            const data = await taganalysisapicall();
            // Transform the data into the desired format
            const labels = data.map((item: { tag: string }) => item.tag); // Extract tags as labels
            const series = data.map((item: { count: any; }) => item.count); // Extract counts as series
            setTagAnalysis({ labels, series });
        } catch (error) {
            setError('Failed to fetch data');
        }
    };
    const fetchClientAnalysis = async () => {
        try {
            const data = await clientanalysisapicall();
            // Transform the data into the desired format
            const labels = data.map((item: { status: any; }) => item.status); // Extract statuses as labels
            const series = data.map((item: { count: any; }) => item.count); // Extract counts as series
            setClientAnalysis({ labels, series });
        } catch (error) {
            setError('Failed to fetch data');
        }
    };
    const fetchEducationLevelAnalysis = async () => {
        try {
            const data = await educationlevelanalysisapicall();
            // Extract the counts for UG, PG, and Post-PG
            const educationData = data[0]; // Assuming there's only one object in the array
            const categories = ['UG', 'PG', 'Post-PG']; // Education categories
            const series = [
                {
                    name: 'Education Levels',
                    data: [
                        educationData.ugCount,
                        educationData.pgCount,
                        educationData.postPgCount
                    ],
                }
            ];
            setEducationLevelAnalysis({ categories, series });
        } catch (error) {
            setError('Failed to fetch data');
        }
    };
    const fetchGeographicalDistribution = async () => {
        try {
            const data = await geographicaldistributionapicall();
            // Extract locations and counts
            const locations = data.map((item: { currentLocation: any; }) => item.currentLocation); // Extract currentLocation as labels
            const counts = data.map((item: { count: any; }) => item.count); // Extract count as series data
            setGeographicalDistribution({ locations, counts });
        } catch (error) {
            setError('Failed to fetch data');
        }
    };
    const fetchCurrentCTCAnalysis = async () => {
        try {
            const response = await currentctcanalysisapicall();
            const data = response.data[0]; // Accessing the first object in the array
            setCurrentCTCAnalysis(data);
        } catch (error) {
            setError('Failed to fetch data');
        }
    };

    const fetchWorkExperienceAnalysis = async () => {
        try {
            const data = await workexperienceanalysisapicall();
            setWorkExperienceAnalysis(data);
        } catch (error) {
            setError('Failed to fetch data');
        }
    };

   
    const fetchCandidateDistribution = async () => {
        try {
            const data = await candidatedistributionapicall();
            setCandidateDistribution(data?.data);
        } catch (error) {
            setError('Failed to fetch data');
        }
    };

  

    
    useEffect(() => {
        fetchCandidateAgeDistribution();
        fetchTagAnalysis();
        fetchClientAnalysis();
        fetchEducationLevelAnalysis();
        fetchGeographicalDistribution();
        fetchCurrentCTCAnalysis();
        fetchWorkExperienceAnalysis();
        fetchCandidateDistribution();
    }, []);

    const CandidateAgeDistibutionOptions = {
        options: {
            chart: {
                id: 'reasons-chart',
            },
            labels: candidateAgeDistribution?.labels,
            title: {
                text: 'Candidate Age Distribution',
            },
        },
        series: candidateAgeDistribution?.series,
    };
    const TagAnalysisOptions = {
        options: {
            chart: {
                id: 'tag-analysis-chart',
            },
            labels: tagAnalysis?.labels,
            title: {
                text: 'Tag Analysis for Candidates',
            },
        },
        series: tagAnalysis?.series,
    };
    const ClientAnalysisOptions = {
        options: {
            chart: {
                id: 'client-analysis-chart',
            },
            labels: clientAnalysis?.labels,
            title: {
                text: 'Client Status Analysis',
            },
        },
        series: clientAnalysis?.series,
    };
    const EducationLevelOptions = {
        options: {
            chart: {
                id: 'education-level-analysis-chart',
                type: 'bar' as const,
                stacked: true, // Enable stacked bars
            },
            plotOptions: {
                bar: {
                    horizontal: false, // Stacked bars will be vertical
                    columnWidth: '50%',
                },
            },
            xaxis: {
                categories: educationLevelAnalysis?.categories,
            },
            yaxis: {
                title: {
                    text: 'Count of Candidates',
                },
            },
            title: {
                text: 'Education Level Analysis',
            },
        },
        series: educationLevelAnalysis?.series,
    };
    const GeographicalDistributionOptions = {
        options: {
            chart: {
                id: 'geographical-distribution-chart',
                type: 'bar' as const, // Use bar chart for distribution
            },
            xaxis: {
                categories: geographicalDistribution?.locations, // Set locations as x-axis categories
            },
            yaxis: {
                title: {
                    text: 'Number of Candidates',
                },
            },
            title: {
                text: 'Geographical Distribution of Candidates',
            },
        },
        series: [
            {
                name: 'Candidates',
                data: geographicalDistribution?.counts, // Set the counts for the bars
            },
        ],
    };
    const CurrentCTCBarOptions = {
        options: {
            chart: {
                id: 'ctc-bar-chart',
                type: 'bar' as const,
                height: 350,
            },
            xaxis: {
                categories: ['Min CTC', 'Avg CTC', 'Max CTC'], // Categories on x-axis
            },
            title: {
                text: 'Current CTC Analysis',
            },
        },
        series: [
            {
                name: 'CTC Values',
                data: [
                    currentCTCAnalysis?.minCTC,
                    parseFloat(currentCTCAnalysis?.avgCTC),
                    currentCTCAnalysis?.maxCTC,
                ],
            },
        ],
    };
    const WorkExperienceOptions = {
        options: {
            chart: {
                id: 'work-experience-histogram',
                type: 'bar' as const,
                height: 350,
            },
            xaxis: {
                categories: workExperienceAnalysis?.map((item: any) => item.experience_range), // Extract experience ranges for X-axis
            },
            yaxis: {
                title: {
                    text: 'Number of Candidates',
                },
            },
            title: {
                text: 'Work Experience Distribution',
            },
        },
        series: [
            {
                name: 'Candidates',
                data: workExperienceAnalysis?.map((item: any) => parseInt(item.count)), // Extract counts for Y-axis
            },
        ],
    };
    const CandidateDistributionOptions = {
        options: {
            chart: {
                id: 'candidate-distribution-bar-chart',
                type: 'bar' as const,
                height: 350,
            },
            xaxis: {
                categories: candidateDistribution?.map((item: any) => item.designation.title), // Extract designations for X-axis
            },
            yaxis: {
                title: {
                    text: 'Number of Candidates',
                },
            },
            title: {
                text: 'Candidate Distribution by Designation',
            },
        },
        series: [
            {
                name: 'Candidates',
                data: candidateDistribution?.map((item: any) => parseInt(item.count)), // Extract counts for Y-axis
            },
        ],
    };
    
    return (
        <Layout>
  <div className="flex h-screen overflow-hidden">
    {/* Sidebar */}
    {/* You can add your sidebar here */}

    {/* Main Content Area */}
    <div className="flex-1 flex flex-col overflow-y-auto">

      {/* Header */}
      {/* You can add your header here */}

      {/* Content */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        
        {/* Analytical Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Analytical</h2>
          {candidateAgeDistribution ? (
            <Chart
              options={CandidateAgeDistibutionOptions.options}
              series={CandidateAgeDistibutionOptions.series}
              type="pie"
              height={350}
            />
          ) : (
            <div className="text-center text-gray-500">Loading...</div>
          )}
        </div>

        {/* Tag Analysis Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Tag Analysis</h2>
          {tagAnalysis ? (
            <Chart
              options={TagAnalysisOptions.options}
              series={TagAnalysisOptions.series}
              type="pie"
              height={350}
            />
          ) : (
            <div className="text-center text-gray-500">Loading...</div>
          )}
        </div>

        {/* Client Status Analysis Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Client Status Analysis</h2>
          {clientAnalysis ? (
            <Chart
              options={ClientAnalysisOptions.options}
              series={ClientAnalysisOptions.series}
              type="pie"
              height={350}
            />
          ) : (
            <div className="text-center text-gray-500">Loading...</div>
          )}
        </div>

        {/* Education Level Analysis Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Education Level Analysis</h2>
          {educationLevelAnalysis ? (
            <Chart
              options={EducationLevelOptions.options}
              series={EducationLevelOptions.series}
              type="bar"
              height={350}
            />
          ) : (
            <div className="text-center text-gray-500">Loading...</div>
          )}
        </div>

        {/* Geographical Distribution Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Geographical Distribution</h2>
          {geographicalDistribution ? (
            <Chart
              options={GeographicalDistributionOptions.options}
              series={GeographicalDistributionOptions.series}
              type="bar"
              height={350}
            />
          ) : (
            <div className="text-center text-gray-500">Loading...</div>
          )}
        </div>

        {/* Current CTC Analysis Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Current CTC Analysis</h2>
          {currentCTCAnalysis ? (
            <Chart
              options={CurrentCTCBarOptions.options}
              series={CurrentCTCBarOptions.series}
              type="bar"
              height={350}
            />
          ) : (
            <div className="text-center text-gray-500">Loading...</div>
          )}
        </div>

        {/* Work Experience Distribution Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Work Experience Distribution</h2>
          {workExperienceAnalysis ? (
            <Chart
              options={WorkExperienceOptions.options}
              series={WorkExperienceOptions.series}
              type="bar"
              height={350}
            />
          ) : (
            <div className="text-center text-gray-500">Loading...</div>
          )}
        </div>

        {/* Candidate Distribution by Designation Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Candidate Distribution by Designation</h2>
          {candidateDistribution ? (
            <Chart
              options={CandidateDistributionOptions.options}
              series={CandidateDistributionOptions.series}
              type="bar"
              height={350}
            />
          ) : (
            <div className="text-center text-gray-500">Loading...</div>
          )}
        </div>

      </div>
    </div>
  </div>
</Layout>


    );
};

export default Analytical;
