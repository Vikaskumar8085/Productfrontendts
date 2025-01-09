import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useNavigate } from 'react-router-dom'; // for React Router v6

// Define the type for each data item
interface CandidateData {
    answer: string; // The reason for leaving
    candidateCount: number; // The count of candidates for that reason
}

// Define the props for the component
interface JobLeavingReasonsChartsProps {
    data: CandidateData[]; // Array of candidate data
}

const AnswerDistributionChart: React.FC<JobLeavingReasonsChartsProps> = ({ data }) => {
    const [chartData, setChartData] = useState<CandidateData[]>([]);
    const [isLoaded, setIsLoaded] = useState(false); // Track loading state
    const navigate = useNavigate(); // React Router v6 hook to handle navigation

    useEffect(() => {
        if (data && data.length > 0) {
            setChartData(data);
            setIsLoaded(true); // Set to true when data is loaded
        }
    }, [data]);

    // Ensure data is available before rendering the chart
    if (!isLoaded) {
        return <div>Loading...</div>; // Show a loading indicator if not loaded
    }

    // Prepare data for the pie chart
    const reasons: string[] = chartData.map(item => item.answer);
    const totalCandidates: number[] = chartData.map(item => item.candidateCount);

    // Chart options for Pie Chart
    const options: ApexOptions = {
        chart: {
            type: 'pie' as const, // Set chart type to 'pie'
            height: 350,
            events: {
                dataPointSelection: (_event, _chartContext, config) => {
                    const selectedAnswer = reasons[config.dataPointIndex];

                    // Use a timeout to delay navigation slightly
                    setTimeout(() => {
                        navigate(`/candidate?reasonAnswer=${encodeURIComponent(selectedAnswer)}`);
                    }, 100); // Adjust the delay as needed
                },
            },
        },
        title: {
            text: 'Reasons for Leaving a Job',
        },
        yaxis: {
            labels: {
                show: false,
            },
        },
        labels: reasons, // Labels will be the list of reasons
    };

    // Series data (the values to be plotted)
    const series: number[] = totalCandidates;

    return (
       
            <Chart options={options} series={series} type="pie" height={350} />
        
    );
};

export default AnswerDistributionChart;