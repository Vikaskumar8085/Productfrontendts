import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface JobLeavingReasonsDecember2024Props {
    data: { "ReasonAnswer.Reason_answer": string; candidate_count: number }[];
}

const JobLeavingReasonsDecember2024: React.FC<JobLeavingReasonsDecember2024Props> = ({ data }) => {
   

    // Prepare data for the chart
    const reasons = data.map(item => item["ReasonAnswer.Reason_answer"]);
    const counts = data.map(item => item.candidate_count);

    // Chart options
    const options: ApexOptions = {
        chart: {
            type: 'bar' as const // Use 'as const' to ensure TypeScript understands this is a literal type
        },
        title: {
            text: 'Reasons for Leaving a Job - December 2024'
        },
        xaxis: {
            labels: {
                show: false // Disable x-axis labels
            },
            categories: reasons,
            title: {
                text: 'Reasons',
                
            }
        },
        yaxis: {
            title: {
                text: 'Candidate Count'
            },
            labels: {
                show: false
            }
        },
        dataLabels: {
            enabled: false, // This will ensure data labels (numbers on the bars) are hidden
        },
        series: [{
            name: 'Candidate Count',
            data: counts
        }]
    };

    return (
        <div style={{ maxWidth: '800px' }}>
            <Chart options={options} series={options.series} type="bar" height={350} />
        </div>
    );
};

export default JobLeavingReasonsDecember2024;