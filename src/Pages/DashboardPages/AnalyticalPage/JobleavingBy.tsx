import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface JobLeavingReasonsChartsProps {
    data: { Reason_answer: string; total_candidates: number }[];
}

const JobLeavingReasonsCharts: React.FC<JobLeavingReasonsChartsProps> = ({ data }) => {
    // Data with only one record
    

    // Prepare data for the chart
    const reasons = data.map(item => item.Reason_answer);
    const totalCandidates = data.map(item => item.total_candidates);

    // Chart options
    const options: ApexOptions = {
        chart: {
            type: 'bar' as const // Use 'as const' to ensure TypeScript understands this is a literal type
        },
        title: {
            text: 'Total Candidates for Reasons of Leaving a Job'
        },
        xaxis: {
            labels: {
                show: false // Disable x-axis labels
            },
            categories: reasons
        },
        yaxis: {
            title: {
                text: 'Total Candidates'
            }
        },
        series: [{
            name: 'Total Candidates',
            data: totalCandidates
        }]
    };

    return (
        <div style={{ maxWidth: '800px', margin: '35px auto' }}>
            <Chart options={options} series={options.series} type="bar" height={350} />
        </div>
    );
};

export default JobLeavingReasonsCharts;