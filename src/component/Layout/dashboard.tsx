import React from 'react';
import { FaUser, FaUserCheck, FaBell, FaBriefcase, FaTag, FaIndustry } from 'react-icons/fa'; 
import Chart from 'react-apexcharts';
import {
   fetchdashboardDataApicall,
    fetchdashboardDataApicall1
  } from "../../Services/Admin/DashboardApiServices/index";
  import { useAppDispatch, useAppSelector } from "../../Hooks/Reduxhook/hooks";
  import {
    setDashboard
  } from "../../Redux/DashboardSlice/index";
  import { setDashboard1 } from '../../Redux/DashboardSlice1';
import { useEffect,useState } from 'react';

import {geographicaldistributionapicall,workexperienceanalysisapicall} from "../../Services/Admin/AnalyticalSummary/index";
import { title } from 'process';
const DashboardComp: React.FC = () => {
    const [geographicalDistribution, setGeographicalDistribution] = useState<any>();
    const [workExperienceAnalysis, setWorkExperienceAnalysis] = useState<any>();
    const [error, setError] = useState<string>(''); 
    
    const dispatch = useAppDispatch();
    const dashboardData = useAppSelector((state: any) => state.dashboard.value);
    const dashboardData1 = useAppSelector((state: any) => state.dashboard1.value);
    const Roletype: any = useAppSelector((state) => state.user.Role);

const fetchDashboardData = async () => {
    try {
      const response:any = await fetchdashboardDataApicall();
      if (response.success){
        dispatch(setDashboard(response.data));
      }
    } catch (error:any) {
      console.error("Error fetching dashboard data: ", error);
    }
  }
  const fetchDashboardData1 = async () => {
    try {
      const response:any = await fetchdashboardDataApicall1();
      if (response.success){
        
        dispatch(setDashboard1(response.data));
      }
    } catch (error:any) {
      console.error("Error fetching dashboard data: ", error);
    }
  }
  const fetchWorkExperienceAnalysis = async () => {
    try {
        const data = await workexperienceanalysisapicall();
        if (data.success){
        setWorkExperienceAnalysis(data.data);}
    } catch (error) {
        setError('Failed to fetch data');
    }
};
const fetchGeographicalDistribution = async () => {
    try {
        const data = await geographicaldistributionapicall();
        console.log(data);
        // Extract locations and counts
        const locations = data.data.map((item: { city: any; }) => item.city); // Extract city as labels
        const counts = data.data.map((item: { count: any; }) => item.count); // Extract count as series data
        setGeographicalDistribution({ locations, counts });
    } catch (error) {
        setError('Failed to fetch data');
    }
};

  const candidateTags = dashboardData1.candidateTags || [];

  const clientTags = dashboardData1.clientTags || [];

 // Chart data for Candidate Tags
 const chartDataCandidateTags = {
    options: {
      chart: {
        id: 'candidate-tags-chart',
        type: 'bar' as const, // Assuming a bar chart for distribution
        height: 350,
        
        toolbar: {
          show: true, // Show the toolbar for actions like zooming
        },
        zoom: {
          enabled: true, // Allow zoom functionality
        },
      },
      title: {
        text: 'Candidate Tags Distribution',
        align: 'center' as const, // Center-align the title
        style: {
          fontSize: '22px', // Title font size for prominence
          fontWeight: 'bold',
          color: '#333', // Title color to maintain readability
        },
      },
      xaxis: {
        title: {
          text: 'Tags', // Title for the X-axis
          style: {
            fontSize: '16px', // X-axis title font size
            fontWeight: 'bold',
            color: '#555', // X-axis title color
          },
        },
        categories: candidateTags.map((tag: { name: any }) => tag.name), // Set tags as X-axis categories
        labels: {
          style: {
            colors: '#666', // X-axis label color for better legibility
            fontSize: '14px', // X-axis label font size
          },
        },
      },
      yaxis: {
        title: {
          text: 'Number of Candidates', // Title for the Y-axis
          style: {
            fontSize: '16px', // Y-axis title font size
            fontWeight: 'bold',
            color: '#555', // Y-axis title color
          },
        },
        labels: {
          style: {
            colors: '#666', // Y-axis label color for consistency
            fontSize: '14px', // Y-axis label font size
          },
        },
      },
      grid: {
        borderColor: '#e1e1e1', // Light grid lines for a clean look
        strokeDashArray: 5, // Dotted grid lines for minimal distraction
      },
      tooltip: {
        enabled: true, // Enable tooltips for interactivity
        theme: 'dark', // Dark tooltip theme for better contrast on hover
        style: {
          fontSize: '12px',
          fontFamily: 'Arial, sans-serif',
        },
      },
      plotOptions: {
        bar: {
          horizontal: false, // Vertical bars
          endingShape: 'rounded', // Rounded corners for the bars
          columnWidth: '55%', // Set the width of the bars
        },
      },
      colors: ['#007BFF'], // Blue color for the bars to make them stand out
    },
    series: [
      {
        name: 'Candidates',
        data: candidateTags.map((tag: { candidateCount: any }) => tag.candidateCount), // Map the candidate counts
      },
    ],
  };
  

// Chart data for Client Tags
const chartDataClientTags = {
    options: {
      chart: {
        id: 'client-tags-chart',
        type: 'bar' as const, // Assuming a bar chart based on tags and client counts
        height: 350,
        
        toolbar: {
          show: true, // Show the toolbar
        },
        zoom: {
          enabled: true, // Enable zoom functionality
        },
      },
      title: {
        text: 'Client Tags Distribution',
        align: 'center' as const, // Center-align the title
        style: {
          fontSize: '20px', // Title font size
          fontWeight: 'bold',
          color: '#333', // Title color for good contrast
        },
      },
      xaxis: {
        title: {
          text: 'Tags', // X-axis title text
          style: {
            fontSize: '16px', // X-axis title font size
            fontWeight: 'bold',
            color: '#555', // Color for X-axis title
          },
        },
        categories: clientTags.map((tag: { name: any }) => tag.name), // Map tags for X-axis categories
        labels: {
          style: {
            colors: '#666', // X-axis label color
            fontSize: '14px', // X-axis label font size
          },
        },
      },
      yaxis: {
        title: {
          text: 'Number of Clients', // Y-axis title text
          style: {
            fontSize: '16px', // Y-axis title font size
            fontWeight: 'bold',
            color: '#555', // Color for Y-axis title
          },
        },
        labels: {
          style: {
            colors: '#666', // Y-axis label color
            fontSize: '14px', // Y-axis label font size
          },
        },
      },
      grid: {
        borderColor: '#e1e1e1', // Light grid line color for clarity
        strokeDashArray: 5, // Dotted grid lines
      },
      tooltip: {
        enabled: true, // Enable tooltips
        theme: 'dark', // Tooltip dark theme
        style: {
          fontSize: '12px',
          fontFamily: 'Arial, sans-serif',
        },
      },
      plotOptions: {
        bar: {
          horizontal: false, // Keep the bars vertical
          endingShape: 'rounded', // Round the edges of the bars for a softer look
          columnWidth: '50%', // Set the bar width for aesthetics
        },
      },
      colors: ['#FF5733'], // Vibrant color for the bars to make them stand out
    },
    series: [
      {
        name: 'Clients',
        data: clientTags.map((tag: { clientCount: any }) => tag.clientCount), // Map client count to data
      },
    ],
  };
  

  // Chart data for Candidate Experience
  const GeographicalDistributionOptions = {
    options: {
      chart: {
        id: 'geographical-distribution-chart',
        type: 'bar' as const,
        height: 350,
        
        toolbar: {
          show: true, // Show the toolbar
        },
        zoom: {
          enabled: true, // Enable zoom functionality
        },
      },
      title: {
        text: 'Geographical Distribution of Candidates',
        align: 'center' as const, // Center-align the title
        style: {
          fontSize: '20px', // Title font size
          fontWeight: 'bold',
          color: '#333', // Title color
        },
      },
      xaxis: {
        title: {
          text: 'Location',
          style: {
            fontSize: '16px', // X-axis title font size
            fontWeight: 'bold',
            color: '#555', // X-axis title color
          },
        },
        categories: geographicalDistribution?.locations, // Set locations as x-axis categories
        labels: {
          style: {
            colors: '#666', // X-axis label color
            fontSize: '14px', // X-axis label font size
          },
        },
      },
      yaxis: {
        title: {
          text: 'Number of Candidates',
          style: {
            fontSize: '16px', // Y-axis title font size
            fontWeight: 'bold',
            color: '#555', // Y-axis title color
          },
        },
        labels: {
          style: {
            colors: '#666', // Y-axis label color
            fontSize: '14px', // Y-axis label font size
          },
        },
      },
      grid: {
        borderColor: '#e1e1e1', // Light grid line color
        strokeDashArray: 5, // Dotted grid lines
      },
      tooltip: {
        enabled: true, // Enable tooltips
        theme: 'dark', // Tooltip theme
        style: {
          fontSize: '12px',
          fontFamily: 'Arial, sans-serif',
        },
      },
      plotOptions: {
        bar: {
          horizontal: false, // Make bars vertical
          endingShape: 'rounded', // Round the edges of the bars
          columnWidth: '50%', // Set the width of the bars
        },
      },
      colors: ['#FF5733'], // Set a vibrant color for the bars
    },
    series: [
      {
        name: 'Candidates',
        data: geographicalDistribution?.counts, // Set the counts for the bars
      },
    ],
  };
  
const WorkExperienceOptions = {
    options: {
      chart: {
        id: 'work-experience-histogram',
        type: 'bar' as const,
        height: 350,
        
        toolbar: {
          show: true, // Show the toolbar
        },
        zoom: {
          enabled: true, // Allow zooming
        },
      },
      title: {
        text: 'Work Experience Distribution',
        align: 'center' as const, // Center align the title
        style: {
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#333', // Title color
        },
      },
      xaxis: {
        title: {
          text: 'Experience Range',
          style: {
            fontSize: '16px', // X-axis title font size
            fontWeight: 'bold',
            color: '#555', // X-axis title color
          },
        },
        categories: workExperienceAnalysis?.map((item: any) => item.experience_range),
        labels: {
          style: {
            colors: '#666', // X-axis label color
            fontSize: '14px', // X-axis label font size
          },
        },
      },
      yaxis: {
        title: {
          text: 'Number of Candidates',
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#555',
          },
        },
        labels: {
          style: {
            colors: '#666', // Y-axis label color
            fontSize: '14px', // Y-axis label font size
          },
        },
      },
      grid: {
        borderColor: '#e1e1e1', // Light grid line color
        strokeDashArray: 5, // Dotted grid lines
      },
      tooltip: {
        enabled: true, // Enable tooltips
        theme: 'dark', // Tooltip theme
        style: {
          fontSize: '12px',
          fontFamily: 'Arial, sans-serif',
        },
      },
      plotOptions: {
        bar: {
          horizontal: false, // Make bars vertical
          endingShape: 'rounded', // Round the edges of the bars
          columnWidth: '50%', // Set the width of the bars
        },
      },
      colors: ['#00E396'], // Color of the bars
    },
    series: [
      {
        name: 'Candidates',
        data: workExperienceAnalysis?.map((item: any) => parseInt(item.count)),
      },
    ],
  };
  
  useEffect(() => {
    fetchDashboardData();
    fetchDashboardData1();
    fetchGeographicalDistribution();
    fetchWorkExperienceAnalysis();

  }, []);
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className=" space-y-8">
        <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>

        {/* Key Metrics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Candidates */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
            <FaUser className="text-blue-600 text-3xl" />
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Total Candidates</h2>
              <p className="text-2xl font-bold text-blue-600">{dashboardData.candidates}</p>
            </div>
          </div>

          {/* Active Clients */}
          {(Roletype.Type === "superadmin") ? (<div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
            <FaUserCheck className="text-green-600 text-3xl" />
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Active Clients</h2>
              <p className="text-2xl font-bold text-green-600">{dashboardData.clients}</p>
            </div>
          </div>):(<div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
            <FaUserCheck className="text-green-600 text-3xl" />
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Created Candidates</h2>
              <p className="text-2xl font-bold text-green-600">{dashboardData?.createdCandidates}</p>
            </div>
          </div>)
          
          }

          {/* Pending Reminders */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
            <FaTag className="text-red-600 text-3xl" />
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Tags</h2>
              <p className="text-2xl font-bold text-red-600">{dashboardData.tags}</p>
            </div>
          </div>

          {/* Designations */}
          {Roletype.Type === "superadmin" && <>
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
            <FaBriefcase className="text-purple-600 text-3xl" />
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Designations</h2>
              <p className="text-2xl font-bold text-purple-600">{dashboardData.designations}</p>
            </div>
          </div>
          </>}
          {Roletype.Type === "client" && <>
          <div className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4">
            <FaBriefcase className="text-purple-600 text-3xl" />
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Created Tags</h2>
              <p className="text-2xl font-bold text-purple-600">{dashboardData?.createdtags}</p>
            </div>
          </div>
          </>}

        </div>

        {/* Tags Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Candidate Tags Chart */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center space-x-4">
              <FaTag className="text-yellow-600 text-3xl" />
              <div>
                <h2 className="text-lg font-semibold text-gray-700">Tags (Candidates)</h2>
                <p className="text-2xl font-bold text-yellow-600">{dashboardData.tags}</p>
              </div>
            </div>
            <div className="mt-4">
              <Chart options={chartDataCandidateTags.options} series={chartDataCandidateTags.series} type="bar" height={350} />
            </div>
          </div>

          {/* Client Tags Chart */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="flex items-center space-x-4">
              <FaIndustry className="text-teal-600 text-3xl" />
              <div>
                <h2 className="text-lg font-semibold text-gray-700">Tags (Clients)</h2>
                <p className="text-2xl font-bold text-teal-600">{clientTags.length}</p>
              </div>
            </div>
            <div className="mt-4">
              <Chart options={chartDataClientTags.options} series={chartDataClientTags.series} type="bar" height={350} />
            </div>
          </div>
        </div>

        {/* Recent Activity - Candidates Table */}
        {Roletype.Type === "superadmin" && <>
        <div>
  <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Candidates</h2>
  <div className="bg-white shadow-lg rounded-lg overflow-hidden">
    <table className="min-w-full table-auto">
      <thead className="bg-gray-300">
        <tr>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Name</th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Location</th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Experience</th>
          <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">Designation</th>
        </tr>
      </thead>
      <tbody>

                {dashboardData.recentCandidates && dashboardData.recentCandidates.length > 0 ? (

                  dashboardData.recentCandidates.map((candidate: any, index: number) => (

                    <tr key={candidate.id} className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}>

                      <td className="px-6 py-4 text-sm text-gray-700">{candidate.name}</td>

                      <td className="px-6 py-4 text-sm text-gray-700">{candidate.city}</td>

                      <td className="px-6 py-4 text-sm text-gray-700">{candidate.workExp}</td>

                      <td className="px-6 py-4 text-sm text-gray-700">{candidate.designation.title}</td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td colSpan={4} className="px-6 py-4 text-sm text-gray-700 text-center">No recent candidates available</td>

                  </tr>

                )}

              </tbody>
    </table>
  </div>
</div>
        </>
}
        {/* Charts Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Candidates by Location</h2>
          <div className="bg-white shadow-lg p-6 rounded-lg">
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
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Candidates by Work Experience</h2>
          <div className="bg-white shadow-lg p-6 rounded-lg">
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
        </div>
      </div>
    </div>
  );
};

export default DashboardComp;
