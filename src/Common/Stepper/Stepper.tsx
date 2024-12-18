import React from "react";

type Step = {
    label: string;
    component: React.ReactNode; // Component to display for this step
    isSkippable?: boolean; // Option to skip the step
};

interface StepperProps {
    steps: Step[];
    currentStep: number;
    onStepChange: (step: number) => void;
    restrictBackward?: boolean; // Restrict going back to previous steps
}

const Stepper: React.FC<StepperProps> = ({
    steps,
    currentStep,
    onStepChange,
    restrictBackward = false,
}) => {
    const handleStepClick = (index: number) => {
        if (restrictBackward && index > currentStep) {
            onStepChange(index);
        } else if (!restrictBackward) {
            onStepChange(index);
        }
    };

    return (
        <div>
            {/* Stepper Navigation */}
            <div className="flex items-center mb-8">
                {steps.map((step, index) => (
                    <div key={index} className="flex items-center">
                        <button
                            onClick={() => handleStepClick(index)}
                            disabled={restrictBackward && index < currentStep}
                            className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${currentStep >= index
                                    ? "bg-blue-500 border-blue-500 text-white"
                                    : "bg-gray-200 border-gray-400 text-gray-500"
                                } ${restrictBackward && index < currentStep
                                    ? "cursor-not-allowed opacity-50"
                                    : "hover:scale-110 transition-transform"
                                }`}
                        >
                            {index + 1}
                        </button>
                        {index < steps.length - 1 && (
                            <div
                                className={`flex-1 h-1 mx-2 ${currentStep > index ? "bg-blue-500" : "bg-gray-300"
                                    }`}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* Render Current Step's Component */}
            <div>{steps[currentStep].component}</div>
        </div>
    );
};

export default Stepper;
